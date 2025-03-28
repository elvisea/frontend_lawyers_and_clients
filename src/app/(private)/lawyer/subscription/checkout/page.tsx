'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import api from '@/http/api'

import { Loading } from '@/components/loading'
import { PixPayment } from '@/components/pix-payment'

import { usePlans } from '@/hooks/use-plans'
import usePixPayment from '@/hooks/use-pix-payment'
import { useSubscriptionPaymentMonitor } from '@/hooks/use-subscription-payment-monitor'

import { intervalLabels } from '../utils/interval-labels'

import Logger from '@/utils/logger'

export default function SubscriptionCheckout() {
  const hasInitializedRef = useRef(false)
  const router = useRouter()
  const [isActivating, setIsActivating] = useState(false)

  const { selected } = usePlans()
  const { pixData, isLoadingPix, fetchPixPayment } = usePixPayment(
    selected?.type !== 'FREE' ? selected?.id : null
  )

  useSubscriptionPaymentMonitor(selected?.type !== 'FREE' ? pixData?.id : null)

  useEffect(() => {
    if (!hasInitializedRef.current && selected?.id && selected?.type !== 'FREE') {
      fetchPixPayment()
      hasInitializedRef.current = true
    }
  }, [selected?.id, selected?.type, fetchPixPayment])

  useEffect(() => {
    if (!selected) {
      router.replace('/lawyer/subscription')
      return
    }
  }, [selected, router])

  const handleBack = () => router.back()

  const handleActivateFreeSubscription = async () => {
    try {
      setIsActivating(true)
      await api.post('/subscriptions/free', { planId: selected?.id })

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Plano gratuito ativado com sucesso', {
        prefix: 'Subscription',
        data: {
          planId: selected?.id
        }
      })

      router.push('/lawyer/subscription/success')
    } catch (error) {
      Logger.error('Erro ao ativar plano gratuito', {
        prefix: 'Subscription',
        error,
        data: {
          planId: selected?.id
        }
      })
    } finally {
      setIsActivating(false)
    }
  }

  if (!selected) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loading />
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
          <h1 className="text-2xl font-semibold">Checkout da Assinatura</h1>
        </div>
      </div>

      {/* Resumo do Plano */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Plano</CardTitle>
          <CardDescription>Detalhes da sua assinatura</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">Plano Selecionado</p>
            <p className="text-sm text-muted-foreground">{selected.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Benefícios</p>
            <ul className="mt-2 space-y-2">
              {selected.features.map((feature, index) => (
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
                {selected.type === 'FREE' ? 'Grátis' : `R$ ${selected.price.toFixed(2)}`}
              </p>
              {selected.type !== 'FREE' && (
                <p className="text-sm text-muted-foreground">
                  /{intervalLabels[selected.interval].toLowerCase()}
                </p>
              )}
            </div>
          </div>

          {/* Card de Segurança */}
          <Card className="bg-muted/50 border-dashed mt-4">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <p className="font-medium">
                  {selected.type === 'FREE' ? 'Plano Seguro' : 'Compra Protegida'}
                </p>
              </div>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {selected.type === 'FREE' ? (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      Acesso imediato após ativação
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      Sem compromisso de permanência
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      Acesso imediato após a confirmação
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                      Pagamento processado com criptografia
                    </li>
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Pagamento ou Ativação */}
      {selected.type === 'FREE' ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Ative seu Plano Gratuito</h3>
                <p className="text-sm text-muted-foreground">
                  Você está prestes a ativar o plano gratuito. Clique no botão abaixo para começar.
                </p>
              </div>
              <Button
                className="w-full mt-4"
                onClick={handleActivateFreeSubscription}
                disabled={isActivating}
              >
                {isActivating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ativando...
                  </>
                ) : (
                  'Ativar Plano Gratuito'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <PixPayment
          isLoading={isLoadingPix}
          pix={pixData}
          onRetry={fetchPixPayment}
        />
      )}
    </div>
  )
}