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

export type Client = {
  name: string
}

export type CaseDocument = {
  id: string
  name: string
  type: string
  url: string
}

export type CaseBase = {
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
  lawyer?: Lawyer
  client: Client
}

export type Case = CaseBase & {
  documents: number
}

export type DetailedCase = CaseBase & {
  documents: CaseDocument[]
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

type ClientProfile = {
  id: string
  cpf: string
  rg: string
  birthDate: Date
  occupation: string
  address: {
    street: string
    number: string
    city: string
    state: string
    zipCode: string
  }
  phone: string
  createdAt: Date
  updatedAt: Date
}

type ClientWithProfile = {
  id: string
  name: string
  email: string
  profile: ClientProfile | null
}

export type CaseFeatures = {
  id: string
  title: string
  description: string
  status: CaseStatus
  price: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  documents: CaseDocument[]
  client: ClientWithProfile
}
