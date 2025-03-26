'use client'

import { useEffect } from 'react'
import { isSupported } from 'firebase/analytics'

import Logger from '@/utils/logger'
import { analytics } from '@/lib/firebase-client'

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        const supported = await isSupported();
        if (supported && analytics) {
          Logger.info('Firebase Analytics inicializado com sucesso!', { prefix: 'Firebase' })
        } else {
          Logger.warn('Firebase Analytics não é suportado neste ambiente', { prefix: 'Firebase' })
        }
      } catch (error) {
        Logger.error(`Erro ao inicializar Firebase Analytics: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, { prefix: 'Firebase' })
      }
    };

    initializeAnalytics();
  }, []);

  return <>{children}</>;
}