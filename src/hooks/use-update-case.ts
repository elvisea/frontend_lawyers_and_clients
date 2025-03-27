import { useState } from 'react'

import api from '@/http/api'
import Logger from '@/utils/logger'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

type EditCaseData = {
  title: string
  description: string
}

type EditCaseResponse = {
  id: string
  title: string
  description: string
  updatedAt: string
}

export const useUpdateCase = (caseId: string) => {

  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const updateCase = async (data: EditCaseData): Promise<boolean> => {
    setIsLoading(true)
    setErrorCode(null)

    try {
      Logger.info('Iniciando atualização do caso', {
        prefix: 'Case',
        data: { 
          caseId,
          title: data.title,
          description: data.description.substring(0, 50) + (data.description.length > 50 ? '...' : '')
        }
      })

      const response = await api.put<EditCaseResponse>(`/cases/${caseId}`, data)

      Logger.info('Caso atualizado com sucesso', {
        prefix: 'Case',
        data: {
          id: response.data.id,
          title: response.data.title,
          updatedAt: new Date(response.data.updatedAt).toISOString()
        }
      })

      return true

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao atualizar caso', {
          prefix: 'Case',
          error,
          data: { 
            caseId,
            errorCode: error.errorCode 
          }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao atualizar caso', {
          prefix: 'Case',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
      return false

    } finally {
      Logger.info('Operação de atualização finalizada', {
        prefix: 'Case'
      })
      setIsLoading(false)
    }
  }

  return {
    updateCase,
    isLoading,
    errorCode
  }
} 