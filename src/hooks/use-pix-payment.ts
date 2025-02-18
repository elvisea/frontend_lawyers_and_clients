import api from '@/http/api';
import { useState } from 'react';

type PixResponse = {
  id: string;
  image: string;
  code: string;
}

const usePixPayment = (planId: string | null | undefined) => {
  const [pixData, setPixData] = useState<PixResponse | null>(null);

  const [isLoadingPix, setIsLoadingPix] = useState(false);

  const fetchPixPayment = async () => {

    if (!planId) {
      console.error('⚠️ [Pix] ID do plano não fornecido. Cobrança PIX não será gerada.');
      return;
    }

    setIsLoadingPix(true);

    try {
      const { data } = await api.post<PixResponse>('/payments/pix', { planId });
      setPixData(data);

    } catch (error) {
      console.error('Erro ao gerar cobrança PIX:', error);
      setPixData(null);

    } finally {
      setIsLoadingPix(false);
    }
  };

  return { pixData, isLoadingPix, fetchPixPayment };
};

export default usePixPayment;
