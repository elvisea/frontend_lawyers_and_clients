'use client'

import { FormEvent, useState, useTransition } from 'react'

import { Loader2 } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'

import { Type } from '@/enums/type'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import gitHubIcon from '@/assets/github-icon.svg'

import { State } from './types'
import { initialState } from './constants'
import { createAccount } from './actions/create-account'

export default function SignUpPage() {
  const [state, setState] = useState<State>(initialState)
  const [isPending, startTransition] = useTransition()

  console.log(state);

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const response = await createAccount(data, Type.CLIENT)
      setState(response);
    })
  }

  return (
    <form onSubmit={handleOnSubmit} action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" />

        {state.errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />

        {state.errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        {state.errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="confirmation">Confirm your password</Label>
        <Input name="confirmation" type="password" id="confirmation" />

        {state.errors?.confirmation && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {state.errors.confirmation[0]}
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