'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Sparkles, Shield, Zap, LayoutGrid, File } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { Loading } from '@/components/loading'

export default function SubscriptionSuccess() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('📝 SubscriptionSuccess - useEffect')
    console.log('└─ Loading:', isLoading)

    const timer = setTimeout(() => {
      console.log('📝 SubscriptionSuccess - Timer Completed')
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isLoading])

  const handleNavigate = (path: string) => {
    console.log('📝 SubscriptionSuccess - Navigation')
    console.log('└─ Path:', path)
    router.push(path)
  }

  if (isLoading) {
    return <Loading size="lg" />
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-xl">
        {/* Header com ícone e status */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <CardHeader className="relative pb-8 text-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Assinatura Confirmada!</CardTitle>
            <CardDescription className="text-base">
              Seu plano já está ativo e você pode começar a usar agora mesmo
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-6 p-6">
          {/* Benefícios Ativados */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Benefícios Ativados</h3>
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
          </div>

          <Separator />

          {/* Próximos Passos */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Próximos Passos</h3>
            <div className="space-y-2 text-sm">
              <p>• Você receberá um e-mail com os detalhes da sua assinatura</p>
              <p>• Acesse nossa biblioteca de casos exclusivos</p>
              <p>• Configure suas preferências no dashboard</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 p-6 bg-muted/5">
          <Button
            className="w-full"
            onClick={() => handleNavigate('/lawyer/cases')}
          >
            Ver Casos Disponíveis
            <File className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
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