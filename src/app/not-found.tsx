'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function NotFound() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/10">
      <Card className="w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-transparent" />
          <CardHeader className="relative pb-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">Página não encontrada</CardTitle>
            <CardDescription className="text-base mt-2">
              Desculpe, a página que você está procurando não existe ou foi removida.
            </CardDescription>
          </CardHeader>
        </div>

        <CardContent className="space-y-4 pb-6">
          <div className="text-sm text-muted-foreground">
            <p>Algumas sugestões:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Verifique se o endereço foi digitado corretamente</li>
              <li>A página pode ter sido movida ou excluída</li>
              <li>Você pode voltar para a página anterior</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-6 border-t">
          <Button
            variant="default"
            size="lg"
            onClick={handleBack}
            className="min-w-[200px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 