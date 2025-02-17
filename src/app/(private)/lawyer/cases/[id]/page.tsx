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

import { useSubscription } from '@/hooks/use-subscription';

interface CaseDetailsProps {
  params: Promise<{ id: string }>
}

export default function CaseDetails({ params }: CaseDetailsProps) {
  const router = useRouter()

  const { subscription } = useSubscription()

  const [isLoading, setIsLoading] = useState(true)
  const [caseData, setCaseData] = useState<CaseFeatures | null>(null)

  const { id } = use(params)

  useEffect(() => {
    const fetchCase = async () => {
      try {
        console.log(`🔍 [Case] Iniciando carregamento dos dados do caso com ID: ${id}`)
        setIsLoading(true)
        const response = await api.get<CaseFeatures>(`/cases/${id}/features`)

        // Delay artificial para suavizar a transição
        await new Promise(resolve => setTimeout(resolve, 350))

        console.log(`✅ [Case] Dados do caso carregados com sucesso:`, response.data)
        setCaseData(response.data)
      } catch (error) {
        console.error('🚨 [Case] Erro ao carregar dados do caso:', error)
      } finally {
        console.log('🏁 [Case] Carregamento do caso finalizado')
        setIsLoading(false)
      }
    }

    fetchCase()
  }, [id])


  const handleBack = () => router.push('/lawyer/cases')

  const handleBuyCase = () => {
    console.log('🔍 [Case] Iniciando o processo de compra do caso')

    if (subscription) {
      console.log('✅ [Case] Assinatura ativa encontrada, redirecionando para checkout...')
      router.push(`/lawyer/cases/${id}/checkout`)
    } else {
      console.log('⚠️ [Case] Nenhuma assinatura ativa encontrada, redirecionando para página de assinatura...')
      router.push('/lawyer/subscription')
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