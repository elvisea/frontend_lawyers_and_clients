import { useState } from 'react'
import api from '@/http/api'

export const useDocumentDownload = () => {
  const [isDownloading, setIsDownloading] = useState<Record<string, boolean>>({})

  const downloadDocument = async (documentId: string) => {
    try {
      setIsDownloading(prev => ({ ...prev, [documentId]: true }))
      console.log(`🔄 [Document] Iniciando acesso ao documento: ${documentId}`)

      const response = await api.get(`/documents/${documentId}/url`)

      console.log(`✅ [Document] URL do documento obtida com sucesso:`, response.data)

      // Usa window.open para permitir o comportamento padrão do navegador
      window.open(response.data.url, '_blank')

    } catch (error) {
      console.error('❌ [Document] Erro ao acessar documento:', error)
    } finally {
      setTimeout(() => {
        setIsDownloading(prev => ({ ...prev, [documentId]: false }))
      }, 500)
    }
  }

  return {
    isDownloading,
    downloadDocument
  }
} 