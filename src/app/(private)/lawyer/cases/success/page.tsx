'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  CheckCircle2,
  ArrowRight,
  FileText,
  Mail,
  Clock,
  FileSearch,
  File,
  ShieldCheck
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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

export default function CasePurchaseSuccess() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const caseId = searchParams.get('id')

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
        {/* Header com ícone e status - removido Badge */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <CardHeader className="relative pb-8 text-center">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-4 ring-primary/20">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Compra Realizada!</CardTitle>
            <CardDescription className="text-base mt-2">
              O caso foi adicionado à sua lista e você já pode começar a trabalhar nele
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-6 p-6">
          {/* Status do Pedido */}
          <Alert variant="default" className="bg-primary/5 border-primary/20">
            <AlertDescription>
              <h3 className="font-medium text-primary mb-4">Status do Pedido</h3>
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
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Suporte Disponível</p>
                    <p className="text-sm text-muted-foreground">
                      7 dias de garantia e suporte para dúvidas
                    </p>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          <Separator />

          {/* Dica de Economia */}
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <p className="font-medium">Dica de Economia</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Assine um plano e economize até 50% em suas próximas compras.
                Tenha acesso a benefícios exclusivos e preços especiais.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleNavigate('/lawyer/subscription')}
              >
                Conhecer Planos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-6 bg-muted/5 border-t">
          <Button
            size="lg"
            className="w-full"
            onClick={() => handleNavigate(`/lawyer/cases/${caseId}`)}
          >
            Ver Detalhes do Caso
            <FileSearch className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
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