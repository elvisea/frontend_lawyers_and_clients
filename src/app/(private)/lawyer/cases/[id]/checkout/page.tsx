'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, QrCode } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Loading } from '@/components/loading'
import { CreditCardForm } from '@/components/credit-card-form'

import api from '@/http/api'
import { CaseFeatures } from '@/types/case'

interface CheckoutProps {
  params: Promise<{ id: string }>
}

type PaymentMethod = 'credit-card' | 'pix'

export default function Checkout({ params }: CheckoutProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [caseData, setCaseData] = useState<CaseFeatures | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card')

  const { id } = use(params)

  useEffect(() => {
    console.log('📝 CaseCheckout - useEffect')
    console.log('├─ CaseId:', id)
    console.log('├─ Loading:', isLoading)
    console.log('└─ Case Data:', caseData)

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

  const handleBack = () => router.back()

  const handlePayment = async (data: unknown) => {
    try {
      console.log('📝 CaseCheckout - handlePayment')
      console.log('├─ Payment Data:', data)
      console.log('├─ Case:', caseData)
      console.log('└─ Payment Method:', paymentMethod)

      setIsProcessing(true)
      // Implementar integração com gateway de pagamento
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push(`/lawyer/cases/success?id=${id}`)
    } catch (error) {
      console.error('❌ Erro ao processar pagamento:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
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
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Resumo do Caso */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo da Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Caso</p>
                <p className="text-sm text-muted-foreground">{caseData?.title}</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p className="text-sm font-medium">Total</p>
                <p className="text-lg font-semibold">
                  R$ {caseData?.price.toFixed(2)}
                </p>
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
                    buttonText="Finalizar Compra"
                  />
                </TabsContent>
                <TabsContent value="pix">
                  {/* TODO: Implementar QR Code do PIX */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Promoção de Assinatura */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Economize com Assinatura</CardTitle>
            <CardDescription>
              Assine nosso plano e tenha acesso a casos com até 50% de desconto
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/lawyer/subscription')}
            >
              Ver Planos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 