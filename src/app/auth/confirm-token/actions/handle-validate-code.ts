
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import { State } from '../types'
import { schema } from '../constants'
import { validateToken } from '@/http/validate-token'

export async function handleValidateCode(data: FormData, email: string): Promise<State> {

  const result = schema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      errorCode: null,
    }
  }

  const { token } = result.data

  try {
    await validateToken({ token, email })

    return {
      success: true,
      message: null,
      errors: null,
      errorCode: null,
    }

  } catch (error) {

    if (error instanceof AppError && error.message) {
      return {
        success: false,
        errors: null,
        errorCode: error.errorCode,
        message: error.message,
      }
    }

    return {
      success: false,
      message: ErrorCode.UNKNOWN_ERROR,
      errors: null,
      errorCode: ErrorCode.UNKNOWN_ERROR,
    }
  }
}