import { useEffect } from 'react'
import { usePlansStore } from '@/store/plans/store'

export const usePlans = () => {
  const {
    plans,
    selectedPlan,
    isLoading,
    error,
    fetchPlans,
    setSelectedPlan,
    clearSelectedPlan,
  } = usePlansStore()

  useEffect(() => {
    let isActive = true;

    if (isActive) {
      fetchPlans()
    }

    return () => {
      isActive = false;
    };

  }, [fetchPlans])

  return {
    plans,
    selectedPlan,
    isLoading,
    error,
    setSelectedPlan,
    clearSelectedPlan
  }
}