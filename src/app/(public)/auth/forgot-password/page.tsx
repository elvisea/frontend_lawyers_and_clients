'use client'

import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import {
  InfoIcon,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  Mail
} from 'lucide-react'

import { ErrorMessage } from '@/components/ErrorMessage'
import { useForgotPassword } from '@/hooks/use-forgot-password'

import { Form, schema } from './constants'

export default function ForgotPasswordPage() {

  const { requestPasswordReset, isLoading, errorCode } = useForgotPassword()

  const form = useForm<Form>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async ({ email }: Form) => {
    await requestPasswordReset({ email })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl">Esqueceu sua senha?</CardTitle>
            <CardDescription>
              Digite seu email para receber um código de recuperação
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Enviaremos um código de recuperação para seu email.
            O código expira em 15 minutos por questões de segurança.
          </AlertDescription>
        </Alert>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email cadastrado</Label>
            <Input
              {...form.register("email")}
              id="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              autoFocus
            />
            {form.formState.errors.email?.message && (
              <ErrorMessage message={form.formState.errors.email.message} />
            )}
          </div>

          {errorCode && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Não foi possível enviar o código de recuperação. Verifique o endereço e tente novamente.
              </AlertDescription>
            </Alert>
          )}

          <Alert variant="default" className="bg-muted/50">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Dicas importantes</AlertTitle>
            <AlertDescription>
              <ul className="list-disc  mt-2 space-y-1.5">
                <li>Verifique sua caixa de spam ou lixo eletrônico</li>
                <li>Aguarde alguns minutos caso o email não chegue imediatamente</li>
                <li>Certifique-se de que o email informado está correto</li>
                <li>Adicione nosso endereço à sua lista de contatos para evitar filtros de spam</li>
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
                  Enviando...
                </>
              ) : (
                'Enviar'
              )}
            </Button>

            <Button
              variant="outline"
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