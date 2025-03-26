import { create } from 'zustand'

import api from '@/http/api'
import Logger from '@/utils/logger'

import { PlansStore } from './types'
import { Plan } from '@/types/subscription'
import { AppError } from '@/errors/app-error'

const initialState = {
  plans: [],
  selected: null,
  isLoading: false,
  error: null,
}

export const usePlansStore = create<PlansStore>((set) => ({
  ...initialState,

  fetchPlans: async () => {
    set({ isLoading: true, error: null })
    Logger.info('Iniciando o carregamento dos planos disponíveis', { prefix: 'Plans' })

    try {
      const { data } = await api.get<Plan[]>('/plans/available')

      // Delay artificial para suavizar a transição
      await new Promise((resolve) => setTimeout(resolve, 350))

      const activePlans = data.filter((plan) => plan.isActive)
      Logger.info(`Planos carregados com sucesso. Total de planos ativos: ${activePlans.length}`, { prefix: 'Plans' })

      set({ plans: activePlans })
    } catch (error) {
      const errorMessage = 'Erro ao carregar planos. Tente novamente.'
      Logger.error(`${errorMessage}: ${error instanceof AppError ? error.message : 'Erro desconhecido'}`, { prefix: 'Plans' })
      set({ error: errorMessage })
    } finally {
      set({ isLoading: false })
      Logger.info('Carregamento finalizado', { prefix: 'Plans' })
    }
  },

  setSelectedPlan: (plan) => {
    Logger.info(`Salvando plano selecionado: ${plan.name}`, { prefix: 'Plans', sensitive: true })
    set({ selected: plan })
  },

  clearSelectedPlan: () => {
    Logger.info('Limpando plano selecionado da store', { prefix: 'Plans' })
    set({ selected: null })
  },

  resetState: () => {
    Logger.info('Resetando estado da store para o estado inicial', { prefix: 'Plans' })
    set(initialState)
  },
}))
