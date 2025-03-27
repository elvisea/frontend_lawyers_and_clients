import { useState } from 'react'
import api from '@/http/api'
import Logger from '@/utils/logger'

export const useDocumentDownload = () => {
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({})

  const downloadDocument = async (documentId: string) => {
    try {
      setIsDownloading(prev => ({ ...prev, [documentId]: true }))
      
      Logger.info('Iniciando acesso ao documento', {
        prefix: 'Document',
        data: { 
          documentId: documentId.substring(0, 8)
        }
      })

      const response = await api.get(`/documents/${documentId}/url`)

      Logger.info('URL do documento obtida com sucesso', {
        prefix: 'Document',
        data: { 
          documentId: documentId.substring(0, 8),
          url: response.data.url.substring(0, 50) + '...'
        }
      })

      // Usa window.open para permitir o comportamento padrão do navegador
      window.open(response.data.url, '_blank')

    } catch (error) {
      Logger.error('Erro ao acessar documento', {
        prefix: 'Document',
        error,
        data: { documentId: documentId.substring(0, 8) }
      })
    } finally {
      setTimeout(() => {
        setIsDownloading(prev => ({ ...prev, [documentId]: false }))
        
        Logger.info('Operação de acesso finalizada', {
          prefix: 'Document',
          data: { documentId: documentId.substring(0, 8) }
        })
      }, 500)
    }
  }

  return {
    isDownloading,
    downloadDocument
  }
} 