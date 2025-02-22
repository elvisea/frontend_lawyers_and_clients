'use client'

import { Info } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type SubscriptionPromoProps = {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
}

export function SubscriptionPromo({
  title = "Economize com Assinatura",
  description = "Assine nosso plano e tenha acesso a casos com até 50% de desconto",
  buttonText = "Ver Planos",
  buttonHref = "/lawyer/subscription"
}: SubscriptionPromoProps) {
  const router = useRouter()

  return (
    <Alert className="flex flex-col space-y-3 border-primary/20 bg-primary/5">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-primary" />
        <AlertTitle className="font-medium text-primary">{title}</AlertTitle>
      </div>

      <AlertDescription className="text-sm text-muted-foreground">
        {description}
      </AlertDescription>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => router.push(buttonHref)}
      >
        {buttonText}
      </Button>
    </Alert>
  )
} 