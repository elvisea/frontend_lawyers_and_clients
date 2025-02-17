export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELED'
export type PaymentMethod = 'PIX' | 'CREDIT_CARD' | 'BANK_SLIP'

export interface Payment {
  id: string
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod: PaymentMethod
  transactionId?: string
  paymentDate?: string
  dueDate: string
  createdAt: string
  updatedAt: string
  userId: string
  caseId?: string
  subscriptionId?: string
}
