'use client'

import { useState, useEffect } from 'react'
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

import { Loading } from '@/components/loading'
import { CreditCardForm } from '@/components/credit-card-form'

import { usePlans } from '@/hooks/use-plans'
import { intervalLabels } from '../utils/interval-labels'

type PaymentMethod = 'credit-card' | 'pix'

export default function SubscriptionCheckout() {
  const router = useRouter()
  const { selectedPlan } = usePlans()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card')

  console.log('paymentMethod', paymentMethod)

  useEffect(() => {
    if (!selectedPlan) {
      router.replace('/lawyer/subscription')
      return
    }
  }, [selectedPlan, router])

  const handleBack = () => router.back()

  const handlePayment = async () => {
    setIsProcessing(true)
    router.push('/lawyer/subscription/success')
  }

  if (!selectedPlan) {
    return <Loading />
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
              <CardDescription>Detalhes da sua assinatura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Plano Selecionado</p>
                <p className="text-sm text-muted-foreground">{selectedPlan.name}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Benefícios</p>
                <ul className="mt-2 space-y-2">
                  {selectedPlan.features.map((feature, index) => (
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
                    R$ {selectedPlan.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    /{intervalLabels[selectedPlan.interval].toLowerCase()}
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