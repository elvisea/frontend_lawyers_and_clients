import { Subscription } from '@/types/subscription'

export type SubscriptionStoreState = {
  error: string | null
  isLoading: boolean
  subscription: Subscription | null
}

export type SubscriptionStoreActions = {
  resetState: () => void
  fetchSubscription: () => Promise<void>
  setSubscription: (subscription: Subscription | null) => void
}

export type SubscriptionStore = SubscriptionStoreState & SubscriptionStoreActions 