import { create } from 'zustand'

import api from '@/http/api'
import { Plan } from '@/types/subscription'

import { PlansStore } from './types'

const initialState = {
  plans: [],
  selectedPlan: null,
  isLoading: false,
  error: null,
}

export const usePlansStore = create<PlansStore>((set) => ({
  ...initialState,

  fetchPlans: async () => {
    set({ isLoading: true, error: null })

    try {
      const { data } = await api.get<Plan[]>('/plans/available')

      await new Promise(resolve => setTimeout(resolve, 350))

      set({ plans: data.filter(plan => plan.isActive) })
    } catch (error) {
      console.error('Erro ao buscar planos:', error)
      set({ error: 'Erro ao carregar planos. Tente novamente.' })
    } finally {
      set({ isLoading: false })
    }
  },

  setSelectedPlan: (plan) => {
    console.log('💾 Salvando plano selecionado:', plan.name)
    set({ selectedPlan: plan })
  },

  clearSelectedPlan: () => {
    console.log('🗑️ Limpando plano selecionado da store')
    set({ selectedPlan: null })
  },

  resetState: () => {
    console.log('🔄 Resetando estado da store')
    set(initialState)
  },
}),
)
