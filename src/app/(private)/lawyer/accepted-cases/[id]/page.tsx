'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'

import { ArrowLeft, Clock, User, Phone, MessageSquare, AlertTriangle } from 'lucide-react'

import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import api from '@/http/api'

import { CaseStatus } from '@/types/case'
import { useDocumentDownload } from '@/hooks/use-document-download'

import { Loading } from '@/components/loading'
import { DocumentsList } from '@/components/documents-list'

import { statusMap } from '@/app/(private)/client/cases/components/case-card'

interface ClientDocuments {
  rg: string | null
  cpf: string
}

interface ClientAddress {
  street: string
  number: string
  city: string
  state: string
  complement: string
  neighborhood: string
  zipCode: string
}

interface AcceptedCase {
  id: string
  title: string
  description: string
  status: CaseStatus
  price: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  documents: {
    id: string
    url: string
    name: string
    type: string
  }[]
  client: {
    id: string
    name: string
    email: string
    phone?: string
    birthDate?: string
    occupation?: string
    documents?: ClientDocuments
    address?: ClientAddress
  }
}

interface AcceptedCasePageProps {
  params: Promise<{ id: string }>
}

export default function AcceptedCasePage({ params }: AcceptedCasePageProps) {
  const router = useRouter()
  const [caseData, setCaseData] = useState<AcceptedCase | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = use(params)
  const { isDownloading, downloadDocument } = useDocumentDownload()

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<AcceptedCase>(`/cases/${id}/accepted`)
        setCaseData(response.data)
      } catch (error) {
        console.error('❌ Erro ao carregar caso:', error)
      } finally {
        await new Promise(resolve => setTimeout(resolve, 350))
        setIsLoading(false)
      }
    }

    fetchCase()
  }, [id])

  const handleBack = () => router.back()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <Loading />
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <div className="text-center">
          <h3 className="text-sm font-semibold">Caso não encontrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            O caso que você está procurando não existe ou foi removido.
          </p>
        </div>
      </div>
    )
  }

  const hasProfile = Boolean(caseData.client.documents && caseData.client.address)

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="ml-4 text-2xl font-semibold">Detalhes do Caso</h1>
          </div>
        </div>

        {/* Alerta de Perfil Incompleto */}
        {!hasProfile && (
          <Alert variant="destructive" className="bg-yellow-50/50 text-yellow-800 dark:bg-yellow-900/10 dark:text-yellow-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Perfil do Cliente Incompleto</AlertTitle>
            <AlertDescription>
              O cliente ainda não completou seu perfil. Algumas informações podem estar indisponíveis.
            </AlertDescription>
          </Alert>
        )}

        {/* Informações do Caso */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{caseData.title}</span>
              <Badge variant="outline" className={`${statusMap[caseData.status].color} flex items-center justify-center h-7 w-full max-w-[140px]`}>{statusMap[caseData.status].label}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{caseData.description}</p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {formatDistanceToNow(new Date(caseData.createdAt), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Informações Principais */}
              <div>
                <h3 className="text-sm font-medium mb-4">Informações Principais</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Nome:</span>{' '}
                      {caseData.client.name}
                    </p>
                    {caseData.client.birthDate && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Data de Nascimento:</span>{' '}
                        {new Date(caseData.client.birthDate).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    {caseData.client.occupation && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Profissão:</span>{' '}
                        {caseData.client.occupation}
                      </p>
                    )}
                    {caseData.client.documents && (
                      <>
                        {caseData.client.documents.rg && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">RG:</span>{' '}
                            {caseData.client.documents.rg ? caseData.client.documents.rg : 'Não informado'}
                          </p>
                        )}
                        <p className="text-sm">
                          <span className="text-muted-foreground">CPF:</span>{' '}
                          {caseData.client.documents.cpf}
                        </p>
                      </>
                    )}
                  </div>

                  {caseData.client.address && (
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Endereço:</span>{' '}
                        {caseData.client.address.street}, {caseData.client.address.number}
                        {caseData.client.address.complement && ` - ${caseData.client.address.complement}`}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Bairro:</span>{' '}
                        {caseData.client.address.neighborhood}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Cidade/Estado:</span>{' '}
                        {caseData.client.address.city}/{caseData.client.address.state}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">CEP:</span>{' '}
                        {caseData.client.address.zipCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contatos */}
              <div>
                <h3 className="text-sm font-medium mb-4">Contatos</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      <span className="text-muted-foreground">Email:</span>{' '}
                      <a
                        href={`mailto:${caseData.client.email}`}
                        className="text-primary hover:underline"
                      >
                        {caseData.client.email}
                      </a>
                    </p>
                  </div>
                  {caseData.client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">
                        <span className="text-muted-foreground">Telefone:</span>{' '}
                        <a
                          href={`tel:${caseData.client.phone}`}
                          className="text-primary hover:underline"
                        >
                          {caseData.client.phone}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentos */}
        <DocumentsList
          documents={caseData.documents}
          isInteractive={true}
          isDownloading={isDownloading}
          onDocumentClick={downloadDocument}
        />
      </div>
    </div>
  )
}