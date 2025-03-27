import { useState, useEffect, useCallback } from 'react'

import api from '@/http/api'
import Logger from '@/utils/logger'
import { CaseFeatures } from '@/types/case'

export const useCaseFeatures = (caseId: string | null | undefined) => {
  const [isLoading, setIsLoading] = useState(true)
  const [caseData, setCaseData] = useState<CaseFeatures | null>(null)

  const fetchCaseFeatures = useCallback(async () => {
    if (!caseId) {
      Logger.warn('ID do caso não fornecido', {
        prefix: 'Case Features'
      })
      return
    }

    try {
      Logger.info('Iniciando carregamento dos dados do caso', {
        prefix: 'Case Features',
        data: { caseId }
      })
      
      setIsLoading(true)

      const response = await api.get<CaseFeatures>(`/cases/${caseId}/features`)

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))

      Logger.info('Dados do caso carregados com sucesso', {
        prefix: 'Case Features',
        data: response.data
      })

      setCaseData(response.data)

    } catch (error) {
      Logger.error('Erro ao carregar dados do caso', {
        prefix: 'Case Features',
        error
      })

      setCaseData(null)

    } finally {
      Logger.info('Carregamento do caso finalizado', {
        prefix: 'Case Features'
      })
      setIsLoading(false)
    }
  }, [caseId])

  useEffect(() => {
    fetchCaseFeatures()
  }, [fetchCaseFeatures])

  return {
    isLoading,
    caseData,
    refetch: fetchCaseFeatures
  }
} 