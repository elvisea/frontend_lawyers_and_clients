import { useEffect } from 'react'
import { useSubscriptionsStore } from '../store/subscriptions/store'

export const useSubscription = () => {
  const { error, fetchSubscription, isLoading, resetState, setSubscription, subscription } =
    useSubscriptionsStore((state) => state)

  useEffect(() => {
    const hasSubscription = subscription
    console.log(
      `🔍 [Assinatura] Verificando assinatura atual: ${hasSubscription ? 'Assinatura encontrada' : 'Nenhuma assinatura encontrada'
      }`
    )

    if (!hasSubscription) {
      console.log('⚠️ [Assinatura] Nenhuma assinatura encontrada. Iniciando carregamento...')
      fetchSubscription()
    }
  }, [subscription, fetchSubscription])

  useEffect(() => {
    if (subscription) {
      console.log('✅ [Assinatura] Assinatura carregada com sucesso:', subscription)
    }
  }, [subscription])

  const resetSubscriptionState = () => {
    console.log('🔄 [Assinatura] Resetando estado da assinatura...')
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
