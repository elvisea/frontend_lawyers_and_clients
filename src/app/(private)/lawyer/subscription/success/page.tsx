'use client'

import { useRouter } from 'next/navigation'

import {
  CheckCircle2,
  Sparkles,
  Zap,
  LayoutGrid,
  File,
  ArrowRight,
  Loader2
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { usePlans } from '@/hooks/use-plans'
import { useEffect, useState } from 'react'

export default function SubscriptionSuccess() {
  const router = useRouter()
  const { selected } = usePlans()
  const [isLoading, setIsLoading] = useState(false)

  const handleNavigate = (path: string) => router.push(path)

  useEffect(() => {
    const delay = async () => {
      setIsLoading(true)

      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))

      setIsLoading(false)
    }

    delay()
  }, [])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-12rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!selected) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <div className="text-center">
          <h3 className="text-sm font-semibold">Nenhum pagamento encontrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Esta página só pode ser acessada após a confirmação do pagamento de um plano.
          </p>
          <Button
            variant="default"
            size="sm"
            className="mt-4"
            onClick={() => router.push('/lawyer/subscription')}
          >
            Ver Planos Disponíveis
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-2xl">
        {/* Header com ícone e status */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <CardHeader className="relative pb-8 text-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-4 ring-primary/20">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Assinatura do Plano {selected?.name} Confirmada!</CardTitle>
            <CardDescription className="text-base mt-2">
              Seu plano {selected?.type.toLowerCase()} já está ativo com {selected?.maxCases} casos disponíveis
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-8 p-6">
          {/* Benefícios Ativados */}
          <div className="space-y-6">
            <Alert variant="default" className="bg-primary/5 border-primary/20">
              <AlertDescription>
                <h3 className="font-medium text-primary mb-2">Benefícios do Seu Plano</h3>
                <div className="grid gap-4">
                  {selected?.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{feature}</p>
                      </div>
                    </div>
                  ))}
                  {selected?.caseDiscount > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Desconto em Casos</p>
                        <p className="text-sm text-muted-foreground">
                          Até {selected.caseDiscount}% de desconto em todos os casos
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Próximos Passos</h3>
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <ul className="space-y-4 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                      <span>Você receberá um e-mail com os detalhes da sua assinatura</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                      <span>Acesse nossa biblioteca de casos exclusivos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                      <span>Configure suas preferências no dashboard</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-6 bg-muted/5 border-t">
          <Button
            size="lg"
            className="w-full"
            onClick={() => handleNavigate('/lawyer/cases')}
          >
            Ver Casos Disponíveis
            <File className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => handleNavigate('/lawyer/dashboard')}
          >
            Ir para Dashboard
            <LayoutGrid className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}