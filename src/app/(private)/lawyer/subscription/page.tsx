'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Info,
} from 'lucide-react'

import { useAuth } from '@/contexts/auth-context'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header'
import { Loading } from '@/components/loading'

import { Plan, PlanInterval } from '@/types/subscription'
import { MOCK_PLANS } from './constants'

const intervalLabels: Record<PlanInterval, string> = {
  MONTHLY: 'Mensal',
  QUARTERLY: 'Trimestral',
  SEMIANNUALLY: 'Semestral',
  YEARLY: 'Anual',
}

export default function SubscriptionPage() {
  const router = useRouter()

  const { subscription } = useAuth()
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedInterval, setSelectedInterval] = useState<PlanInterval>('MONTHLY')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true)
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 500))
        setPlans(MOCK_PLANS)
      } catch (error) {
        console.error('Erro ao carregar planos:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlans()
  }, [])

  const filteredPlans = plans.filter(plan => plan.interval === selectedInterval)

  const handleSubscribe = async (planId: string) => {
    try {
      router.push(`/lawyer/subscription/checkout/${planId}`)
    } catch (error) {
      console.error('Erro ao assinar plano:', error)
    }
  }

  const handleBack = () => router.back()

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl space-y-8">
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
          <PageHeaderHeading>Planos e Preços</PageHeaderHeading>
          <PageHeaderDescription>
            {subscription
              ? 'Gerencie sua assinatura ou mude de plano'
              : 'Escolha o plano ideal para suas necessidades'
            }
          </PageHeaderDescription>
        </PageHeader>

        {!subscription && (
          <Alert variant="default" className="border-primary/20 bg-primary/5">
            <Info className="h-5 w-5 text-primary" />
            <AlertTitle className="text-primary font-medium mb-2">
              Assinatura necessária
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground leading-relaxed">
              Para acessar e comprar casos individuais em nossa plataforma, é necessário ter uma assinatura ativa.
              <span className="block mt-1">
                Não se preocupe! Temos opções que cabem no seu orçamento, incluindo um plano gratuito para você começar.
              </span>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <Select
              value={selectedInterval}
              onValueChange={(value) => setSelectedInterval(value as PlanInterval)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(intervalLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator className="my-4" />
        </div>

        <div className="grid gap-6">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all hover:shadow-md ${plan.type === 'PREMIUM'
                ? 'border-primary shadow-lg'
                : 'hover:border-primary/50'
                }`}
            >
              {plan.type === 'PREMIUM' && (
                <Badge
                  variant="default"
                  className="absolute -top-2.5 right-4 px-3 py-1"
                >
                  Mais Popular
                </Badge>
              )}

              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.maxCases === 50 ? 'Casos ilimitados' : `Até ${plan.maxCases} casos`}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      R$ {plan.price.toFixed(2)}
                    </div>
                    <CardDescription>
                      /{intervalLabels[plan.interval].toLowerCase()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="grid gap-4">
                <div className="text-sm text-muted-foreground">
                  {plan.caseDiscount}% de desconto por caso
                </div>

                <Separator />

                <ul className="grid gap-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full mt-4 ${plan.type === 'PREMIUM'
                    ? 'bg-primary hover:bg-primary/90'
                    : ''
                    }`}
                  variant={plan.type === 'PREMIUM' ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  Assinar Plano
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 