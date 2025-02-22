'use client'

import { useState, use, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import api from '@/http/api'
import useCreateCaseCharge from '@/hooks/use-create-case-charge'

import { CaseFeatures } from '@/types/case'

import { Loading } from '@/components/loading'
import { PixPayment } from '@/components/pix-payment'
import { SubscriptionPromo } from '@/components/subscription-promo'

type CaseCheckoutProps = {
  params: Promise<{ id: string }>
}

export default function CaseCheckout({ params }: CaseCheckoutProps) {
  const { id } = use(params)
  const router = useRouter()
  const hasInitializedRef = useRef(false)

  const [isLoading, setIsLoading] = useState(false)
  const [caseData, setCaseData] = useState<CaseFeatures | null>(null)
  const { caseCharge, isLoading: isLoadingCaseCharge, createCaseCharge } = useCreateCaseCharge(id)

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<CaseFeatures>(`/cases/${id}/features`)
        setCaseData(response.data)
      } catch (error) {
        console.error('❌ Erro ao carregar caso:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCase()
  }, [id])

  useEffect(() => {
    if (!hasInitializedRef.current && id) {
      createCaseCharge();
      hasInitializedRef.current = true;
    }
  }, [id]);

  const handleBack = () => router.back()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center h-16">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Checkout do Caso</h1>
        </div>
      </div>

      {/* Resumo do Caso */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Caso</CardTitle>
          <CardDescription>Detalhes da sua compra</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">Caso</p>
            <p className="text-sm text-muted-foreground">{caseData?.title}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Descrição</p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {caseData?.description}
            </p>
          </div>

          <Separator />

          <div className="flex justify-between">
            <p className="text-sm font-medium">Total</p>
            <div className="text-right">
              <p className="text-lg font-semibold">
                R$ {caseData?.price.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">pagamento único</p>
            </div>
          </div>

          {/* Card de Segurança */}
          <Card className="bg-muted/50 border-dashed mt-4">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="font-medium">Compra Protegida</p>
              </div>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                  Acesso imediato após a confirmação do pagamento
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                  Pagamento processado com criptografia
                </li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Pagamento PIX */}
      <PixPayment
        isLoading={isLoadingCaseCharge}
        pix={caseCharge}
        onRetry={createCaseCharge}
      />

      {/* Promoção de Assinatura */}
      <SubscriptionPromo />
    </div>
  )
} 