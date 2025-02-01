export type Lawyer = {
  id: string
  name: string
}

export type CaseStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED'

export type Case = {
  id: string
  title: string
  description: string
  createdAt: Date
  status: CaseStatus
  lawyer: Lawyer | null
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
