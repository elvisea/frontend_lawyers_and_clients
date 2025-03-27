import { useState } from "react"

import { ErrorCode } from "@/enums/error-code"
import { DocumentFormData } from "@/app/(private)/client/cases/[id]/documents/components/constants"
import api from "@/http/api"
import Logger from "@/utils/logger"
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
      Logger.warn('Tentativa de upload sem ID do caso', {
        prefix: 'Documentos'
      })
      return []
    }

    if (!data.length) {
      Logger.warn('Tentativa de upload sem documentos', {
        prefix: 'Documentos'
      })
      return []
    }

    // Iniciar processo de upload
    setErrorCode(null)
    setIsLoading(true)

    try {
      Logger.info('Iniciando upload de documentos', {
        prefix: 'Documentos',
        data: {
          caseId,
          quantidade: data.length,
          tipos: data.map(d => d.type)
        }
      })

      // Preparar dados para upload
      const formData = new FormData()
      const types: string[] = []

      // Adicionar arquivos ao FormData
      data.forEach((doc, index) => {
        if (doc.file) {
          formData.append('files', doc.file)
          types.push(doc.type)
          
          Logger.info('Arquivo adicionado ao FormData', {
            prefix: 'Documentos',
            data: {
              index: index + 1,
              nome: doc.file.name,
              tamanho: `${(doc.file.size / 1024).toFixed(2)} KB`,
              tipo: doc.type
            }
          })
        }
      })

      // Adicionar tipos ao FormData
      types.forEach((type) => {
        formData.append('types', type)
      })

      // Enviar requisição
      Logger.info('Enviando requisição para o servidor', {
        prefix: 'Documentos',
        data: { caseId }
      })
      const response = await api.post<CaseDocument[]>(`/documents/case/${caseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Processar resposta
      Logger.info('Upload concluído com sucesso', {
        prefix: 'Documentos',
        data: {
          status: response.status,
          documentosProcessados: response.data.length,
          documentos: response.data.map(doc => ({
            id: doc.id,
            tipo: doc.type
          }))
        }
      })

      return response.data

    } catch (error) {
      // Tratamento de erros
      if (error instanceof AppError) {
        Logger.error('Erro no upload de documentos', {
          prefix: 'Documentos',
          error,
          data: { 
            caseId,
            errorCode: error.errorCode 
          }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido no upload de documentos', {
          prefix: 'Documentos',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

      return []

    } finally {
      // Finalização
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de upload finalizada', {
        prefix: 'Documentos'
      })
      
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
