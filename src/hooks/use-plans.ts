import { useEffect } from 'react'
import { usePlansStore } from '@/store/plans/store'

export const usePlans = () => {
  const {
    plans,
    selected,
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
    selected,
    isLoading,
    error,
    setSelectedPlan,
    clearSelectedPlan
  }
}