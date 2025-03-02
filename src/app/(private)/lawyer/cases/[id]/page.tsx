'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingCart, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardCase } from '@/components/card-case'
import { DocumentsList } from '@/components/documents-list'

import { useSubscription } from '@/hooks/use-subscription';
import { useCaseFeatures } from '@/hooks/use-case-features';

interface CaseDetailsProps {
  params: Promise<{ id: string }>
}

export default function CaseDetails({ params }: CaseDetailsProps) {
  const router = useRouter()

  const { subscription } = useSubscription()

  const { id } = use(params)

  const { isLoading, caseData } = useCaseFeatures(id)

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
          <DocumentsList
            documents={caseData.documents}
            isInteractive={false}
          />

        </div>
      </div>
    </div>
  )
} 