'use client'

import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type PaymentAlertProps = {
  title?: string
  description?: string
}

export function PaymentAlert({
  title = "Importante",
  description = "Após realizar o pagamento, você receberá a confirmação por e-mail. O processo pode levar alguns minutos."
}: PaymentAlertProps) {
  return (
    <Alert className="flex flex-col space-y-3">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="font-medium">{title}</AlertTitle>
      </div>
      <AlertDescription className="text-sm">
        {description}
      </AlertDescription>
    </Alert>
  )
} 