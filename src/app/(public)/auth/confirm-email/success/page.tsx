'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  CheckCircle2,
  ArrowRight,
  LogIn,
  Mail,
  UserCheck,
  Search
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

export default function SuccessfulAccountCreation() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading size="lg" />
  }

  const handleLogin = () => {
    router.replace('/auth/sign-in')
  }

  return (
    <Card className="w-full">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <CardHeader className="relative pb-8 text-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-4 ring-primary/20">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Conta Criada com Sucesso!</CardTitle>
          <CardDescription className="text-base mt-2">
            Sua conta foi criada e você já pode começar a usar a plataforma
          </CardDescription>
        </CardHeader>
      </div>

      <CardContent className="space-y-6 p-6">
        <Alert variant="default" className="bg-primary/5 border-primary/20">
          <AlertDescription>
            <h3 className="font-medium text-primary mb-4">Próximos Passos</h3>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Confirmação por E-mail</p>
                  <p className="text-sm text-muted-foreground">
                    Enviamos um e-mail de confirmação para validar seu cadastro
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <UserCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Complete seu Perfil</p>
                  <p className="text-sm text-muted-foreground">
                    Adicione suas informações para melhor experiência na plataforma
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Search className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Explore a Plataforma</p>
                  <p className="text-sm text-muted-foreground">
                    Encontre casos ou advogados de acordo com sua necessidade
                  </p>
                </div>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Alert variant="default" className="bg-muted/50">
          <AlertDescription className="text-sm">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              <span className="font-medium">Faça login para começar</span>
            </div>
            <p className="text-muted-foreground">
              Use seu email e senha cadastrados para acessar sua conta
            </p>
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 p-6 bg-muted/5 border-t">
        <Button
          size="lg"
          className="w-full"
          onClick={handleLogin}
        >
          Fazer Login
          <LogIn className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
} 