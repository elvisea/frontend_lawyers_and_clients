export type Document = {
  id: string
  url: string
  name: string
  type: string
  caseId: string
  createdAt: Date
  updatedAt: Date
}

export type LawyerProfile = {
  id: string
  oabNumber: string
  oabState: string
  specialties: string[]
  description: string
  yearsOfExp: number
  certificates: string[]
  education: string
  addressStreet: string
  addressNumber: string
  addressCity: string
  addressState: string
  addressZip: string
  addressComplement: string
  phone: string
  createdAt: Date
  updatedAt: Date
  lawyerId: string
}

export type Lawyer = {
  id: string
  name: string
  email: string
  type: string
  createdAt: Date
  updatedAt: Date
  lawyerProfile?: LawyerProfile
}

export type CaseStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED'

export type Case = {
  id: string
  title: string
  description: string
  status: CaseStatus
  price?: number
  isActive: boolean
  pricedById?: string
  createdAt: Date
  updatedAt: Date
  acceptedAt?: Date
  closedAt?: Date
  clientId: string
  lawyerId?: string
  documents: Document[]
  lawyer?: Lawyer
}

export type CasesResponse = {
  cases: Case[]
  total: number
}

export type CreateCaseRequest = {
  title: string
  description: string
}

export type DocumentUpload = {
  file: File
  type: string
}
