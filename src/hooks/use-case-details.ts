import { useState, useEffect, useCallback } from 'react'

import api from '@/http/api'
import Logger from '@/utils/logger'

import { DetailedCase } from '@/types/case'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

export const useCaseDetails = (caseId: string) => {
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  const [caseData, setCaseData] = useState<DetailedCase | null>(null)

  const fetchCaseDetails = useCallback(async () => {
    setIsLoading(true)
    setErrorCode(null)

    try {
      Logger.info('Buscando detalhes do caso', {
        prefix: 'Case',
        data: { caseId }
      })

      const response = await api.get<DetailedCase>(`/cases/client/${caseId}`)

      Logger.info('Aguardando transição visual', {
        prefix: 'Case'
      })

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))

      Logger.info('Detalhes do caso obtidos com sucesso', {
        prefix: 'Case',
        data: {
          title: response.data.title,
          status: response.data.status,
          documentsCount: response.data.documents.length,
          lawyer: response.data.lawyer ? response.data.lawyer.name : 'Nenhum'
        }
      })

      setCaseData(response.data)
      return response.data

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao buscar detalhes do caso', {
          prefix: 'Case',
          error,
          data: { errorCode: error.errorCode }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao buscar detalhes do caso', {
          prefix: 'Case',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
      return null

    } finally {
      Logger.info('Operação de busca de detalhes finalizada', {
        prefix: 'Case'
      })
      setIsLoading(false)
    }
  }, [caseId])

  useEffect(() => {
    if (caseId) {
      fetchCaseDetails()
    }
  }, [fetchCaseDetails, caseId])

  return {
    caseData,
    isLoading,
    errorCode,


    refreshCase: fetchCaseDetails,
    updateCaseData: setCaseData,
  }
} 