'use client'

import { useEffect } from 'react'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  InfoIcon,
  AlertTriangle,
  ArrowLeft,
  Loader2,
  Lock,
} from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Alert, AlertDescription } from '@/components/ui/alert'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Form, schema } from './constants'
import { useResetPassword } from './hooks/use-reset-password'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const code = searchParams.get('code')

  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: yupResolver(schema)
  })

  const { resetPassword, isLoading, errorCode } = useResetPassword()

  useEffect(() => {
    if (!email || !code) {
      router.replace('/auth/forgot-password')
    }
  }, [email, code, router])

  const onSubmit = async ({ password }: Form) => {
    if (!email || !code) return

    await resetPassword({
      email,
      code,
      newPassword: password
    })
  }

  if (!email || !code) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl">Nova senha</CardTitle>
            <CardDescription>
              Crie uma nova senha segura para sua conta
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Sua senha deve ter entre 8 e 30 caracteres e conter pelo menos:
            <ul className="mt-2 space-y-1">
              <li>Uma letra maiúscula</li>
              <li>Uma letra minúscula</li>
              <li>Um número</li>
              <li>Um caractere especial (@$!%*?&)</li>
            </ul>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="••••••••"
                autoComplete="new-password"
                autoFocus
              />
              {errors.password?.message && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmation">Confirme a nova senha</Label>
              <Input
                {...register("confirmation")}
                type="password"
                id="confirmation"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              {errors.confirmation?.message && (
                <ErrorMessage message={errors.confirmation.message} />
              )}
            </div>
          </div>

          {errorCode && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Não foi possível alterar sua senha. Tente novamente.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Alterando senha...
                </>
              ) : (
                'Salvar nova senha'
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