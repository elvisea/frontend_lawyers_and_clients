'use client'

import { useState, useTransition } from 'react'

import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ErrorMessage } from '@/components/ErrorMessage'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import { Form } from './types'
import { schema } from './constants'

export default function ForgotPasswordPage() {

  const [isPending, startTransition] = useTransition()
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver<Form>(schema) })

  const onSubmit = async ({ email }: Form) => {
    startTransition(async () => {
      try {
        console.log('irá realizar a chamada para:', { email })

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

      <Button disabled={isPending} className="w-full" type="submit">
        Recover password
      </Button>

      <Button disabled={isPending} className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/sign-in">Sign in instead</Link>
      </Button>

      {/* Temporario */}
      {errorCode && <ErrorMessage message={`Código: ${errorCode}`} className='text-center mt-2' />}
    </form>
  )
}