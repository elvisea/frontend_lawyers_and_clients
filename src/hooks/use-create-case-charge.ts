import api from '@/http/api';
import { useState } from 'react';

import { AppError } from '@/errors/app-error';
import { ErrorCode } from '@/enums/error-code';
import Logger from '@/utils/logger';

export type CaseChargeResponse = {
  id: string;
  image: string;
  code: string;
}

const useCreateCaseCharge = (caseId: string | null | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null);
  const [caseCharge, setCaseCharge] = useState<CaseChargeResponse | null>(null);

  const resetState = () => {
    setIsLoading(false);
    setErrorCode(null);
    setCaseCharge(null);
  };

  const createCaseCharge = async () => {
    if (!caseId) {
      Logger.warn('Tentativa de gerar cobrança PIX sem ID do caso', {
        prefix: 'Pagamento',
        data: { caseId }
      });
      return;
    }

    setIsLoading(true);

    try {
      Logger.info('Iniciando geração de cobrança PIX para caso', {
        prefix: 'Pagamento',
        data: { caseId }
      });

      const { data } = await api.get<CaseChargeResponse>(`/cases/${caseId}/charge`);

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350));

      setCaseCharge(data);
      setIsLoading(false);

      Logger.info('Cobrança PIX gerada com sucesso para caso', {
        prefix: 'Pagamento',
        data: { 
          caseId,
          chargeId: data.id
        }
      });

    } catch (error) {
      // Delay artificial para suavizar a transição do erro
      await new Promise(resolve => setTimeout(resolve, 350));

      if (error instanceof AppError) {
        Logger.error('Erro ao gerar cobrança PIX para caso', {
          prefix: 'Pagamento',
          error,
          data: { 
            caseId,
            errorCode: error.errorCode 
          }
        });
        setErrorCode(error.errorCode);
      } else {
        Logger.error('Erro desconhecido ao gerar cobrança PIX para caso', {
          prefix: 'Pagamento',
          error,
          data: { caseId }
        });
        setErrorCode(ErrorCode.UNKNOWN_ERROR);
      }
      setIsLoading(false);
    }
  };

  return { caseCharge, isLoading, errorCode, createCaseCharge, resetState };
};

export default useCreateCaseCharge;
