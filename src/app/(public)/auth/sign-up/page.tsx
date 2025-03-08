'use client'

import { useState, useTransition } from 'react'
import { Loader2, UserPlus, Scale, User } from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Alert, AlertDescription } from '@/components/ui/alert'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { UserType } from '@/enums/type'
import { signUp } from '@/http/auth'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import { Form } from './types'
import { schema } from './constants'

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignUpPage() {
  const router = useRouter()

  const [userType, setUserType] = useState<UserType | null>(null)
  const [isPending, startTransition] = useTransition()
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver<Form>(schema)
  })

  const onSubmit = async ({ email, name, password }: Form) => {
    if (!userType) return

    startTransition(async () => {
      try {
        await signUp({ email, name, password, type: userType })
        router.push(`/auth/confirm-email?email=${email}`)
      } catch (error) {
        if (error instanceof AppError) {
          setErrorCode(error.errorCode)
        } else {
          setErrorCode(ErrorCode.UNKNOWN_ERROR)
        }
      }
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl">Criar nova conta</CardTitle>
            <CardDescription>
              Escolha seu perfil e comece a usar a plataforma
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Você é advogado?</Label>
              <RadioGroup
                value={userType || ''}
                onValueChange={(value) => setUserType(value as UserType)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="h-full">
                  <RadioGroupItem
                    value={UserType.CLIENT}
                    id="client"
                    className="peer hidden"
                  />
                  <Label
                    htmlFor="client"
                    className="flex h-full flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <User className="mb-2 h-6 w-6" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium leading-none">Não</p>
                      <p className="text-sm text-muted-foreground sm:min-h-[40px] flex items-center justify-center">
                        Preciso de ajuda jurídica
                      </p>
                    </div>
                  </Label>
                </div>

                <div className="h-full">
                  <RadioGroupItem
                    value={UserType.LAWYER}
                    id="lawyer"
                    className="peer hidden"
                  />
                  <Label
                    htmlFor="lawyer"
                    className="flex h-full flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Scale className="mb-2 h-6 w-6" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium leading-none">Sim</p>
                      <p className="text-sm text-muted-foreground sm:min-h-[40px] flex items-center justify-center">
                        Sou advogado(a)
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Digite seu nome"
                autoComplete="name"
                disabled={!userType}
              />
              {errors.name?.message && (
                <ErrorMessage message={errors.name.message} />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                disabled={!userType}
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
                autoComplete="new-password"
                disabled={!userType}
              />
              {errors.password?.message && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmation">Confirme sua senha</Label>
              <Input
                {...register("confirmation")}
                id="confirmation"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                disabled={!userType}
              />
              {errors.confirmation?.message && (
                <ErrorMessage message={errors.confirmation.message} />
              )}
            </div>
          </div>

          {errorCode && (
            <Alert variant="destructive">
              <AlertDescription>
                Não foi possível criar sua conta. Verifique os dados e tente novamente.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button
              disabled={isPending || !userType}
              type="submit"
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar conta'
              )}
            </Button>

            <Button
              variant="outline"
              asChild
              className="w-full"
            >
              <Link href="/auth/sign-in">
                Já tem uma conta? Faça login
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
