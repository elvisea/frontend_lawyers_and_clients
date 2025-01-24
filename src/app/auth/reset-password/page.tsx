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

export default function ResetPasswordPage() {

  const [isPending, startTransition] = useTransition()
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver<Form>(schema) })

  const onSubmit = async ({ password, confirmation }: Form) => {
    startTransition(async () => {
      try {
        console.log('irá realizar a chamada para:', { password, confirmation })

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
        <Label htmlFor="password">Password</Label>
        <Input {...register("password")} type="password" id="password" />

        {errors.password?.message && <ErrorMessage message={errors.password.message} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmation">Confirm your password</Label>
        <Input  {...register("confirmation")} type="password" id="confirmation" />

        {errors.confirmation?.message && <ErrorMessage message={errors.confirmation.message} />}
      </div>

      <Button disabled={isPending} className="w-full" type="submit">
        Save new password
      </Button>

      <Button disabled={isPending} className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/sign-in">Sign in instead</Link>
      </Button>

      {/* Temporario */}
      {errorCode && <ErrorMessage message={`Código: ${errorCode}`} className='text-center mt-2' />}
    </form>
  )
}