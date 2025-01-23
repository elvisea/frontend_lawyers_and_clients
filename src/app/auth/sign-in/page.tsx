'use client'

import { FormEvent, useState, useTransition } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { Loader2 } from 'lucide-react'

import { State } from './types'
import { initialState } from './constants'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import gitHubIcon from '@/assets/github-icon.svg'

export default function SignInPage() {
  const [isPending] = useTransition()
  const [state] = useState<State>(initialState)

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("handleOnSubmit")
  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">

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

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot your password?
        </Link>
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

      <Separator />

      <Button type="submit" className="w-full" variant="outline">
        <Image src={gitHubIcon} alt="" className="mr-2 size-4 dark:invert" />
        Sign in with GitHub
      </Button>
    </form>
  )
}