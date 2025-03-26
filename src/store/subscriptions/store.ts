import { create } from 'zustand'

import api from '@/http/api'
import Logger from '@/utils/logger'

import { AppError } from '@/errors/app-error'
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
    Logger.info('Iniciando o carregamento da assinatura', { prefix: 'Subscription' })

    try {
      const { data: { subscription } } = await api.get<SubscriptionResponse>('/subscriptions')

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))

      Logger.info(`Assinatura carregada com sucesso - Plan ID: ${subscription?.planId}`, {
        prefix: 'Subscription',
        sensitive: true
      })
      set({ subscription })
    } catch (error) {
      const message = 'Erro ao carregar assinatura. Tente novamente.'
      Logger.error(`${message}: ${error instanceof AppError ? error.message : 'Erro desconhecido'}`, { prefix: 'Subscription' })
      set({ error: message })
    } finally {
      set({ isLoading: false })
      Logger.info('Processo de carregamento finalizado', { prefix: 'Subscription' })
    }
  },

  setSubscription: (subscription) => {
    Logger.info(`Salvando assinatura - Plan ID: ${subscription?.planId}`, {
      prefix: 'Subscription',
      sensitive: true
    })
    set({ subscription })
  },

  resetState: () => {
    Logger.info('Resetando o estado da store para o estado inicial', { prefix: 'Subscription' })
    set(initialState)
  },
}))
