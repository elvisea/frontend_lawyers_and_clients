'use client'

import { useState } from 'react'
import { FileText, Eye, Trash2, Loader2 } from 'lucide-react'

import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { Button } from '@/components/ui/button'
import { CaseDocument } from '@/types/case'
import { useDocumentDownload } from '@/hooks/use-document-download'

interface DocumentListProps {
  documents: CaseDocument[]
  onDelete: (id: string) => Promise<void>
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  const [removingDocId, setRemovingDocId] = useState<string | null>(null)

  const { downloadDocument } = useDocumentDownload()

  const handleDelete = async (id: string) => {
    if (removingDocId) return
    setRemovingDocId(id)
    await onDelete(id)
    setRemovingDocId(null)
  }

  return (
    <div className="divide-y">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex flex-col w-full hover:bg-muted/50 transition-colors"
        >
          {/* Header: Tipo e Ações */}
          <div className="flex items-center justify-between p-4 pb-2">
            {/* Tipo do Documento */}
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-muted-foreground truncate">
                {doc.type}
              </h4>
            </div>

            {/* Ações */}
            <div className="flex items-center shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => downloadDocument(doc.id)}
                title="Visualizar documento"
              >
                <Eye className="h-4 w-4 text-muted-foreground" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-destructive hover:text-destructive"
                onClick={() => handleDelete(doc.id)}
                disabled={removingDocId === doc.id}
                title="Remover documento"
              >
                {removingDocId === doc.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Footer: Ícone, Nome e Data */}
          <div className="flex items-center gap-3 p-4 pt-2">
            {/* Ícone */}
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>

            {/* Info do Documento */}
            <div className="min-w-0 flex-1">
              {/* Nome do Arquivo */}
              <div className="min-w-0 max-w-[calc(100%-1rem)]">
                <p
                  className="text-sm font-medium truncate"
                  title={doc.name}
                >
                  {doc.name}
                </p>
              </div>

              {/* Data */}
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(doc.createdAt), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 