import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "@/errors/app-error";

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {};

const api = axios.create({
  baseURL: 'http://backend_lawyers_and_clients:3334',
}) as APIInstanceProps;

let isRefreshing = false;
let failedQueued: Array<PromiseType> = [];

const singOut = () => {
  console.log('🔐 [Auth] Iniciando processo de logout...');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  console.log('🗑️ [Auth] Tokens removidos do localStorage');
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
  console.log('🔑 [Auth] Iniciando armazenamento de novos tokens...');

  try {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    console.log('✅ [Auth] Tokens atualizados com sucesso');
    console.log('   ➔ Access Token: ', accessToken.substring(0, 15) + '...');
    console.log('   ➔ Refresh Token: ', refreshToken.substring(0, 15) + '...');
  } catch (error) {
    console.error('❌ [Auth] Falha ao salvar tokens:', error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => {
    console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url} → ${response.status}`);
    return response;
  },
  async (error) => {
    const requestInfo = `[${error.config?.method?.toUpperCase()}] ${error.config?.url}`;

    console.log(`❌ ${requestInfo} → Erro ${error.response?.status || 'DESCONHECIDO'}`);
    console.log('   ➔ Detalhes:', error.response?.data || 'Nenhum detalhe adicional');

    if (error.response?.status === 401) {
      console.log('🔒 [Auth] Detecção de erro de autenticação');
      const errorMessage = error.response.data?.message;

      console.log(`📋 [Auth] Motivo do erro: ${errorMessage || 'Não especificado'}`);

      if (["Unauthorized", "token.invalid", "token.expired"].includes(errorMessage)) {
        console.log('🔄 [Auth] Iniciando fluxo de renovação de token');
        const refreshToken = localStorage.getItem('refreshToken');

        console.log(refreshToken
          ? '   ➔ Refresh Token encontrado'
          : '❌ [Auth] Refresh Token não disponível');

        if (!refreshToken) {
          console.log('⏩ [Auth] Redirecionando para logout...');
          singOut();
          return Promise.reject(error);
        }

        const originalRequestConfig = error.config;

        if (isRefreshing) {
          console.log(`⏳ [Auth] Refresh em andamento (${failedQueued.length} requisições na fila)`);
          return new Promise((resolve, reject) => {
            failedQueued.push({
              onSuccess: (token: string) => {
                console.log('   ➔ Reexecutando requisição com novo token');
                originalRequestConfig.headers = { Authorization: `Bearer ${token}` };
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                console.log('❌ [Auth] Falha na requisição em fila');
                reject(error);
              },
            });
          });
        }

        isRefreshing = true;
        console.log('📡 [Auth] Fazendo requisição de refresh token...');

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post("/auth/refresh-token", { refreshToken });

            console.log('✅ [Auth] Refresh token realizado com sucesso');
            console.log('   ➔ Novo Access Token: ', data.accessToken.substring(0, 15) + '...');

            saveTokens(data.accessToken, data.refreshToken);

            if (originalRequestConfig.data) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            originalRequestConfig.headers = { Authorization: `Bearer ${data.accessToken}` };
            api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

            console.log(`🔄 [Auth] Reprocessando ${failedQueued.length + 1} requisições pendentes`);
            failedQueued.forEach((request) => request.onSuccess(data.accessToken));

            console.log(`⏩ [Auth] Reexecutando requisição original: ${requestInfo}`);
            resolve(api(originalRequestConfig));
          } catch (error: unknown) {
            console.error('❌ [Auth] Falha crítica no refresh token:', error);
            console.log('⏩ [Auth] Redirecionando todas as requisições para logout...');
            failedQueued.forEach((request) => request.onFailure(error as AxiosError));
            singOut();
            reject(error);
          } finally {
            console.log('🏁 [Auth] Finalizando processo de refresh token');
            isRefreshing = false;
            failedQueued = [];
          }
        });
      }

      console.log('🚨 [Auth] Erro de autenticação não recuperável');
      singOut();
    }

    if (error.response && error.response.data) {
      console.log('📄 [API] Resposta de erro detalhada:');
      console.log('   ➔ Código:', error.response.data.errorCode);
      console.log('   ➔ Mensagem:', error.response.data.message);

      return Promise.reject(
        new AppError(
          error.response.data.errorCode,
          error.response.data.statusCode,
          error.response.data.error,
          error.response.data.message
        )
      );
    } else {
      console.log('⚠️ [Network] Erro de conexão/comunicação');
      console.log('   ➔ Detalhes:', error.message);
      return Promise.reject(error);
    }
  }
);

export default api;