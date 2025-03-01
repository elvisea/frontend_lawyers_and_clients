import { useState, useEffect } from 'react'

import api from '@/http/api'
import { CaseFeatures } from '@/types/case'

export const useCaseFeatures = (caseId: string | null | undefined) => {
  const [isLoading, setIsLoading] = useState(true)
  const [caseData, setCaseData] = useState<CaseFeatures | null>(null)

  const fetchCaseFeatures = async () => {
    if (!caseId) {
      console.error('⚠️ [Case Features] ID do caso não fornecido')
      return
    }

    try {
      console.log(`🔍 [Case Features] Iniciando carregamento dos dados do caso: ${caseId}`)
      setIsLoading(true)


      const response = await api.get<CaseFeatures>(`/cases/${caseId}/features`)

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))

      console.log('✅ [Case Features] Dados do caso carregados com sucesso:', response.data)
      setCaseData(response.data)

    } catch (err) {
      console.error('❌ [Case Features] Erro ao carregar dados do caso:', err)

      setCaseData(null)

    } finally {
      console.log('🏁 [Case Features] Carregamento do caso finalizado')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCaseFeatures()
  }, [caseId])

  return {
    isLoading,
    caseData,
    refetch: fetchCaseFeatures
  }
} 