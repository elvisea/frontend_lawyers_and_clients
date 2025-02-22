import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';

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
      console.log('⚠️ [WebSocket] TXID não fornecido. Conexão WebSocket será ignorada');
      return;
    }

    if (socketRef.current) {
      console.log('🔄 [WebSocket] Conexão já iniciada, ignorando nova tentativa');
      return;
    }

    const url = 'https://lawyers-and-clients-api.bytefulcode.tech/payments';

    if (!url) {
      console.error('❌ [WebSocket] URL do WebSocket não configurada');
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
      console.log(`✅ [WebSocket] Conexão estabelecida com sucesso`, {
        socketId: socket.id,
        connected: socket.connected,
        txid: caseCharge.id
      });
    });

    socket.on('connect_error', (error) => {
      console.error('❌ [WebSocket] Erro na conexão:', {
        message: error.message,
        txid: caseCharge.id,
        details: error
      });
    });

    socket.on('disconnect', (reason) => {
      console.log(`🔌 [WebSocket] Conexão desconectada. Motivo: ${reason}`, {
        txid: caseCharge.id,
        wasConnected: socket.connected
      });
    });

    // Handler de status do pagamento
    socket.on('payment_success', (data: PaymentSuccessData) => {
      console.log('💰 [Pagamento] Sucesso no pagamento recebido:', {
        txid: caseCharge.id,
        status: data.payment.status,
        subscriptionId: data.subscription?.id,
        timestamp: new Date().toISOString()
      });

      if (data.payment.status === 'COMPLETED') {
        router.push(`/lawyer/cases/${data.payment.caseId}/checkout/success`);
        console.log(
          `✨ [Pagamento] Pagamento concluído com sucesso para o caso ${data.payment.caseId}`
        );
      }
    });

    // Handler de erro no pagamento
    socket.on('payment_error', (error: PaymentError) => {
      console.error('❌ [Pagamento] Erro no pagamento recebido:', {
        txid: caseCharge.id,
        error,
        timestamp: new Date().toISOString()
      });
    });

    // Cleanup
    return () => {
      if (socket) {
        console.log(`🧹 [WebSocket] Limpando a conexão WebSocket`, {
          txid: caseCharge.id,
          wasConnected: socket.connected
        });

        socket.off('connect');
        socket.off('connect_error');
        socket.off('disconnect');
        socket.off('payment_success');
        socket.off('payment_error');

        socket.disconnect();
        socketRef.current = null;

        console.log('🔌 [WebSocket] Conexão WebSocket limpa com sucesso');
      }
    };
  }, [caseCharge]);

  return socketRef.current;
};
