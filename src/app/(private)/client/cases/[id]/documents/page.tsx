'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { CaseDocument } from '@/types/case'

import { DocumentForm } from './components/document-form'
import { DocumentList } from './components/document-list'
import { DocumentFormData } from './components/constants'

import { StepIndicator } from '../../new/components/step-indicator'

import { useRemoveDocument } from '@/hooks/use-remove-document'
import { useUploadDocuments } from '@/hooks/use-upload-documents'

const steps = [
  {
    title: 'Informações',
    description: 'Detalhes do caso'
  },
  {
    title: 'Documentos',
    description: 'Anexar arquivos'
  }
]

/**
 * Página de gerenciamento de documentos do caso
 */
export default function CaseDocumentsPage({ params }: { params: Promise<{ id: string }> }) {
  // Hooks e estados
  const router = useRouter()
  const { id: caseId } = use(params)
  const [documents, setDocuments] = useState<CaseDocument[]>([])

  // Hooks de API
  const {
    removeDocument,
    errorCode: removeErrorCode
  } = useRemoveDocument()

  const {
    uploadDocuments,
    isLoading: isUploading,
    errorCode: uploadErrorCode
  } = useUploadDocuments(caseId)

  /**
   * Handler para upload de documentos
   */
  const handleUploadDocuments = async (data: DocumentFormData) => {
    console.log('📤 [Página Documentos] Iniciando upload de documento...')
    console.log('📋 [Página Documentos] Dados:', {
      tipo: data.type,
      arquivo: data.file?.name,
      tamanho: `${(data.file?.size ?? 0 / 1024).toFixed(2)} KB`
    })

    const newDocuments = await uploadDocuments([data])

    if (newDocuments.length > 0) {
      console.log('✅ [Página Documentos] Documento adicionado com sucesso')
      setDocuments(prev => [...prev, ...newDocuments])
    } else {
      console.warn('⚠️ [Página Documentos] Nenhum documento retornado do servidor')
    }
  }

  /**
   * Handler para remoção de documentos
   */
  const handleRemoveDocument = async (documentId: string) => {
    console.log(`🗑️ [Página Documentos] Solicitando remoção do documento ID: ${documentId}`)

    const success = await removeDocument(documentId)

    if (success) {
      console.log('✅ [Página Documentos] Documento removido com sucesso')
      setDocuments(prev => prev.filter(doc => doc.id !== documentId))
    } else {
      console.error('❌ [Página Documentos] Falha ao remover documento')
    }
  }

  /**
   * Handler para navegação para visualização do caso
   */
  const handleViewCase = () => {
    console.log('🔄 [Página Documentos] Navegando para visualização do caso...')
    router.push(`/client/cases/${caseId}`)
  }

  return (
    <div className="container space-y-4 px-4 md:px-8 pt-6 pb-4 md:pb-8">
      {/* Container principal com largura máxima */}
      <div className="mx-auto max-w-3xl space-y-4">
        {/* Cabeçalho com navegação */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Adicionar Documentos</h1>
          </div>

          <Button
            onClick={handleViewCase}
            disabled={documents.length === 0}
            className="h-9 px-4"
          >
            <Eye className="h-4 w-4 mr-2" />
            <span className="text-sm">Ver Caso</span>
          </Button>
        </div>

        <StepIndicator currentStep={1} steps={steps} />

        {/* Alertas de erro */}
        {removeErrorCode && (
          <Alert variant="destructive">
            <AlertTitle>Erro ao remover documento</AlertTitle>
            <AlertDescription>Erro ao remover documento do servidor, tente novamente.</AlertDescription>
          </Alert>
        )}

        {uploadErrorCode && (
          <Alert variant="destructive">
            <AlertTitle>Erro ao enviar documento</AlertTitle>
            <AlertDescription>Erro ao enviar documento ao servidor, tente novamente.</AlertDescription>
          </Alert>
        )}

        {/* Descrição da etapa */}
        <div className="text-muted-foreground">
          <h2 className="text-lg font-medium text-foreground">Etapa 2: Documentos do Caso</h2>
          <p className="text-sm">
            Adicione documentos relevantes para seu caso. Documentos bem organizados
            ajudam os advogados a entender melhor sua situação e agilizam o processo.
          </p>
        </div>

        {/* Formulário de upload */}
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentForm
              onSubmit={handleUploadDocuments}
              isUploading={isUploading}
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Lista de documentos */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Existentes</CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length > 0 ? (
              <DocumentList
                documents={documents}
                onDelete={handleRemoveDocument}

              />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum documento adicionado ainda.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 