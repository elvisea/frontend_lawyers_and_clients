'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import {
  InfoIcon,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  KeyRound
} from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { ErrorMessage } from '@/components/ErrorMessage'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Form } from './types'
import { schema } from './constants'
import { useConfirmEmailViewModel, useUpdateTokenModel } from './view-models'

export default function ConfirmTokenPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: yupResolver(schema),
  })

  const { isLoading, errorCode, submitToken } = useConfirmEmailViewModel(email)
  const { isLoading: isLoadingUpdate, errorCode: errorCodeUpdate, updateToken } = useUpdateTokenModel()

  useEffect(() => {
    if (!email) {
      router.replace('/auth/sign-up')
    }
  }, [email, router])

  const onSubmit = ({ token }: Form) => {
    submitToken(token)
  }

  if (!email) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl">Validação de e-mail</CardTitle>
            <CardDescription>
              Digite o código de 6 dígitos enviado para {email}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Enviamos um código de 6 dígitos para seu email.
            Use-o para confirmar sua identidade e redefinir sua senha.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="token">Código de verificação</Label>
            <Input
              {...register("token")}
              id="token"
              type="text"
              placeholder="000000"
              maxLength={6}
              className="text-center text-lg tracking-widest"
              autoComplete="one-time-code"
              autoFocus
            />
            {errors.token?.message && (
              <ErrorMessage message={errors.token.message} />
            )}
          </div>

          {errorCode && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Código inválido ou expirado. Verifique o código e tente novamente.
              </AlertDescription>
            </Alert>
          )}

          {errorCodeUpdate && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Não foi possível atualizar o token. Tente novamente.
              </AlertDescription>
            </Alert>
          )}

          <Alert variant="default" className="bg-muted/50">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Não recebeu o código?</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 space-y-1.5">
                <li>Verifique sua caixa de spam ou lixo eletrônico</li>
                <li>O código expira em 15 minutos</li>
                <li>Certifique-se de digitar o código mais recente</li>
                <li>Você pode solicitar um novo código abaixo</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : (
                'Verificar código'
              )}
            </Button>

            <Button
              variant="outline"
              type="button"
              className="w-full"
              disabled={isLoadingUpdate}
              onClick={() => updateToken(email)}
            >
              Solicitar novo código
              {isLoadingUpdate && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>

            <Button
              variant="link"
              asChild
              className="w-full"
            >
              <Link href="/auth/sign-in" className="flex items-center justify-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para login
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
