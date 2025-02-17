import { create } from 'zustand'
import api from '@/http/api'
import { Plan } from '@/types/subscription'
import { PlansStore } from './types'

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
    console.log('🔄 [Planos] Iniciando o carregamento dos planos disponíveis...')

    try {
      const { data } = await api.get<Plan[]>('/plans/available')

      // Delay artificial para suavizar a transição
      await new Promise((resolve) => setTimeout(resolve, 350))

      const activePlans = data.filter((plan) => plan.isActive)
      console.log('✅ [Planos] Planos carregados com sucesso. Total de planos ativos:', activePlans.length)

      set({ plans: activePlans })
    } catch (error) {
      const errorMessage = '⚠️ [Planos] Erro ao carregar planos. Tente novamente.'
      console.error(errorMessage, error)
      set({ error: errorMessage })
    } finally {
      set({ isLoading: false })
      console.log('🔄 [Planos] Carregamento finalizado.')
    }
  },

  setSelectedPlan: (plan) => {
    console.log('💾 [Plano Selecionado] Salvando plano selecionado:', plan.name)
    set({ selected: plan })
  },

  clearSelectedPlan: () => {
    console.log('🗑️ [Plano Selecionado] Limpando plano selecionado da store')
    set({ selected: null })
  },

  resetState: () => {
    console.log('🔄 [Plano] Resetando estado da store para o estado inicial.')
    set(initialState)
  },
}))
