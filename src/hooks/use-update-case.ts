import { useState } from 'react'

import api from '@/http/api'

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
      console.log('📝 [Caso] Iniciando atualização do caso ID:', caseId)
      console.log('📋 [Caso] Dados para atualização:', {
        título: data.title,
        descrição: `${data.description.substring(0, 50)}${data.description.length > 50 ? '...' : ''}`
      })

      const response = await api.put<EditCaseResponse>(`/cases/${caseId}`, data)

      console.log(`✅ [Caso] Caso atualizado com sucesso! Status: ${response.status}`)
      console.log('📊 [Caso] Dados atualizados:', {
        id: response.data.id,
        título: response.data.title,
        atualizado: new Date(response.data.updatedAt).toLocaleString()
      })

      return true

    } catch (error) {
      if (error instanceof AppError) {
        console.error(`❌ [Caso] Erro ao atualizar caso: Código ${error.errorCode}`, error)
        setErrorCode(error.errorCode)
      } else {
        console.error('❌ [Caso] Erro desconhecido ao atualizar caso:', error)
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
      return false

    } finally {
      console.log('🏁 [Caso] Operação de atualização finalizada')
      setIsLoading(false)
    }
  }

  return {
    updateCase,
    isLoading,
    errorCode
  }
} 