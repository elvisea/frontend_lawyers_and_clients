'use client'

import React, { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import { Loader2 } from 'lucide-react'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ErrorMessage } from '@/components/ErrorMessage'

import { Form } from './types'
import { schema } from './constants'

import { useConfirmTokenViewModel } from './view-models'

export default function ConfirmTokenPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const { register, handleSubmit, formState: { errors } } = useForm<Form>({
    resolver: yupResolver(schema),
  })

  const { isPending, errorCode, submitToken } = useConfirmTokenViewModel(email)

  useEffect(() => {
    if (!email) {
      router.push("/auth/sign-up")
    }
  }, [email, router])

  const onSubmit = ({ token }: Form) => {
    submitToken(token)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="token">Code</Label>
        <Input {...register("token")} id="token" type="text" maxLength={6} />

        {errors.token?.message && <ErrorMessage message={errors.token.message} />}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Validate code'
        )}
      </Button>

      <Button className="w-full" variant="link" type="button" size="sm" disabled={isPending}>
        Send new code
      </Button>

      {/* Temporario */}
      {errorCode && <ErrorMessage message={`Código: ${errorCode}`} className='text-center mt-2' />}

    </form>
  )
}
