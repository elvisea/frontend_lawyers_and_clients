import { Plan } from '@/types/subscription'

export type PlansStoreState = {
  plans: Plan[]
  selectedPlan: Plan | null
  isLoading: boolean
  error: string | null
}

export type PlansStoreActions = {
  fetchPlans: () => Promise<void>
  setSelectedPlan: (plan: Plan) => void
  resetState: () => void
  clearSelectedPlan: () => void
}

export type PlansStore = PlansStoreState & PlansStoreActions 