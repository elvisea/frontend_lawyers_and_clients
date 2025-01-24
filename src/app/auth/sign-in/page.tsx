'use client'

import { useState, useTransition } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { Loader2 } from 'lucide-react'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Form } from './types'
import { schema } from './constants'

import gitHubIcon from '@/assets/github-icon.svg'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ErrorMessage } from '@/components/ErrorMessage'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

export default function SignInPage() {
  const [isPending, startTransition] = useTransition()
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver<Form>(schema) })

  const onSubmit = async ({ email, password }: Form) => {
    startTransition(async () => {
      try {
        console.log('irá realizar a chamada para:', { email, password })

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input {...register("email")} name="email" type="email" id="email" />

        {errors.email?.message && <ErrorMessage message={errors.email.message} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input {...register("password")} name="password" type="password" id="password" />

        {errors.password?.message && <ErrorMessage message={errors.password.message} />}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Sign in with e-mail'
        )}
      </Button>

      <Button className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Link
        href="/auth/forgot-password"
        className="text-xs font-medium text-foreground hover:underline text-center mt-8 sm:mt-6 md:mt-4 block"
      >
        Forgot your password?
      </Link>

      <Separator />

      <Button type="submit" className="w-full" variant="outline">
        <Image src={gitHubIcon} alt="GitHub" className="mr-2 size-4 dark:invert" />
        Sign in with GitHub
      </Button>

      {/* Temporario */}
      {errorCode && <ErrorMessage message={`Código: ${errorCode}`} className='text-center mt-2' />}
    </form>
  )
}
