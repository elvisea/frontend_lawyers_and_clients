import { useState, useEffect, useCallback } from 'react'

import api from '@/http/api'
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
      console.log('🔍 [Caso] Buscando detalhes do caso ID:', caseId)

      const response = await api.get<DetailedCase>(`/cases/client/${caseId}`)

      // Delay artificial para suavizar a transição
      console.log('⏱️ [Caso] Aguardando transição visual...')
      await new Promise(resolve => setTimeout(resolve, 350))

      console.log('✅ [Caso] Detalhes do caso obtidos com sucesso!')
      console.log('📊 [Caso] Resumo:', {
        título: response.data.title,
        status: response.data.status,
        documentos: response.data.documents.length,
        advogado: response.data.lawyer ? response.data.lawyer.name : 'Nenhum'
      })

      setCaseData(response.data)
      return response.data

    } catch (error) {
      if (error instanceof AppError) {
        console.error(`❌ [Caso] Erro ao buscar detalhes: Código ${error.errorCode}`, error)
        setErrorCode(error.errorCode)
      } else {
        console.error('❌ [Caso] Erro desconhecido ao buscar detalhes:', error)
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
      return null

    } finally {
      console.log('🏁 [Caso] Operação de busca de detalhes finalizada')
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