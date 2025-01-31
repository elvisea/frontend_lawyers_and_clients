
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { validateToken } from '../models'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

export const useConfirmTokenViewModel = (email: string | null) => {
  const router = useRouter()

  const [isPending, setIsPending] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const submitToken = async (token: string) => {
    if (!email) {
      return router.push("/auth/sign-up")
    }

    setIsPending(true)
    setErrorCode(null)

    try {
      const response = await validateToken(token, email)

      if (response.status === 204) {
        router.push("/auth/sign-in")
      }
    } catch (error) {
      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
    } finally {
      setIsPending(false)
    }
  }

  return { isPending, errorCode, submitToken }
}
