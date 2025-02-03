'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, use } from 'react'

import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import { ArrowLeft, Clock, FileText, User, ShoppingCart, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

import api from '@/http/api'

import { CaseFeatures } from '@/types/case'
import { statusMap } from '@/app/(private)/client/cases/components/case-card'

interface CaseDetailsProps {
  params: Promise<{ id: string }>
}

export default function CaseDetails({ params }: CaseDetailsProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [caseData, setCaseData] = useState<CaseFeatures | null>(null)

  const { id } = use(params)

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<CaseFeatures>(`/cases/${id}/features`)

        // Delay artificial para suavizar a transição
        await new Promise(resolve => setTimeout(resolve, 500))

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
    router.push('/lawyer/cases')
  }

  const handleBuyCase = () => {
    router.push(`/lawyer/cases/${id}/checkout`)
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button onClick={handleBuyCase} className="bg-green-600 hover:bg-green-700">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Comprar Caso - R$ {caseData.price.toFixed(2)}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Informações do Caso */}
          <Card>
            <CardHeader>
              <div className="space-y-2.5">
                <CardTitle className="line-clamp-2 text-base">
                  {caseData.title}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={`${statusMap[caseData.status].color} flex items-center justify-center h-7 w-full max-w-[140px]`}
                >
                  {statusMap[caseData.status].label}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Descrição */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Descrição</h3>
                <p className="text-sm text-muted-foreground">
                  {caseData.description}
                </p>
              </div>

              {/* Metadados */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {formatDistanceToNow(new Date(caseData.createdAt), {
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>
                    {caseData.documents.length}{' '}
                    {caseData.documents.length === 1 ? 'documento' : 'documentos'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{caseData.client.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documentos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseData.documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{document.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {document.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 