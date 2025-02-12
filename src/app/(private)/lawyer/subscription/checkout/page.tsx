'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, QrCode, Copy, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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

import api from '@/http/api'
import { usePlans } from '@/hooks/use-plans'
import { intervalLabels } from '../utils/interval-labels'

type PaymentMethod = 'credit-card' | 'pix'

interface PixResponse {
  id: string

  image?: string
  code: string
}

export default function SubscriptionCheckout() {
  const router = useRouter()
  const { selectedPlan } = usePlans()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card')
  const [isLoadingPix, setIsLoadingPix] = useState(false)
  const [pixData, setPixData] = useState<PixResponse | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)

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

  const handleFetchPixData = async () => {
    if (!selectedPlan) return

    setIsLoadingPix(true)
    try {
      const { data } = await api.post<PixResponse>('/payments/pix', {
        planId: selectedPlan.id
      })
      setPixData(data)
    } catch (error) {
      console.error('Erro ao gerar PIX:', error)
      setPixData(null)
    } finally {
      setIsLoadingPix(false)
    }
  }

  const handlePaymentMethodChange = (value: string) => {
    const method = value as PaymentMethod
    setPaymentMethod(method)

    if (method === 'pix') {
      setPixData(null) // Limpa dados anteriores apenas
    }
  }

  useEffect(() => {
    if (paymentMethod === 'pix') {
      handleFetchPixData()
    }
  }, [paymentMethod])

  const handleCopyPixCode = async () => {
    if (!pixData?.code) return

    try {
      await navigator.clipboard.writeText(pixData.code)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Erro ao copiar código:', error)
    }
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

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* Resumo do Plano */}
          <Card className="md:sticky md:top-4 min-h-[400px]">
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
          <Card className="min-h-[400px]">
            <CardHeader>
              <CardTitle>Forma de Pagamento</CardTitle>
              <CardDescription>
                Escolha como deseja realizar o pagamento
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs
                defaultValue="credit-card"
                onValueChange={handlePaymentMethodChange}
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
                <TabsContent value="pix" className="pt-6">
                  {isLoadingPix ? (
                    <div className="flex-1 flex items-center justify-center py-20">
                      <Loading />
                    </div>
                  ) : pixData ? (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center space-y-4">
                        <p className="text-sm text-muted-foreground text-center">
                          Escaneie o QR Code abaixo com o seu aplicativo de pagamento
                        </p>
                        <div className="border rounded-lg p-4 bg-white">
                          <img
                            src={pixData.image}
                            alt="QR Code PIX"
                            className="w-48 h-48 object-contain"
                          />
                        </div>

                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Ou copie o código PIX:</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 p-3 bg-muted rounded-lg text-xs font-mono break-all">
                            {pixData.code}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={handleCopyPixCode}
                            className={copySuccess ? 'text-green-500' : ''}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        {copySuccess && (
                          <p className="text-xs text-green-500">Código copiado!</p>
                        )}
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Importante</AlertTitle>
                        <AlertDescription className="text-sm">
                          Após realizar o pagamento, você receberá a confirmação por e-mail.
                          O processo pode levar alguns minutos.
                        </AlertDescription>
                      </Alert>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center py-16">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Não foi possível gerar o QR Code.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleFetchPixData}
                          className="mt-4"
                        >
                          Tentar novamente
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 