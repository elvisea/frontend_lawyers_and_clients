'use client'

import { FormEvent, useState, useTransition } from 'react'
import { Loader2 } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Type } from '@/enums/type'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import gitHubIcon from '@/assets/github-icon.svg'

import { Form, Keys, State } from './types'
import { initialForm, initialState } from './constants'
import { createAccount } from './actions/create-account'

export default function SignUpPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState<Form>(initialForm);

  const [state, setState] = useState<State>(initialState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const result = await createAccount(formData, Type.CLIENT)

      setState(result)

      if (result.success) {
        router.push(`/auth/confirm-token?email=${data.email}`)
      }
    })
  }

  const getError = (field: keyof Keys) => state.errors?.[field] ? state.errors[field][0] : null

  return (
    <form onSubmit={handleOnSubmit} action="" className="space-y-4">

      {/* Nome */}
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          id="name"
          value={data.name}
          onChange={handleInputChange}
        />

        {getError('name') && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {getError('name')}
          </p>
        )}
      </div>

      {/* E-mail */}
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          name="email"
          type="email"
          id="email"
          value={data.email}
          onChange={handleInputChange}
        />

        {getError('email') && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {getError('email')}
          </p>
        )}
      </div>

      {/* Senha */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          type="password"
          id="password"
          value={data.password}
          onChange={handleInputChange}
        />

        {getError('password') && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {getError('password')}
          </p>
        )}
      </div>

      {/* Confirmação de Senha */}
      <div className="space-y-1">
        <Label htmlFor="confirmation">Confirm your password</Label>
        <Input name="confirmation" type="password" id="confirmation" value={data.confirmation} onChange={handleInputChange} />

        {getError('confirmation') && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {getError('confirmation')}
          </p>
        )}
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
    </form>
  )
}
