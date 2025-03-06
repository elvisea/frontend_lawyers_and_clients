import { useState } from 'react'
import { FileText, Download, Trash2, Loader2 } from 'lucide-react'

import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type Document = {
  id: string
  type: string
  fileName: string
  fileUrl: string
  createdAt: string
}

interface DocumentsListProps {
  documents: Document[]
  isInteractive?: boolean
  onRemove?: (documentId: string) => Promise<void>
  isRemoving?: boolean
}

export function DocumentsList({
  documents,
  isInteractive = false,
  onRemove,
  isRemoving = false
}: DocumentsListProps) {
  const [documentToRemove, setDocumentToRemove] = useState<string | null>(null)

  const handleRemove = async (documentId: string) => {
    if (onRemove) {
      await onRemove(documentId)
      setDocumentToRemove(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos do Caso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhum documento adicionado ainda.
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{doc.type}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">
                      {doc.fileName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Adicionado {formatDistanceToNow(new Date(doc.createdAt), {
                        addSuffix: true,
                        locale: ptBR
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" download>
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Baixar documento</span>
                    </a>
                  </Button>

                  {isInteractive && onRemove && (
                    <AlertDialog open={documentToRemove === doc.id} onOpenChange={(open) => !open && setDocumentToRemove(null)}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDocumentToRemove(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remover documento</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remover documento</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja remover este documento? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemove(doc.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isRemoving && documentToRemove === doc.id}
                          >
                            {isRemoving && documentToRemove === doc.id ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Trash2 className="h-4 w-4 mr-2" />
                            )}
                            Remover
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 