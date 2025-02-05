'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import {
  ArrowLeft,
  CreditCard,
  QrCode,
  Info,
  ShieldCheck,
  Lock,
  Clock
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Loading } from '@/components/loading'
import { CreditCardForm } from '@/components/credit-card-form'
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header'

import api from '@/http/api'
import { CaseFeatures } from '@/types/case'

interface CheckoutProps {
  params: Promise<{ id: string }>
}

export default function Checkout({ params }: CheckoutProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [caseData, setCaseData] = useState<CaseFeatures | null>(null)

  const { id } = use(params)

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

  const handleBack = () => router.back()

  const handlePurchase = async () => {
    try {
      setIsProcessing(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push(`/lawyer/cases/success?id=${id}`)
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-5xl space-y-8">
        <PageHeader className="relative pb-4">
          <div className="absolute left-0 top-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          <PageHeaderHeading>Finalizar Compra</PageHeaderHeading>
          <PageHeaderDescription>
            Complete sua compra de forma rápida e segura
          </PageHeaderDescription>
        </PageHeader>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Coluna da Esquerda - Detalhes do Caso */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Detalhes da Compra</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Caso</p>
                  <p className="text-sm text-muted-foreground">
                    {caseData?.title}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Descrição</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {caseData?.description}
                  </p>
                </div>
              </div>

              <Alert variant="default" className="bg-primary/5 border-primary/20">
                <Clock className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm ml-2">
                  Acesso imediato após a confirmação do pagamento
                </AlertDescription>
              </Alert>

              <Separator />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Total a pagar</p>
                  <p className="text-xs text-muted-foreground">Pagamento único</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    R$ {caseData?.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coluna da Direita - Pagamento e Informações */}
          <div className="space-y-6">
            {/* Métodos de Pagamento */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">Pagamento Seguro</CardTitle>
                </div>
                <CardDescription>
                  Escolha como deseja pagar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="credit-card"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="credit-card" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Cartão
                    </TabsTrigger>
                    <TabsTrigger value="pix" className="gap-2">
                      <QrCode className="h-4 w-4" />
                      PIX
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="credit-card" className="mt-4">
                    <CreditCardForm
                      onSubmit={handlePurchase}
                      isLoading={isProcessing}
                      buttonText="Finalizar Compra"
                    />
                  </TabsContent>
                  <TabsContent value="pix" className="mt-4">
                    <Card className="border-dashed">
                      <CardContent className="flex items-center justify-center h-[300px]">
                        <p className="text-sm text-muted-foreground">
                          Em breve disponível
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Card de Segurança */}
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <p className="font-medium">Compra Protegida</p>
                </div>
                <ul className="grid gap-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    Pagamento processado com criptografia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    Acesso imediato após confirmação
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                    Garantia de 7 dias
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Promoção de Assinatura */}
            <Alert variant="default" className="border-primary/20 bg-primary/5">
              <Info className="h-5 w-5 text-primary" />
              <AlertTitle className="mb-2 font-medium text-primary">
                Economize com Assinatura
              </AlertTitle>
              <AlertDescription className="text-sm text-muted-foreground">
                Assine nosso plano e tenha acesso a casos com até 50% de desconto
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => router.push('/lawyer/subscription')}
                >
                  Ver Planos
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
} 