import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/http/api'
import Logger from '@/utils/logger'

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
      Logger.info('Iniciando criação do caso', {
        prefix: 'Case',
        data: {
          title: data.title,
          description: data.description?.substring(0, 50) + '...',
        }
      })

      const response = await api.post<CreatedCase>('/cases', data)

      Logger.info('Caso criado com sucesso', {
        prefix: 'Case',
        data: {
          caseId: response.data.id.substring(0, 8),
          title: response.data.title
        }
      })

      return response.data

    } catch (error) {
      Logger.error('Erro ao criar caso', {
        prefix: 'Case',
        error,
        data: {
          title: data.title,
        }
      })

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
      Logger.info('Operação de criação finalizada', {
        prefix: 'Case'
      })
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