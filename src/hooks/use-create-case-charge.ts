import api from '@/http/api';
import { useState } from 'react';

type CaseChargeResponse = {
  id: string;
  image: string;
  code: string;
}

const useCreateCaseCharge = (caseId: string | null | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [caseCharge, setCaseCharge] = useState<CaseChargeResponse | null>(null);

  const createCaseCharge = async () => {

    if (!caseId) {
      console.error('⚠️ [Pix] ID do caso não fornecido. Cobrança PIX não será gerada.');
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.get<CaseChargeResponse>(`/cases/${caseId}/charge`);
      setCaseCharge(data);

    } catch (error) {
      console.error('Erro ao gerar cobrança PIX:', error);
      setCaseCharge(null);

    } finally {
      setIsLoading(false);
    }
  };

  return { caseCharge, isLoading, createCaseCharge };
};

export default useCreateCaseCharge;
