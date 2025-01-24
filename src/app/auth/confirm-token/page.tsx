'use client'

import React, { FormEvent, useState, useTransition } from 'react'

import { Loader2 } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { initialState } from './constants'
import { Form, Keys, State } from './types'
import { handleValidateCode } from './actions/handle-validate-code'

export default function ConfirmTokenPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState<Form>({ token: '' });
  const [state, setState] = useState<State>(initialState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    if (email) {

      startTransition(async () => {
        const result = await handleValidateCode(data, email)

        setState(result)

        if (result.success) {
          router.push("/auth/sign-in")
        }
      })
    }
  }

  const getError = (field: keyof Keys) => state.errors?.[field] ? state.errors[field][0] : null

  return (
    <form onSubmit={handleOnSubmit} action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="code">Code</Label>
        <Input
          name="token"
          id="token"
          value={data.token}
          maxLength={6}
          minLength={6}
          onChange={handleInputChange}
        />

        {getError('token') && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {getError('token')}
          </p>
        )}
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
    </form>
  )
}
