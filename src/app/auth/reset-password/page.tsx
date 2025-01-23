'use client'

import { FormEvent } from 'react'

import Link from 'next/link'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ResetPasswordPage() {

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("handleOnSubmit")
  }

  return (
    <form onSubmit={handleOnSubmit} action="" className="space-y-4">

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
        Save new password
      </Button>

      <Button className="w-full" variant="link" size="sm" asChild>
        <Link href="/auth/sign-in">Sign in instead</Link>
      </Button>
    </form>
  )
}