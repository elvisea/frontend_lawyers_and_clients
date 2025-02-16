'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileText, ShoppingCart, Loader2 } from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { CardCase } from '@/components/card-case'

import api from '@/http/api'

import { CaseFeatures } from '@/types/case'
import { SubscriptionResponse } from '@/types/subscription'

import { useAuth } from '@/contexts/auth-context'

interface CaseDetailsProps {
  params: Promise<{ id: string }>
}

export default function CaseDetails({ params }: CaseDetailsProps) {
  const router = useRouter()
  const { subscription, handleSubscription } = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [caseData, setCaseData] = useState<CaseFeatures | null>(null)

  const { id } = use(params)

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<CaseFeatures>(`/cases/${id}/features`)

        // Delay artificial para suavizar a transição
        await new Promise(resolve => setTimeout(resolve, 350))

        setCaseData(response.data)
      } catch (error) {
        console.error('Erro ao carregar caso:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCase()
  }, [id])

  useEffect(() => {
    const checkSubscription = async () => {
      if (!subscription) {
        try {
          const { data: { subscription } } = await api.get<SubscriptionResponse>('/subscriptions')
          console.log("🔍 [Subscription] Tem assinatura?", subscription)
          handleSubscription(subscription)

        } catch (error) {
          console.error('Erro ao verificar assinatura:', error)
          handleSubscription(null)
        }
      }
    }

    checkSubscription()

  }, [subscription, handleSubscription])

  const handleBack = () => router.push('/lawyer/cases')

  const handleBuyCase = () => {
    if (subscription) {
      router.push('/lawyer/subscription')
    } else {
      router.push(`/lawyer/cases/${id}/checkout`)
    }
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
          <CardCase
            title={caseData.title}
            description={caseData.description}
            status={caseData.status}
            documents={caseData.documents.length}
            createdAt={caseData.createdAt}
            client={{ name: caseData.client.name }}
          />

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