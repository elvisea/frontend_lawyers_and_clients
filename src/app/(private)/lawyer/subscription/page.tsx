'use client'

import { useEffect, useState } from 'react'
import { Check, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Plan, PlanInterval } from '@/types/subscription'
import { MOCK_PLANS } from './constants'
import { Loading } from '@/components/loading'

const intervalLabels: Record<PlanInterval, string> = {
  MONTHLY: 'Mensal',
  QUARTERLY: 'Trimestral',
  SEMIANNUALLY: 'Semestral',
  YEARLY: 'Anual'
}

export default function SubscriptionPage() {
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedInterval, setSelectedInterval] = useState<PlanInterval>('MONTHLY')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true)
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 750))
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
      // Por enquanto, vamos apenas redirecionar para o checkout
      // Quando a API estiver pronta, podemos fazer a chamada aqui
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
      <div className="w-full max-w-3xl space-y-6">
        {/* Header com botão de voltar */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-semibold">Planos e Preços</h1>
            <p className="text-sm text-muted-foreground">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>
          {/* Elemento vazio para manter o título centralizado */}
          <div className="w-9" />
        </div>

        {/* Seletor de Intervalo */}
        <div className="flex justify-center">
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

        {/* Cards dos Planos */}
        <div className="space-y-4">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative w-full transition-colors ${plan.type === 'PREMIUM'
                ? 'border-primary shadow-lg hover:border-primary'
                : 'hover:border-primary/50'
                }`}
            >
              {plan.type === 'PREMIUM' && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center gap-6 p-6">
                {/* Info do Plano */}
                <div className="flex-1 space-y-4">
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.maxCases === 50 ? 'Casos ilimitados' : `Até ${plan.maxCases} casos`}
                    </CardDescription>
                  </div>

                  {/* Preço */}
                  <div>
                    <p className="text-3xl font-bold">
                      R$ {plan.price.toFixed(2)}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{intervalLabels[plan.interval].toLowerCase()}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {plan.caseDiscount}% de desconto por caso
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão */}
                <div className="md:w-[200px] flex-shrink-0">
                  <Button
                    className={`w-full ${plan.type === 'PREMIUM'
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-primary border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary'
                      }`}
                    variant={plan.type === 'PREMIUM' ? 'default' : 'outline'}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    Assinar Plano
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 