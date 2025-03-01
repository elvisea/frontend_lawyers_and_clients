import api from '@/http/api';
import { useState } from 'react';

import { AppError } from '@/errors/app-error';
import { ErrorCode } from '@/enums/error-code';

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
      console.error('⚠️ [Pix] ID do caso não fornecido. Cobrança PIX não será gerada.');
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.get<CaseChargeResponse>(`/cases/${caseId}/charge`);

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350));

      setCaseCharge(data);
      setIsLoading(false);

    } catch (error) {
      // Delay artificial para suavizar a transição do erro
      await new Promise(resolve => setTimeout(resolve, 350));

      if (error instanceof AppError) {
        setErrorCode(error.errorCode);
        setIsLoading(false);
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR);
        setIsLoading(false);
      }

    }
  };

  return { caseCharge, isLoading, errorCode, createCaseCharge, resetState };
};

export default useCreateCaseCharge;
