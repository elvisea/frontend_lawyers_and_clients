'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link'

import { Loader2, LogIn } from 'lucide-react'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Form } from './types'
import { schema } from './constants'

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

import { useAuth } from '@/contexts/auth-context'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

export default function SignInPage() {
  const [isPending, startTransition] = useTransition()
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver<Form>(schema)
  })

  const { login } = useAuth()

  const onSubmit = async ({ email, password }: Form) => {
    console.log('🔑 [Auth] Iniciando processo de login...')
    console.log('   ➔ Email:', email)

    startTransition(async () => {
      try {
        console.log('📡 [Auth] Validando credenciais...')
        await login({ email, password })

        console.log('✅ [Auth] Login bem-sucedido')
        console.log('⏩ [Auth] Redirecionando para área autenticada...')
      } catch (error) {
        console.error('🚨 [Auth] Falha no login:')

        if (error instanceof AppError) {
          console.error(`   ➔ Código: ${error.errorCode}`)
          console.error(`   ➔ Mensagem: ${error.message}`)
          console.error(`   ➔ Status HTTP: ${error.statusCode}`)
          setErrorCode(error.errorCode)
        } else {
          console.error('   ➔ Erro desconhecido:', error)
          setErrorCode(ErrorCode.UNKNOWN_ERROR)
        }

        console.log('📋 [Auth] Detalhes completos do erro:', error)
      }
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>
              Faça login para acessar sua conta
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                autoFocus
              />
              {errors.email?.message && (
                <ErrorMessage message={errors.email.message} />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {errors.password?.message && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>
          </div>

          {errorCode && (
            <Alert variant="destructive">
              <AlertDescription>
                Email ou senha incorretos. Verifique suas credenciais e tente novamente.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>

            <Button
              variant="outline"
              asChild
              className="w-full"
            >
              <Link href="/auth/sign-up">Criar nova conta</Link>
            </Button>

            <Button
              variant="link"
              asChild
              className="w-full"
            >
              <Link href="/auth/forgot-password">
                Esqueceu sua senha?
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
