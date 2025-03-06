'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'

import { ArrowLeft, Clock, Edit, User, Loader2 } from 'lucide-react'

import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

import { useCaseDetails } from '@/hooks/use-case-details'
import { Button } from '@/components/ui/button'

import { statusMap } from '../components/case-card'
import { DocumentsList } from '@/components/documents-list'

interface CaseDetailsProps {
  params: Promise<{ id: string }>
}

export default function CaseDetails({ params }: CaseDetailsProps) {
  const router = useRouter()
  const { id } = use(params)

  const { caseData, isLoading } = useCaseDetails(id)

  const handleBack = () => {
    router.push('/client/cases')
  }

  const handleEdit = () => {
    router.push(`/client/cases/${id}/edit`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
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

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold">Detalhes do Caso</h1>
          </div>
          <Button onClick={handleEdit}>
            <Edit className="hidden sm:block h-4 w-4 sm:mr-2" />
            Editar Caso
          </Button>
        </div>

        <div className="space-y-6">
          {/* Informações do Caso */}
          <Card>
            <CardHeader>
              <div className="space-y-2.5">
                <CardTitle className="line-clamp-2 text-base">{caseData.title}</CardTitle>
                <Badge
                  variant="outline"
                  className={`${statusMap[caseData.status].color} flex items-center justify-center h-7 w-full max-w-[140px]`}
                >
                  {statusMap[caseData.status].label}
                </Badge>
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

          {/* Documentos - Nova implementação */}
          <DocumentsList
            documents={caseData.documents}
            isInteractive={false}
          />

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
    </div>
  )
} 