'use client'

import { useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { UserType } from '@/enums/type'
import { signUp } from '@/http/auth'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ErrorMessage } from '@/components/ErrorMessage'

import gitHubIcon from '@/assets/github-icon.svg'

import { Form } from './types'
import { schema } from './constants'

export default function SignUpPage() {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver<Form>(schema) })

  const onSubmit = async ({ email, name, password }: Form) => {
    startTransition(async () => {
      const type = UserType.CLIENT

      try {
        await signUp({ email, name, password, type })
        router.push(`/auth/confirm-token?email=${email}`)

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
        <Label htmlFor="name">Name</Label>
        <Input {...register("name")} id="name" type="text" />

        {errors.name?.message && <ErrorMessage message={errors.name.message} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input {...register("email")} type="email" id="email" />

        {errors.email?.message && <ErrorMessage message={errors.email.message} />}
      </div>

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

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Create account'
        )}
      </Button>

      <Button className="w-full" variant="link" size="sm" asChild disabled={isPending}>
        <Link href="/auth/sign-in">Already registered? Sign In</Link>
      </Button>

      <Separator />

      <Button type="submit" className="w-full" variant="outline" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            <Image src={gitHubIcon} alt="" className="mr-2 size-4 dark:invert" />
            Sign up with GitHub
          </>
        )}
      </Button>

      {/* Temporario */}
      {errorCode && <ErrorMessage message={`Código: ${errorCode}`} className='text-center mt-2' />}

    </form>
  )
}
