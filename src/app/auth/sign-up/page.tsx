'use client'

import { FormEvent } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

import gitHubIcon from '@/assets/github-icon.svg'

export default function SignUpPage() {

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("handleOnSubmit")
  }

  return (
    <form onSubmit={handleOnSubmit} action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
        />
      </div>

      <Button className="w-full" type="submit">
        Create account
      </Button>

      <Button className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/sign-in">Already registered? Sign In</Link>
      </Button>

      <Separator />

      <Button type="submit" className="w-full" variant="outline">
        <Image src={gitHubIcon} alt="" className="mr-2 size-4 dark:invert" />
        Sign up with GitHub
      </Button>
    </form>
  )
}