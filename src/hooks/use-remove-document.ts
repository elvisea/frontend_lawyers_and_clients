import { useState } from "react"

import api from "@/http/api"
import Logger from "@/utils/logger"

import { AppError } from "@/errors/app-error"
import { ErrorCode } from "@/enums/error-code"

/**
 * Hook para gerenciar a remoção de documentos
 * 
 * @returns {Object} Objeto contendo o estado e a função para remover documentos
 */
export const useRemoveDocument = () => {
  // Estados
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  /**
   * Remove um documento pelo seu ID
   * 
   * @param {string} documentId - ID do documento a ser removido
   * @returns {Promise<boolean>} Resultado da operação (sucesso/falha)
   */
  const removeDocument = async (documentId: string): Promise<boolean> => {
    // Validação inicial
    if (!documentId) {
      Logger.warn('Tentativa de remover documento com ID inválido', {
        prefix: 'Documentos'
      })
      return false
    }

    try {
      Logger.info('Iniciando remoção do documento', {
        prefix: 'Documentos',
        data: { documentId }
      })

      setErrorCode(null)
      setIsLoading(true)

      const response = await api.delete(`/documents/${documentId}`)

      Logger.info('Documento removido com sucesso', {
        prefix: 'Documentos',
        data: { status: response.status }
      })

      return true

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao remover documento', {
          prefix: 'Documentos',
          error,
          data: { errorCode: error.errorCode }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao remover documento', {
          prefix: 'Documentos',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
      return false

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de remoção finalizada', {
        prefix: 'Documentos'
      })
      
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    errorCode,
    removeDocument,
  }
}
