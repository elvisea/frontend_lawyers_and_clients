'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { CheckCircle2, ArrowRight, FileText, Mail, Clock, FileSearch, File } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Loading } from '@/components/loading'
import { Separator } from '@/components/ui/separator'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function CasePurchaseSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const caseId = searchParams.get('id')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('📝 CasePurchaseSuccess - useEffect')
    console.log('├─ CaseId:', caseId)
    console.log('└─ Loading:', isLoading)

    const timer = setTimeout(() => {
      console.log('📝 CasePurchaseSuccess - Timer Completed')
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [caseId, isLoading])

  const handleNavigate = (path: string) => {
    console.log('📝 CasePurchaseSuccess - Navigation')
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
            <CardTitle className="text-2xl font-bold">Compra Realizada!</CardTitle>
            <CardDescription className="text-base">
              O caso foi adicionado à sua lista e você já pode começar a trabalhar nele
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-6 p-6">
          {/* Status do Pedido */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Status do Pedido</h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Caso Liberado</p>
                  <p className="text-sm text-muted-foreground">
                    Acesso imediato a todo o conteúdo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Confirmação por E-mail</p>
                  <p className="text-sm text-muted-foreground">
                    Comprovante e detalhes enviados para seu e-mail
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Suporte Disponível</p>
                  <p className="text-sm text-muted-foreground">
                    7 dias de suporte para dúvidas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Dica de Economia */}
          <div className="rounded-lg bg-primary/5 p-4">
            <p className="text-sm font-medium">💡 Dica de Economia</p>
            <p className="text-sm text-muted-foreground mt-1">
              Assine um plano e economize até 50% em suas próximas compras
            </p>
            <Button
              variant="link"
              className="px-0 text-primary"
              onClick={() => handleNavigate('/lawyer/subscription')}
            >
              Conhecer planos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 p-6 bg-muted/5">
          <Button
            className="w-full"
            onClick={() => handleNavigate(`/lawyer/cases/${caseId}`)}
          >
            Ver Detalhes do Caso
            <FileSearch className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleNavigate('/lawyer/cases')}
          >
            Ver Outros Casos
            <File className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 