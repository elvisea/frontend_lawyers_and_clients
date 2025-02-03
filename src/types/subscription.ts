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