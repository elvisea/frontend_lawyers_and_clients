'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, QrCode } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


import { Plan } from '@/types/subscription'
import { CreditCardForm } from '@/components/credit-card-form'

import { MOCK_PLANS } from '../../constants'

interface CheckoutProps {
  params: Promise<{ planId: string }>
}

type PaymentMethod = 'credit-card' | 'pix'

export default function SubscriptionCheckout({ params }: CheckoutProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card')

  const { planId } = use(params)

  useEffect(() => {
    console.log('📝 SubscriptionCheckout - useEffect')
    console.log('├─ PlanId:', planId)
    console.log('├─ Loading:', isLoading)
    console.log('└─ Plan:', plan)

    const selectedPlan = MOCK_PLANS.find((p) => p.id === planId)
    setPlan(selectedPlan || null)
    setIsLoading(false)
  }, [planId])

  const handleBack = () => router.back()

  const handlePayment = async (data: unknown) => {
    try {
      console.log('📝 SubscriptionCheckout - handlePayment')
      console.log('├─ Payment Data:', data)
      console.log('├─ Plan:', plan)
      console.log('└─ Payment Method:', paymentMethod)

      setIsProcessing(true)
      // Implementar integração com gateway de pagamento
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push('/lawyer/subscription/success')
    } catch (error) {
      console.error('❌ Erro ao processar pagamento:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Checkout da Assinatura</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Resumo do Plano */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Plano</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Plano Selecionado</p>
                <p className="text-sm text-muted-foreground">{plan?.name}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Benefícios</p>
                <ul className="mt-2 space-y-2">
                  {plan?.features.map((feature, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="flex justify-between">
                <p className="text-sm font-medium">Total</p>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    R$ {plan?.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Cobrado {plan?.interval === 'MONTHLY' ? 'mensalmente' :
                      plan?.interval === 'QUARTERLY' ? 'trimestralmente' :
                        plan?.interval === 'SEMIANNUALLY' ? 'semestralmente' : 'anualmente'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métodos de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle>Forma de Pagamento</CardTitle>
              <CardDescription>
                Escolha como deseja realizar o pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="credit-card"
                onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="credit-card">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Cartão
                  </TabsTrigger>
                  <TabsTrigger value="pix">
                    <QrCode className="h-4 w-4 mr-2" />
                    PIX
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card">
                  <CreditCardForm
                    onSubmit={handlePayment}
                    isLoading={isProcessing}
                    buttonText="Assinar Plano"
                  />
                </TabsContent>
                <TabsContent value="pix">
                  {/* TODO: Implementar QR Code do PIX */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 