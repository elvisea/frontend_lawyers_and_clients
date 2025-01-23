import { Type } from '@/enums/type'
import { signUp } from '@/http/sign-up'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import { State } from '../types'
import { schema } from '../constants'

export async function createAccount(data: FormData, type: Type): Promise<State> {

  const result = schema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
      errorCode: null,
      response: null
    }
  }

  try {
    const response = await signUp({ ...result.data, type })
    return {
      success: true,
      message: null,
      errors: null,
      errorCode: null,
      response
    }

  } catch (error) {

    if (error instanceof AppError && error.message) {
      return {
        success: false,
        errors: null,
        errorCode: error.errorCode,
        message: error.message,
        response: null
      }
    }

    return {
      success: false,
      message: ErrorCode.UNKNOWN_ERROR,
      errors: null,
      errorCode: ErrorCode.UNKNOWN_ERROR,
      response: null
    }
  }
}