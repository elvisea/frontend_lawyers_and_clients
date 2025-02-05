'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
  LayoutGrid,
  File,
  ArrowRight
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

import { Loading } from '@/components/loading'

export default function SubscriptionSuccess() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (path: string) => router.push(path)

  if (isLoading) {
    return <Loading size="lg" />
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
            <CardTitle className="text-2xl font-bold">Assinatura Confirmada!</CardTitle>
            <CardDescription className="text-base mt-2">
              Seu plano já está ativo e você pode começar a usar agora mesmo
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-8 p-6">
          {/* Benefícios Ativados */}
          <div className="space-y-6">
            <Alert variant="default" className="bg-primary/5 border-primary/20">
              <AlertDescription>
                <h3 className="font-medium text-primary mb-2">Benefícios Ativados</h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Acesso Premium</p>
                      <p className="text-sm text-muted-foreground">
                        Casos exclusivos e prioridade nas novidades
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Garantia de Satisfação</p>
                      <p className="text-sm text-muted-foreground">
                        7 dias de garantia em todos os casos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Descontos Exclusivos</p>
                      <p className="text-sm text-muted-foreground">
                        Até 50% de desconto em todos os casos
                      </p>
                    </div>
                  </div>
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