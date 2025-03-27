import { useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/http/api'
import Logger from '@/utils/logger'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

interface ForgotPasswordData {
  email: string
}

/**
 * Hook para gerenciar a recuperação de senha
 */
export const useForgotPassword = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const requestPasswordReset = async (data: ForgotPasswordData) => {
    try {
      Logger.info('Iniciando solicitação de recuperação de senha', {
        prefix: 'Reset',
        data: { email: data.email }
      })

      setIsLoading(true)
      setErrorCode(null)

      await api.post('password-reset/request', data)

      Logger.info('Email de recuperação enviado com sucesso', {
        prefix: 'Reset',
        data: { email: data.email }
      })

      const redirectUrl = `/auth/confirm-token?email=${encodeURIComponent(data.email)}`
            
      router.push(redirectUrl)

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao solicitar recuperação de senha', {
          prefix: 'Reset',
          error,
          data: { 
            email: data.email,
            errorCode: error.errorCode 
          }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao solicitar recuperação de senha', {
          prefix: 'Reset',
          error,
          data: { email: data.email }
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de recuperação de senha finalizada', {
        prefix: 'Reset'
      })
      
      setIsLoading(false)
    }
  }

  return {
    requestPasswordReset,
    isLoading,
    errorCode
  }
} 