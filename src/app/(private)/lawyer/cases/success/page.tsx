'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Compra Realizada!</CardTitle>
          <CardDescription>
            O caso foi adicionado à sua lista e você já pode começar a trabalhar nele
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Você receberá um e-mail com os detalhes da sua compra
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => handleNavigate(`/lawyer/cases/${caseId}`)}
          >
            Ver Detalhes do Caso
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleNavigate('/lawyer/cases')}
          >
            Ver Outros Casos
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 