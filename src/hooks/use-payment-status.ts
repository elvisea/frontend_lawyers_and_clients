import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';

import { Subscription } from '@/types/subscription';
import { useSubscription } from '@/hooks/use-subscription';

export const usePaymentStatus = (txid: string | null) => {
  const router = useRouter()
  const { setSubscription } = useSubscription();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!txid) {
      console.log('⚠️ [WebSocket] TXID não fornecido. Conexão WebSocket será ignorada');
      return;
    }

    const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

    if (!url) {
      console.error('❌ [WebSocket] URL do WebSocket não configurada');
      return;
    }

    console.log(`🔄 [WebSocket] Inicializando conexão WebSocket para o endereço ${url}`, {
      txid,
      transports: ['websocket'],
      path: '/socket.io',
    });

    // Inicializa o socket
    socketRef.current = io(url, {
      query: { txid },
      transports: ['websocket'],
      path: '/socket.io',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    // Handlers de conexão
    socket.on('connect', () => {
      console.log(`✅ [WebSocket] Conexão estabelecida com sucesso`, {
        socketId: socket.id,
        connected: socket.connected,
        txid
      });
    });

    socket.on('connect_error', (error) => {
      console.error('❌ [WebSocket] Erro na conexão:', {
        message: error.message,
        txid,
        details: error
      });
    });

    socket.on('disconnect', (reason) => {
      console.log(`🔌 [WebSocket] Conexão desconectada. Motivo: ${reason}`, {
        txid,
        wasConnected: socket.connected
      });
    });

    // Handler de status do pagamento
    socket.on('payment_success', (data: { payment: any; subscription: Subscription }) => {
      console.log('💰 [Pagamento] Sucesso no pagamento recebido:', {
        txid,
        status: data.payment.status,
        subscriptionId: data.subscription?.id,
        timestamp: new Date().toISOString()
      });

      if (data.payment.status === 'COMPLETED') {
        setSubscription(data.subscription);
        router.push('/lawyer/subscription/success');

        console.log('✨ [Pagamento] Pagamento concluído com sucesso. Atualizando UI...', {
          txid,
          subscription: data.subscription
        });

      }
    });

    // Handler de erro no pagamento
    socket.on('payment_error', (error: any) => {
      console.error('❌ [Pagamento] Erro no pagamento recebido:', {
        txid,
        error,
        timestamp: new Date().toISOString()
      });
    });

    // Cleanup
    return () => {
      if (socket) {
        console.log(`🧹 [WebSocket] Limpando a conexão WebSocket`, {
          txid,
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
  }, [txid]);

  return socketRef.current;
};
