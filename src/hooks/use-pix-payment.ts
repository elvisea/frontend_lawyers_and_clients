import api from '@/http/api';
import { useState } from 'react';
import Logger from '@/utils/logger';

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
      Logger.warn('Tentativa de gerar cobrança PIX sem ID do plano', {
        prefix: 'Pagamento',
        data: { planId }
      });
      return;
    }

    setIsLoadingPix(true);

    try {
      Logger.info('Iniciando geração de cobrança PIX', {
        prefix: 'Pagamento',
        data: { planId }
      });

      const { data } = await api.post<PixResponse>('/payments/pix', { planId });
      setPixData(data);

      Logger.info('Cobrança PIX gerada com sucesso', {
        prefix: 'Pagamento',
        data: { 
          pixId: data.id,
          planId 
        }
      });

    } catch (error) {
      Logger.error('Erro ao gerar cobrança PIX', {
        prefix: 'Pagamento',
        error,
        data: { planId }
      });
      setPixData(null);

    } finally {
      setIsLoadingPix(false);
    }
  };

  return { pixData, isLoadingPix, fetchPixPayment };
};

export default usePixPayment;
