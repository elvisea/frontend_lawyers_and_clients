export type PlanInterval = 'MONTHLY' | 'QUARTERLY' | 'SEMIANNUALLY' | 'YEARLY'
export type PlanType = 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE'

export interface Plan {
  id: string
  name: string
  type: PlanType
  interval: PlanInterval
  price: number
  maxCases: number
  caseDiscount: number
  features: string[]
}

export interface PlansResponse {
  plans: Plan[]
}

export type SubscriptionStatus = 'PENDING' | 'ACTIVE' | 'CANCELED' | 'EXPIRED'

export interface Subscription {
  id: string
  status: SubscriptionStatus
  startDate: string
  endDate: string
  canceledAt: string | null
  createdAt: string
  updatedAt: string
  planId: string
  userId: string
}

export interface SubscriptionResponse {
  subscription: Subscription | null
} 