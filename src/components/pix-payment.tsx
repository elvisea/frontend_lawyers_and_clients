'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { Loading } from '@/components/loading'
import { PaymentAlert } from '@/components/payment-alert'
import Logger from '@/utils/logger'

type Pix = {
  image: string
  code: string
}

type PixPaymentProps = {
  isLoading: boolean
  pix: Pix | null
  onRetry: () => void
}

export function PixPayment({ isLoading, pix, onRetry }: PixPaymentProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyPixCode = async () => {
    if (!pix?.code) return

    try {
      await navigator.clipboard.writeText(pix.code)
      setCopySuccess(true)
      
      Logger.info('Código PIX copiado com sucesso', {
        prefix: 'Pagamento',
        data: { 
          pixId: pix.code.substring(0, 8) // Apenas os primeiros 8 caracteres para segurança
        }
      })
      
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      Logger.error('Erro ao copiar código PIX', {
        prefix: 'Pagamento',
        error,
        data: { 
          pixId: pix.code.substring(0, 8) // Apenas os primeiros 8 caracteres para segurança
        }
      })
    }
  }

  return (
    <Card className="min-h-[400px]">
      <CardHeader>
        <CardTitle>Pagamento via PIX</CardTitle>
        <CardDescription>
          Escaneie o QR Code ou copie o código para pagar
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loading />
          </div>
        ) : pix ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Escaneie o QR Code abaixo com o seu aplicativo de pagamento
              </p>
              <div className="border rounded-lg p-4 bg-white">
                <Image
                  src={pix.image}
                  alt="QR Code PIX"
                  width={192}
                  height={192}
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Ou copie o código PIX:</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-muted rounded-lg text-xs font-mono break-all">
                  {pix.code}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyPixCode}
                  className={copySuccess ? 'text-green-500' : ''}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copySuccess && (
                <p className="text-xs text-green-500">Código copiado!</p>
              )}
            </div>

            <PaymentAlert />
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Não foi possível gerar o QR Code.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="mt-4"
              >
                Tentar novamente
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 