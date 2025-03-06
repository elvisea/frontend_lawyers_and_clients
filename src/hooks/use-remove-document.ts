import { useState } from "react"

import api from "@/http/api"

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
      console.warn('⚠️ [Documentos] Tentativa de remover documento com ID inválido')
      return false
    }

    try {
      // Iniciar processo de remoção
      console.log(`🗑️ [Documentos] Iniciando remoção do documento ID: ${documentId}`)
      setErrorCode(null)
      setIsLoading(true)

      // Chamada à API
      const response = await api.delete(`/documents/${documentId}`)
      console.log(`✅ [Documentos] Documento removido com sucesso! Status: ${response.status}`)
      return true

    } catch (error) {
      // Tratamento de erros
      if (error instanceof AppError) {
        console.error(`❌ [Documentos] Erro ao remover documento: Código ${error.errorCode}`, error)
        setErrorCode(error.errorCode)
      } else {
        console.error('❌ [Documentos] Erro desconhecido ao remover documento:', error)
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
      return false

    } finally {
      // Delay artificial para suavizar a transição
      console.log('⏱️ [Documentos] Aguardando transição visual...')
      await new Promise(resolve => setTimeout(resolve, 350))
      console.log('🏁 [Documentos] Operação de remoção finalizada')
      setIsLoading(false)
    }
  }

  // Retorna os estados e a função
  return {
    isLoading,
    errorCode,
    removeDocument,
  }
}
