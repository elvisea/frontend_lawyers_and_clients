import axios, { AxiosError, AxiosInstance } from "axios";

import Logger from "@/utils/logger";
import { AppError } from "@/errors/app-error";

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {};

const api = axios.create({
  baseURL: 'https://lawyers-and-clients-api.bytefulcode.tech',
}) as APIInstanceProps;

let isRefreshing = false;
let failedQueued: Array<PromiseType> = [];

const singOut = () => {
  Logger.info('Iniciando processo de logout', {
    prefix: 'Auth'
  });

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  Logger.info('Tokens removidos do localStorage', {
    prefix: 'Auth'
  });
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
  Logger.info('Iniciando armazenamento de novos tokens', {
    prefix: 'Auth'
  });

  try {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    Logger.info('Tokens atualizados com sucesso', {
      prefix: 'Auth',
      data: {
        accessToken: accessToken.substring(0, 15) + '...',
        refreshToken: refreshToken.substring(0, 15) + '...'
      }
    });
  } catch (error) {
    Logger.error('Falha ao salvar tokens', {
      prefix: 'Auth',
      error
    });
    throw error;
  }
};

api.interceptors.response.use(
  (response) => {
    Logger.info(`${response.config.method?.toUpperCase()} ${response.config.url}`, {
      prefix: 'API',
      data: { status: response.status }
    });
    return response;
  },
  async (error) => {
    const requestInfo = `${error.config?.method?.toUpperCase()} ${error.config?.url}`;

    Logger.error(`Erro na requisição`, {
      prefix: 'API',
      error,
      data: {
        request: requestInfo,
        status: error.response?.status || 'DESCONHECIDO',
        details: error.response?.data || 'Nenhum detalhe adicional'
      }
    });

    if (error.response?.status === 401) {
      Logger.warn('Detecção de erro de autenticação', {
        prefix: 'Auth',
        data: {
          errorMessage: error.response.data?.message || 'Não especificado'
        }
      });

      if (["Unauthorized", "token.invalid", "token.expired"].includes(error.response.data?.message)) {
        Logger.info('Iniciando fluxo de renovação de token', {
          prefix: 'Auth'
        });

        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          Logger.warn('Refresh Token não disponível, redirecionando para logout', {
            prefix: 'Auth'
          });
          singOut();
          return Promise.reject(error);
        }

        const originalRequestConfig = error.config;

        if (isRefreshing) {
          Logger.info('Refresh em andamento', {
            prefix: 'Auth',
            data: { queuedRequests: failedQueued.length }
          });

          return new Promise((resolve, reject) => {
            failedQueued.push({
              onSuccess: (token: string) => {
                Logger.info('Reexecutando requisição com novo token', {
                  prefix: 'Auth'
                });

                const headers = {
                  ...originalRequestConfig.headers,
                  Authorization: `Bearer ${token}`
                };

                if (originalRequestConfig.data instanceof FormData) {
                  delete headers['Content-Type'];
                }

                originalRequestConfig.headers = headers;
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                Logger.error('Falha na requisição em fila', {
                  prefix: 'Auth',
                  error
                });
                reject(error);
              },
            });
          });
        }

        isRefreshing = true;
        Logger.info('Fazendo requisição de refresh token', {
          prefix: 'Auth'
        });

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post("/auth/refresh-token", { refreshToken });

            Logger.info('Refresh token realizado com sucesso', {
              prefix: 'Auth',
              data: {
                newAccessToken: data.accessToken.substring(0, 15) + '...'
              }
            });

            saveTokens(data.accessToken, data.refreshToken);

            // Não tentar fazer parse do FormData
            if (originalRequestConfig.data && !(originalRequestConfig.data instanceof FormData)) {
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }

            // Preservar headers originais, incluindo Content-Type para FormData
            const headers = {
              ...originalRequestConfig.headers,
              Authorization: `Bearer ${data.accessToken}`
            };

            if (originalRequestConfig.data instanceof FormData) {
              delete headers['Content-Type'];
            }

            originalRequestConfig.headers = headers;
            api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

            Logger.info('Reprocessando requisições pendentes', {
              prefix: 'Auth',
              data: {
                pendingRequests: failedQueued.length + 1,
                requestInfo
              }
            });

            failedQueued.forEach((request) => request.onSuccess(data.accessToken));

            if (originalRequestConfig.data instanceof FormData) {
              Logger.info('Requisição contém FormData', {
                prefix: 'Auth',
                data: {
                  headers: {
                    before: originalRequestConfig.headers,
                    after: headers
                  }
                }
              });
            }

            resolve(api(originalRequestConfig));
          } catch (error: unknown) {
            Logger.error('Falha crítica no refresh token', {
              prefix: 'Auth',
              error
            });

            failedQueued.forEach((request) => request.onFailure(error as AxiosError));
            singOut();
            reject(error);
          } finally {
            Logger.info('Finalizando processo de refresh token', {
              prefix: 'Auth'
            });
            isRefreshing = false;
            failedQueued = [];
          }
        });
      }

      Logger.error('Erro de autenticação não recuperável', {
        prefix: 'Auth'
      });
      singOut();
    }

    if (error.response && error.response.data) {
      Logger.error('Resposta de erro detalhada', {
        prefix: 'API',
        data: {
          code: error.response.data.errorCode,
          message: error.response.data.message
        }
      });

      return Promise.reject(
        new AppError(
          error.response.data.errorCode,
          error.response.data.statusCode,
          error.response.data.error,
          error.response.data.message
        )
      );
    } else {
      Logger.error('Erro de conexão/comunicação', {
        prefix: 'Network',
        error,
        data: {
          message: error.message
        }
      });
      return Promise.reject(error);
    }
  }
);

export default api;