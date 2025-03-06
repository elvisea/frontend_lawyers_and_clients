'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

// Formulários e validação
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Componentes UI
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Tipos e constantes
import { ErrorCode } from '@/enums/error-code'
import { DocumentFormData } from '../documents/components/constants'

// Hooks
import { useUpdateCase } from '@/hooks/use-update-case'
import { useCaseDetails } from '@/hooks/use-case-details'
import { useUploadDocuments } from '@/hooks/use-upload-documents'
import { useRemoveDocument } from '@/hooks/use-remove-document'

// Componentes específicos
import { DocumentList } from '../documents/components/document-list'
import { DocumentForm } from '../documents/components/document-form'

// Schema para validação do formulário
const schema = yup.object({
  title: yup
    .string()
    .required('Por favor, insira um título para o caso.'),
  description: yup
    .string()
    .required('Por favor, insira uma descrição para o caso.'),
})

type FormData = yup.InferType<typeof schema>

interface EditCasePageProps {
  params: Promise<{ id: string }>
}

export default function EditCasePage({ params }: EditCasePageProps) {
  // Hooks e estados
  const router = useRouter()
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState('info')
  const [successMessage, setSuccessMessage] = useState('')

  // Hooks de API
  const {
    removeDocument,
    errorCode: removeErrorCode,
  } = useRemoveDocument()

  const {
    uploadDocuments,
    errorCode: uploadErrorCode,
    isLoading: isUploadingDocuments,
  } = useUploadDocuments(id)

  const {
    updateCase,
    errorCode: updateErrorCode,
    isLoading: isUpdatingCase,
  } = useUpdateCase(id)

  const {
    caseData,
    isLoading,
    updateCaseData,
    errorCode: caseErrorCode,
  } = useCaseDetails(id)

  // Configuração do formulário
  const form = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    }
  })

  // Efeitos
  useEffect(() => {
    if (caseData) {
      form.reset({
        title: caseData.title,
        description: caseData.description,
      })
    }
  }, [caseData, form])

  // Handlers
  const handleCaseUpdate = async (data: FormData) => {
    const success = await updateCase(data)

    if (success) {
      setSuccessMessage('Caso atualizado com sucesso!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const handleDocumentUpload = async (data: DocumentFormData) => {
    const novoDocumento = await uploadDocuments([data])

    if (caseData) {
      form.reset()

      const updatedDocuments = [...caseData.documents, ...novoDocumento]
      updateCaseData({ ...caseData, documents: updatedDocuments })

      setSuccessMessage('Documento adicionado com sucesso!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const handleDocumentRemove = async (documentId: string) => {
    const success = await removeDocument(documentId)

    if (success && caseData) {
      form.reset()

      const updatedDocuments = caseData.documents.filter(doc => doc.id !== documentId)
      updateCaseData({ ...caseData, documents: updatedDocuments })

      setSuccessMessage('Documento removido com sucesso!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  // Renderização condicional para estados de carregamento e erro
  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (caseErrorCode === ErrorCode.UNKNOWN_ERROR) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Erro inesperado</h2>
          <p className="text-muted-foreground">Não foi possível carregar os detalhes do caso. Tente novamente mais tarde.</p>
          <Button variant="outline" onClick={() => router.refresh()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    )
  }

  // Componente principal
  return (
    <div className="px-0 sm:px-2 md:px-4 max-w-screen-md mx-auto py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between px-2 sm:px-0">
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">Editar Caso</h1>
        </div>

        {activeTab === 'info' && (
          <Button
            onClick={form.handleSubmit(handleCaseUpdate)}
            disabled={isUpdatingCase}
            className="px-4 h-10"
          >
            {isUpdatingCase ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            <span className="text-sm sm:text-base">Salvar</span>
          </Button>
        )}
      </div>

      {/* Mensagens de feedback */}
      {successMessage && (
        <Alert className="bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400">
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {uploadErrorCode && (
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            Ocorreu um erro ao enviar o documento. Tente novamente.
          </AlertDescription>
        </Alert>
      )}

      {removeErrorCode && (
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            Ocorreu um erro ao remover o documento. Tente novamente.
          </AlertDescription>
        </Alert>
      )}

      {updateErrorCode && (
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            Ocorreu um erro ao atualizar o caso. Tente novamente.
          </AlertDescription>
        </Alert>
      )}

      {/* Conteúdo principal com abas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        {/* Aba de informações */}
        <TabsContent value="info" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Caso</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Caso</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Disputa de guarda de filhos"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição do Caso</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva seu caso em detalhes, incluindo datas, pessoas envolvidas e o que você espera conseguir..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de documentos */}
        <TabsContent value="documents" className="mt-4 space-y-6">
          {/* Formulário para adicionar documentos */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Novo Documento</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentForm
                onSubmit={handleDocumentUpload}
                isUploading={isUploadingDocuments}
              />
            </CardContent>
          </Card>

          <Separator />

          {/* Lista de documentos existentes */}
          <Card>
            <CardHeader>
              <CardTitle>Documentos Existentes</CardTitle>
            </CardHeader>
            <CardContent>
              {caseData?.documents && caseData.documents.length > 0 ? (
                <DocumentList
                  documents={caseData.documents}
                  onDelete={handleDocumentRemove}
                />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum documento adicionado ainda.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 