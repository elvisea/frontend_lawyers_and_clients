import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { io, Socket } from 'socket.io-client';

import Logger from '@/utils/logger';
import { Payment } from '@/types/payment';
import { Subscription } from '@/types/subscription';

import { useSubscription } from '@/hooks/use-subscription';

type PaymentError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

type PaymentSuccessData = {
  payment: Payment;
  subscription: Subscription;
}

export const useSubscriptionPaymentMonitor = (txid: string | null | undefined) => {
  const router = useRouter();
  const { setSubscription } = useSubscription();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!txid) {
      Logger.warn('TXID não fornecido, conexão WebSocket ignorada', {
        prefix: 'WebSocket'
      });
      return;
    }

    if (socketRef.current) {
      Logger.info('Conexão já iniciada, ignorando nova tentativa', {
        prefix: 'WebSocket',
        data: { txid }
      });
      return;
    }

    const url = 'https://lawyers-and-clients-api.bytefulcode.tech/payments';

    if (!url) {
      Logger.error('URL do WebSocket não configurada', {
        prefix: 'WebSocket'
      });
      return;
    }

    socketRef.current = io(url, {
      query: { txid },
      reconnection: true,
      transports: ['websocket'],
    });

    const socket = socketRef.current;

    // Handlers de conexão
    socket.on('connect', () => {
      Logger.info('Conexão estabelecida com sucesso', {
        prefix: 'WebSocket',
        data: {
          socketId: socket.id,
          connected: socket.connected,
          txid
        }
      });
    });

    socket.on('connect_error', (error) => {
      Logger.error('Erro na conexão', {
        prefix: 'WebSocket',
        error,
        data: {
          txid,
          message: error.message
        }
      });
    });

    socket.on('disconnect', (reason) => {
      Logger.info('Conexão desconectada', {
        prefix: 'WebSocket',
        data: {
          reason,
          txid,
          wasConnected: socket.connected
        }
      });
    });

    // Handler de status do pagamento
    socket.on('payment_success', (data: PaymentSuccessData) => {
      Logger.info('Sucesso no pagamento recebido', {
        prefix: 'Pagamento',
        data: {
          txid,
          status: data.payment.status,
          subscriptionId: data.subscription?.id,
          timestamp: new Date().toISOString()
        }
      });

      if (data.payment.status === 'COMPLETED') {
        setSubscription(data.subscription);
        
        Logger.info('Pagamento concluído com sucesso', {
          prefix: 'Pagamento',
          data: {
            txid,
            subscriptionId: data.subscription?.id
          }
        });

        router.push('/lawyer/subscription/success');
      }
    });

    // Handler de erro no pagamento
    socket.on('payment_error', (error: PaymentError) => {
      Logger.error('Erro no pagamento recebido', {
        prefix: 'Pagamento',
        error,
        data: {
          txid,
          code: error.code,
          timestamp: new Date().toISOString()
        }
      });
    });

    // Cleanup
    return () => {
      if (socket) {
        Logger.info('Limpando a conexão WebSocket', {
          prefix: 'WebSocket',
          data: {
            txid,
            wasConnected: socket.connected
          }
        });

        socket.off('connect');
        socket.off('connect_error');
        socket.off('disconnect');
        socket.off('payment_success');
        socket.off('payment_error');

        socket.disconnect();
        socketRef.current = null;

        Logger.info('Conexão WebSocket limpa com sucesso', {
          prefix: 'WebSocket'
        });
      }
    };
  }, [txid, router, setSubscription]);

  return socketRef.current;
};
