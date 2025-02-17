import { create } from 'zustand'
import api from '@/http/api'
import { SubscriptionStore } from './types'
import { SubscriptionResponse } from '@/types/subscription'

const initialState = {
  error: null,
  isLoading: false,
  subscription: null,
}

export const useSubscriptionsStore = create<SubscriptionStore>((set) => ({
  ...initialState,

  fetchSubscription: async () => {
    set({ isLoading: true, error: null })
    console.log('🔄 [Assinatura] Iniciando o carregamento da assinatura...')

    try {
      const { data: { subscription } } = await api.get<SubscriptionResponse>('/subscriptions')

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))

      console.log('✅ [Assinatura] Assinatura carregada com sucesso!', subscription?.planId)
      set({ subscription })
    } catch (error) {
      const message = '⚠️ [Assinatura] Erro ao carregar assinatura. Tente novamente.'
      console.error(message, error)
      set({ error: message })
    } finally {
      set({ isLoading: false })
      console.log('🔄 [Assinatura] Processo de carregamento finalizado.')
    }
  },

  setSubscription: (subscription) => {
    console.log('💾 [Assinatura] Salvando assinatura com o planId:', subscription?.planId)
    set({ subscription })
  },

  resetState: () => {
    console.log('🔄 [Assinatura] Resetando o estado da store para o estado inicial.')
    set(initialState)
  },
}))
