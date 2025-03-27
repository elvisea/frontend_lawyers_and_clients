import { useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/http/api'
import Logger from '@/utils/logger'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

interface ResetPasswordData {
  email: string
  code: string
  newPassword: string
}

export const useResetPassword = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const resetPassword = async (data: ResetPasswordData) => {
    try {
      Logger.info('Iniciando alteração de senha', {
        prefix: 'Reset',
        data: { email: data.email }
      })

      setIsLoading(true)
      setErrorCode(null)

      await api.post('password-reset', data)

      Logger.info('Senha alterada com sucesso', {
        prefix: 'Reset',
        data: { email: data.email }
      })

      // Limpa os parâmetros da URL antes de redirecionar
      router.replace('/auth/reset-password/success')

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao alterar senha', {
          prefix: 'Reset',
          error,
          data: { 
            email: data.email,
            errorCode: error.errorCode 
          }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao alterar senha', {
          prefix: 'Reset',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de reset finalizada', {
        prefix: 'Reset'
      })
      
      setIsLoading(false)
    }
  }

  return {
    resetPassword,
    isLoading,
    errorCode
  }
} 