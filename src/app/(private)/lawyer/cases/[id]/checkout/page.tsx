'use client'

import { use, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { ErrorCode } from '@/enums/error-code'

import { useCaseFeatures } from '@/hooks/use-case-features'
import useCreateCaseCharge from '@/hooks/use-create-case-charge'
import { useCasePaymentMonitor } from '@/hooks/use-case-payment-monitor'

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

  const { caseData, isLoading: isLoadingCaseFeatures } = useCaseFeatures(id)

  const {
    caseCharge,
    isLoading: isLoadingCaseCharge,
    createCaseCharge,
    errorCode,
  } = useCreateCaseCharge(id)

  useEffect(() => {
    if (!hasInitializedRef.current) {
      createCaseCharge()
      hasInitializedRef.current = true
    }
  }, [createCaseCharge])

  // Inicializa a conexão WebSocket
  useCasePaymentMonitor(caseCharge);

  const handleBack = () => router.back()

  if (isLoadingCaseFeatures || isLoadingCaseCharge) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loading />
      </div>
    )
  }

  // Renderiza card de limite excedido
  if (errorCode === ErrorCode.CASES_LIMIT_EXCEEDED) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-2xl">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Limite de Casos Atingido</h3>
                  <p className="text-sm text-muted-foreground">
                    Você atingiu o limite de casos do seu plano atual. Para continuar adquirindo novos casos, considere fazer um upgrade para um plano com mais benefícios.
                  </p>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => router.push('/lawyer/subscription')}
                >
                  Ver Planos Disponíveis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
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