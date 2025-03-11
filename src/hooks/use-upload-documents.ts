import { useState } from "react"

import { ErrorCode } from "@/enums/error-code"
import { DocumentFormData } from "@/app/(private)/client/cases/[id]/documents/components/constants"
import api from "@/http/api"
import { CaseDocument } from "@/types/case"
import { AppError } from "@/errors/app-error"

/**
 * Hook para gerenciar o upload de documentos para um caso
 * 
 * @param {string} caseId - ID do caso para o qual os documentos serão enviados
 * @returns {Object} Objeto contendo o estado e a função para upload de documentos
 */
export const useUploadDocuments = (caseId: string) => {
  // Estados
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  /**
   * Realiza o upload de documentos para um caso
   * 
   * @param {DocumentFormData[]} data - Array de documentos a serem enviados
   * @returns {Promise<CaseDocument[]>} Array de documentos processados pelo servidor
   */
  const uploadDocuments = async (data: DocumentFormData[]): Promise<CaseDocument[]> => {
    // Validação inicial
    if (!caseId) {
      console.warn('⚠️ [Documentos] Tentativa de upload sem ID do caso')
      return []
    }

    if (!data.length) {
      console.warn('⚠️ [Documentos] Tentativa de upload sem documentos')
      return []
    }

    // Iniciar processo de upload
    setErrorCode(null)
    setIsLoading(true)

    try {
      // Preparar dados para upload
      console.log(`📤 [Documentos] Iniciando upload de ${data.length} documento(s) para o caso ID: ${caseId}`)
      console.log(`📋 [Documentos] Tipos: ${data.map(d => d.type).join(', ')}`)

      const formData = new FormData()
      const types: string[] = []

      // Adicionar arquivos ao FormData
      data.forEach((doc, index) => {
        if (doc.file) {
          formData.append('files', doc.file)
          types.push(doc.type)
          console.log(`📎 [Documentos] Arquivo ${index + 1}: ${doc.file.name} (${(doc.file.size / 1024).toFixed(2)} KB)`)
        }
      })

      // Adicionar tipos ao FormData
      types.forEach((type) => {
        formData.append('types', type)
      })

      // Enviar requisição
      console.log('🔄 [Documentos] Enviando requisição para o servidor...')
      const response = await api.post<CaseDocument[]>(`/documents/case/${caseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Processar resposta
      console.log(`✅ [Documentos] Upload concluído com sucesso! Status: ${response.status}`)
      console.log(`📦 [Documentos] ${response.data.length} documento(s) processado(s) pelo servidor`)

      return response.data

    } catch (error) {
      // Tratamento de erros
      if (error instanceof AppError) {
        console.error(`❌ [Documentos] Erro no upload: Código ${error.errorCode}`, error)
        setErrorCode(error.errorCode)
      } else {
        console.error('❌ [Documentos] Erro desconhecido no upload:', error)
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

      return []

    } finally {
      // Finalização
      console.log('⏱️ [Documentos] Aguardando transição visual...')
      await new Promise(resolve => setTimeout(resolve, 350))
      console.log('🏁 [Documentos] Operação de upload finalizada')
      setIsLoading(false)
    }
  }

  // Retorna os estados e a função
  return {
    uploadDocuments,
    isLoading,
    errorCode
  }
}
