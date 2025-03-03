import { useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/http/api'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

export interface CaseFormData {
  title: string
  description: string
}

export interface CreatedCase {
  id: string
  title: string
  description: string
  status: string
  createdAt: string
}

export const useCreateCase = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const createCase = async (data: CaseFormData): Promise<CreatedCase | null> => {
    setIsLoading(true)
    setErrorCode(null)

    try {
      console.log('📝 [Caso] Iniciando criação do caso:', data.title)

      const response = await api.post<CreatedCase>('/cases', data)

      console.log('✅ [Caso] Caso criado com sucesso:', response.data.id)
      return response.data

    } catch (error) {
      console.error('❌ [Caso] Erro ao criar caso:', errorCode)

      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
      return null

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))

      setIsLoading(false)
    }
  }

  const navigateToDocuments = (caseId: string) => {
    router.push(`/client/cases/${caseId}/documents`)
  }

  return {
    createCase,
    navigateToDocuments,
    isLoading,
    errorCode
  }
} 