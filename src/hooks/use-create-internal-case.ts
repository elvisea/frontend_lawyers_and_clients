import { useCreateCaseStore } from '@/store/create-case/store'

type CreateInternalCaseData = {
  title: string
  description: string
  clientId: string
  price: number
}

type CreateInternalCaseResponse = {
  id: string
  title: string
  description: string
  price: number
  clientId: string
} | null

export const useCreateInternalCase = () => {
  const { isLoading, errorCode, createCase, reset } = useCreateCaseStore()

  const handleCreateCase = async (data: CreateInternalCaseData): Promise<CreateInternalCaseResponse> => {
    return await createCase(data)
  }

  return {
    createCase: handleCreateCase,
    isLoading,
    errorCode,
    reset
  }
} 