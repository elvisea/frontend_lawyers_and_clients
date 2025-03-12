'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

import { DocumentForm } from '@/app/(private)/client/cases/[id]/documents/components/document-form'
import { DocumentFormData } from '@/app/(private)/client/cases/[id]/documents/components/constants'
import { DocumentList } from '@/app/(private)/client/cases/[id]/documents/components/document-list'

import { CaseDocument } from '@/types/case'
import { useRemoveDocument } from '@/hooks/use-remove-document'
import { getErrorMessage } from '@/utils/get-error-message'
import { useUploadDocuments } from '@/hooks/use-upload-documents'

interface DocumentsPageProps {
  params: Promise<{
    userId: string
    caseId: string
  }>
}

export default function DocumentsPage({ params }: DocumentsPageProps) {
  const router = useRouter()
  const { caseId } = use(params)
  const [documents, setDocuments] = useState<CaseDocument[]>([])

  // Hooks de API
  const {
    removeDocument,
    errorCode: removeErrorCode,
  } = useRemoveDocument()

  const {
    uploadDocuments,
    errorCode: uploadErrorCode,
    isLoading: isUploading
  } = useUploadDocuments(caseId)

  // Handlers
  const handleUploadDocuments = async (data: DocumentFormData) => {
    const uploaded = await uploadDocuments([data])

    if (uploaded) {
      setDocuments(prev => [...prev, ...uploaded])
    }
  }

  const handleRemoveDocument = async (documentId: string) => {
    const success = await removeDocument(documentId)
    if (success) {
      setDocuments(prev => prev.filter(doc => doc.id !== documentId))
    }
  }

  return (
    <div className="space-y-6 min-h-full max-w-2xl mx-auto">
      {/* Header com 2 lados */}
      <div className="flex items-center justify-between">
        {/* Lado Esquerdo: Botão Voltar + Título */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            title="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-2xl font-semibold">Documentos do Caso</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Adicione ou remova documentos do caso
            </p>
          </div>
        </div>

        {/* Lado Direito: Botão Home */}
        <Button
          variant="ghost"
          size="icon"

          onClick={() => router.push('/users')}
          title="Ir para página inicial"
        >
          <Home />
        </Button>
      </div>

      {/* Formulário de upload */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Documento</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadErrorCode && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                {getErrorMessage(uploadErrorCode)}
              </AlertDescription>
            </Alert>
          )}

          <DocumentForm
            onSubmit={handleUploadDocuments}
            isUploading={isUploading}
          />
        </CardContent>
      </Card>

      <Separator />

      {/* Lista de documentos */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Documentos do Caso</CardTitle>
          <CardDescription>
            {documents.length} {documents.length === 1 ? 'documento anexado' : 'documentos anexados'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {removeErrorCode && (
            <Alert variant="destructive" className="m-6 mb-0">
              <AlertDescription>
                {getErrorMessage(removeErrorCode)}
              </AlertDescription>
            </Alert>
          )}

          <div className="divide-y">
            {documents.length > 0 ? (
              <DocumentList
                documents={documents}
                onDelete={handleRemoveDocument}
              />
            ) : (
              <div className="text-center py-8 text-muted-foreground px-6">
                Nenhum documento adicionado ainda.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 