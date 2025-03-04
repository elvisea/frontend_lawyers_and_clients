'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Eye } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { DocumentForm } from './components/document-form'
import { DocumentList } from './components/document-list'

import { useCaseDocuments } from '@/hooks/use-case-documents'
import { StepIndicator } from '../../new/components/step-indicator'
import { DocumentFormData } from './components/constants'

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

export default function CaseDocumentsPage({ params }: { params: Promise<{ id: string }> }) {

  const resolvedParams = use(params)
  const caseId = resolvedParams.id

  const router = useRouter()

  const {
    documents,
    isLoading,
    isUploading,
    errorCode,
    deleteDocument,
    uploadDocument,
  } = useCaseDocuments(caseId)

  const handleUpload = async (data: DocumentFormData) => {
    await uploadDocument(data)
  }

  const handleDelete = async (documentId: string) => {
    await deleteDocument(documentId)
  }

  const handleViewCase = () => {
    router.push(`/client/cases/${caseId}`)
  }

  return (
    <div className="px-4 max-w-screen-md mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Adicionar Documentos</h1>
      </div>

      <StepIndicator currentStep={1} steps={steps} />

      <div className="space-y-6">
        <div className="text-muted-foreground">
          <h2 className="text-lg font-medium text-foreground">Etapa 2: Documentos do Caso</h2>
          <p>
            Adicione documentos relevantes para seu caso. Documentos bem organizados
            ajudam os advogados a entender melhor sua situação e agilizam o processo.
          </p>
        </div>

        {errorCode && (
          <Alert variant="destructive">
            <AlertTitle>Erro ao enviar documento</AlertTitle>
            <AlertDescription>{errorCode}</AlertDescription>
          </Alert>
        )}

        <DocumentForm onSubmit={handleUpload} isUploading={isUploading} />

        <div className="mt-6">
          <DocumentList
            documents={documents}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleViewCase}
            disabled={documents.length === 0}
            className="w-full sm:w-auto"
          >
            Ver Caso
            <Eye className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 