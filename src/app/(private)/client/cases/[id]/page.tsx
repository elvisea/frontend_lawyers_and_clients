'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'

import { ArrowLeft, Clock, Edit, FileText, User } from 'lucide-react'

import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import api from '@/http/api'
import { Case } from '@/types/case'
import { statusMap } from '../components/case-card'

interface CaseDetailsProps {
  params: Promise<{ id: string }>
}

export default function CaseDetails({ params }: CaseDetailsProps) {
  const router = useRouter()
  const [caseData, setCaseData] = useState<Case | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = use(params)

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<Case>(`/cases/client/${id}`)
        setCaseData(response.data)
      } catch (error) {
        console.error('Erro ao carregar caso:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCase()
  }, [id])

  const handleBack = () => {
    router.push('/client/cases')
  }

  const handleEdit = () => {
    console.log("editar id", id)
  }

  if (isLoading) {
    return <div>Carregando...</div> // TODO: Adicionar skeleton
  }

  if (!caseData) {
    return <div>Caso não encontrado</div> // TODO: Adicionar componente de erro
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Detalhes do Caso</h1>
        </div>
        <Button onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Editar Caso
        </Button>
      </div>

      <div className="space-y-6">
        {/* Informações do Caso */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="line-clamp-1">{caseData.title}</CardTitle>
              <div className="flex items-center justify-center min-w-[140px]">
                <Badge
                  variant="outline"
                  className={`${statusMap[caseData.status].color} flex items-center justify-center w-full text-center`}
                >
                  {statusMap[caseData.status].label}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Descrição</h3>
              <p className="text-sm text-muted-foreground">{caseData.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Datas Importantes</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    Criado {formatDistanceToNow(new Date(caseData.createdAt), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </span>
                </div>
                {caseData.acceptedAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>
                      Aceito {formatDistanceToNow(new Date(caseData.acceptedAt), {
                        addSuffix: true,
                        locale: ptBR
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {caseData.documents.length > 0 ? (
                caseData.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{doc.type}</p>
                      <p className="text-xs text-muted-foreground">{doc.name}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground col-span-2">
                  Nenhum documento anexado
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações do Advogado */}
        {caseData.lawyer && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Advogado Responsável
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Informações Básicas e Contato */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Informações Básicas</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm">
                          <span className="text-muted-foreground">Nome:</span>{' '}
                          {caseData.lawyer.name}
                        </p>
                        <p className="text-sm">
                          <span className="text-muted-foreground">Email:</span>{' '}
                          {caseData.lawyer.email}
                        </p>
                      </div>
                    </div>

                    {caseData.lawyer.lawyerProfile && (
                      <div>
                        <h3 className="text-sm font-medium">Registro OAB</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Número:</span>{' '}
                            {caseData.lawyer.lawyerProfile.oabNumber}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Estado:</span>{' '}
                            {caseData.lawyer.lawyerProfile.oabState}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {caseData.lawyer.lawyerProfile && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">Contato</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Telefone:</span>{' '}
                            {caseData.lawyer.lawyerProfile.phone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">Localização</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Endereço:</span>{' '}
                            {caseData.lawyer.lawyerProfile.addressStreet},{' '}
                            {caseData.lawyer.lawyerProfile.addressNumber}
                            {caseData.lawyer.lawyerProfile.addressComplement && (
                              <> - {caseData.lawyer.lawyerProfile.addressComplement}</>
                            )}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Cidade/Estado:</span>{' '}
                            {caseData.lawyer.lawyerProfile.addressCity}/{caseData.lawyer.lawyerProfile.addressState}
                          </p>
                          <p className="text-sm">
                            <span className="text-muted-foreground">CEP:</span>{' '}
                            {caseData.lawyer.lawyerProfile.addressZip}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Experiência e Formação */}
                {caseData.lawyer.lawyerProfile && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">Experiência</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm">
                            <span className="text-muted-foreground">Anos de experiência:</span>{' '}
                            {caseData.lawyer.lawyerProfile.yearsOfExp} anos
                          </p>
                          <div>
                            <span className="text-sm text-muted-foreground">Especialidades:</span>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {caseData.lawyer.lawyerProfile.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">Formação</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {caseData.lawyer.lawyerProfile.education}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">Sobre</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {caseData.lawyer.lawyerProfile.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">Certificações</h3>
                        <div className="mt-2 space-y-1">
                          {caseData.lawyer.lawyerProfile.certificates.map((certificate) => (
                            <p key={certificate} className="text-sm text-muted-foreground">
                              • {certificate}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 