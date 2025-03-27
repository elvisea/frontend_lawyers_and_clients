import { useEffect } from 'react'
import Logger from '@/utils/logger'
import { useSubscriptionsStore } from '../store/subscriptions/store'

export const useSubscription = () => {
  const { error, fetchSubscription, isLoading, resetState, setSubscription, subscription } =
    useSubscriptionsStore((state) => state)

  useEffect(() => {
    const hasSubscription = subscription
    Logger.info('Verificando estado da assinatura', {
      prefix: 'Assinatura',
      data: { 
        status: hasSubscription ? 'Encontrada' : 'Não encontrada',
        id: hasSubscription?.id
      }
    })

    if (!hasSubscription) {
      Logger.info('Iniciando carregamento da assinatura', {
        prefix: 'Assinatura'
      })
      fetchSubscription()
    }
  }, [subscription, fetchSubscription])

  useEffect(() => {
    if (subscription) {
      Logger.info('Assinatura carregada com sucesso', {
        prefix: 'Assinatura',
        data: {...subscription}
      })
    }
  }, [subscription])

  const resetSubscriptionState = () => {
    Logger.info('Resetando estado da assinatura', {
      prefix: 'Assinatura'
    })
    resetState()
  }

  return {
    error,
    isLoading,
    subscription,
    setSubscription,
    resetSubscriptionState,
  }
}
