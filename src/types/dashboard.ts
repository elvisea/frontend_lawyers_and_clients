export interface DashboardStats {
  availableCases: number
  acceptedCases: number
  totalSpent: number
  spentByCases: number
  spentBySubscription: number
  recentPayments: {
    id: string
    amount: number
    date: string
    status: 'PENDING' | 'COMPLETED' | 'FAILED'
    type: 'CASE' | 'SUBSCRIPTION'
  }[]
  casesByStatus: {
    open: number
    inProgress: number
    closed: number
  }
} 