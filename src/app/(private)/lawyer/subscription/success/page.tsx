'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

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
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Assinatura Confirmada!</CardTitle>
          <CardDescription>
            Seu plano já está ativo e você pode começar a usar agora mesmo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Você receberá um e-mail com os detalhes da sua assinatura
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => handleNavigate('/lawyer/cases')}
          >
            Ver Casos Disponíveis
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleNavigate('/lawyer/dashboard')}
          >
            Ir para Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 