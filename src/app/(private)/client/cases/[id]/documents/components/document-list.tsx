'use client'

import {
  FileText,
  Trash2,
  Eye,
  FileAudio,
  FileVideo,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  Loader2
} from 'lucide-react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Document } from '@/hooks/use-case-documents'

interface DocumentListProps {
  documents: Document[]
  onDelete: (id: string) => Promise<void>
  isLoading: boolean
}

export function DocumentList({ documents, onDelete, isLoading }: DocumentListProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-16">
            <p className="text-muted-foreground">Carregando documentos...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (documents.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-16">
            <p className="text-muted-foreground">Nenhum documento enviado ainda.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getFileIcon = (fileName: string, docType: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()

    // Verificar pelo tipo de documento
    if (docType.includes('Áudio')) {
      return <FileAudio className="h-5 w-5 text-purple-500" />
    }

    if (docType.includes('Vídeo')) {
      return <FileVideo className="h-5 w-5 text-blue-500" />
    }

    if (docType.includes('Fotografia') || docType.includes('Print')) {
      return <ImageIcon className="h-5 w-5 text-emerald-500" />
    }

    if (docType.includes('E-mail')) {
      return <Mail className="h-5 w-5 text-blue-500" />
    }

    if (docType.includes('Conversa')) {
      return <MessageSquare className="h-5 w-5 text-green-500" />
    }

    // Depois verificar pela extensão do arquivo
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <ImageIcon className="h-5 w-5 text-emerald-500" />
    }

    if (['pdf'].includes(extension || '')) {
      return <FileText className="h-5 w-5 text-red-500" />
    }

    if (['doc', 'docx'].includes(extension || '')) {
      return <FileText className="h-5 w-5 text-blue-500" />
    }

    if (['mp3', 'wav', 'ogg'].includes(extension || '')) {
      return <FileAudio className="h-5 w-5 text-purple-500" />
    }

    if (['mp4', 'mov', 'webm'].includes(extension || '')) {
      return <FileVideo className="h-5 w-5 text-blue-500" />
    }

    return <FileText className="h-5 w-5 text-primary" />
  }

  return (
    <Card className="w-full">
      <CardHeader className="py-4">
        <CardTitle className="text-lg">Documentos Enviados</CardTitle>
        <CardDescription>
          {documents.length} {documents.length === 1 ? 'documento' : 'documentos'} anexados ao caso
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-muted/30 border border-muted rounded-lg overflow-hidden hover:bg-muted/50 transition-colors"
            >
              <div className="p-3 flex flex-wrap items-start gap-3">
                <div className="bg-background p-2 rounded-md border flex-shrink-0">
                  {getFileIcon(doc.name, doc.type)}
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="font-medium text-sm truncate max-w-[200px] sm:max-w-full">{doc.name}</p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                      {doc.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(doc.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-auto mt-2 sm:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-background"
                    asChild
                  >
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" aria-label="Visualizar documento">
                      <Eye className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDelete(doc.id)}
                    aria-label="Excluir documento"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 