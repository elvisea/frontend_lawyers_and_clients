import { AppError } from '@/errors/app-error'
import { validateToken as validateTokenApi } from '@/http/validate-token'

interface ValidateTokenResponse {
  status: number;
}

export const validateToken = async (token: string, email: string): Promise<ValidateTokenResponse> => {
  try {
    const response = await validateTokenApi({ token, email })
    return response
  } catch (error) {
    if (error instanceof AppError) {
      throw new AppError(error.errorCode, error.statusCode, error.error, error.message)
    }
    throw error
  }
}
