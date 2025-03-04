import { useState, useEffect, useCallback } from 'react'

import api from '@/http/api'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import { DocumentFormData } from '@/app/(private)/client/cases/[id]/documents/components/constants'

export interface Document {
  id: string
  name: string
  type: string
  url: string
  caseId: string
  createdAt: string
  updatedAt: string
}

export const useCaseDocuments = (caseId: string) => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  // Função para carregar documentos iniciais (se necessário)
  const fetchInitialDocuments = useCallback(async () => {
    if (!caseId) return

    setIsLoading(true)
    setErrorCode(null)

    try {
      // Se houver uma rota para buscar documentos existentes, use-a aqui
      // Por enquanto, apenas inicializamos com uma lista vazia
      setDocuments([])
    } catch (error) {
      console.error('❌ [Documentos] Erro ao carregar documentos iniciais:', error)

      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
    } finally {
      setIsLoading(false)
    }
  }, [caseId])

  const uploadDocuments = async (data: DocumentFormData[]): Promise<boolean> => {
    if (!caseId || !data.length) return false

    setIsUploading(true)
    setErrorCode(null)

    try {
      console.log(`📤 [Documentos] Enviando ${data.length} documentos para o caso: ${caseId}`)

      const formData = new FormData()

      // Extrair tipos e arquivos para arrays separados
      const types: string[] = []

      // Adicionar cada arquivo ao FormData
      data.forEach((doc) => {
        if (doc.file) {
          formData.append('files', doc.file)
          types.push(doc.type)
        }
      })

      // Adicionar os tipos como um array
      types.forEach((type) => {
        formData.append('types', type)
      })

      const response = await api.post<Document[]>(`/cases/${caseId}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('✅ [Documentos] Documentos enviados com sucesso')
      console.log("🔍 [Documentos] Resposta:", response.data)

      // Adicionar os novos documentos à lista existente
      setDocuments(prevDocuments => [...prevDocuments, ...response.data])
      return true

    } catch (error) {
      console.error('❌ [Documentos] Erro ao enviar documentos:', error)

      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

      return false

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))

      setIsUploading(false)
    }
  }

  const uploadDocument = async (data: DocumentFormData): Promise<boolean> => {
    return uploadDocuments([data])
  }

  const deleteDocument = async (documentId: string): Promise<boolean> => {
    if (!caseId || !documentId) return false

    try {
      console.log(`🗑️ [Documentos] Removendo documento: ${documentId}`)

      await api.delete(`/documents/${documentId}`)

      console.log('✅ [Documentos] Documento removido com sucesso')
      setDocuments(prev => prev.filter(doc => doc.id !== documentId))
      return true

    } catch (error) {
      console.error('❌ [Documentos] Erro ao remover documento:', error)

      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
      return false

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 4000))
    }
  }

  // Carregar documentos iniciais quando o componente montar
  useEffect(() => {
    fetchInitialDocuments()
  }, [fetchInitialDocuments])

  return {
    documents,
    isLoading,
    isUploading,
    errorCode,
    uploadDocument,
    uploadDocuments,
    deleteDocument
  }
} 