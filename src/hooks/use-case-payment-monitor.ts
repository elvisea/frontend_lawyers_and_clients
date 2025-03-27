import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';

import Logger from '@/utils/logger';
import { Payment } from '@/types/payment';
import { Subscription } from '@/types/subscription';
import { CaseChargeResponse } from './use-create-case-charge';

type PaymentError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

type PaymentSuccessData = {
  payment: Payment;
  subscription: Subscription;
}

export const useCasePaymentMonitor = (caseCharge: CaseChargeResponse | null) => {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!caseCharge) {
      Logger.warn('TXID não fornecido. Conexão WebSocket será ignorada', {
        prefix: 'WebSocket'
      });
      return;
    }

    if (socketRef.current) {
      Logger.info('Conexão já iniciada, ignorando nova tentativa', {
        prefix: 'WebSocket'
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
      query: { txid: caseCharge.id },
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
          txid: caseCharge.id
        }
      });
    });

    socket.on('connect_error', (error) => {
      Logger.error('Erro na conexão', {
        prefix: 'WebSocket',
        error,
        data: {
          txid: caseCharge.id,
          message: error.message
        }
      });
    });

    socket.on('disconnect', (reason) => {
      Logger.info('Conexão desconectada', {
        prefix: 'WebSocket',
        data: {
          reason,
          txid: caseCharge.id,
          wasConnected: socket.connected
        }
      });
    });

    // Handler de status do pagamento
    socket.on('payment_success', (data: PaymentSuccessData) => {
      Logger.info('Sucesso no pagamento recebido', {
        prefix: 'Pagamento',
        data: {
          txid: caseCharge.id,
          status: data.payment.status,
          subscriptionId: data.subscription?.id,
          timestamp: new Date().toISOString()
        }
      });

      if (data.payment.status === 'COMPLETED') {
        router.push(`/lawyer/cases/${data.payment.caseId}/checkout/success`);
        Logger.info('Pagamento concluído com sucesso', {
          prefix: 'Pagamento',
          data: {
            caseId: data.payment.caseId
          }
        });
      }
    });

    // Handler de erro no pagamento
    socket.on('payment_error', (error: PaymentError) => {
      Logger.error('Erro no pagamento recebido', {
        prefix: 'Pagamento',
        error,
        data: {
          txid: caseCharge.id,
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
            txid: caseCharge.id,
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
  }, [caseCharge, router]);

  return socketRef.current;
};
