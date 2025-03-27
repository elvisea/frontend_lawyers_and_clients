import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import api from '@/http/api'
import Logger from '@/utils/logger'

export const useConfirmTokenViewModel = (email: string | null) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const submitToken = async (code: string) => {
    if (!email) return

    try {
      Logger.info('Iniciando verificação do código de recuperação', {
        prefix: 'Recuperação',
        data: { email }
      })

      setIsLoading(true)
      setErrorCode(null)

      await api.post('password-reset/verify', {
        email,
        code
      })

      Logger.info('Código verificado com sucesso', {
        prefix: 'Recuperação',
        data: { email }
      })

      // Redireciona para a página de redefinição de senha
      const redirectUrl = `/auth/reset-password?email=${encodeURIComponent(email)}&code=${code}`
      
      Logger.info('Redirecionando para redefinição de senha', {
        prefix: 'Recuperação',
        data: { 
          email,
          redirectUrl: '/auth/reset-password'
        }
      })

      router.push(redirectUrl)

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao verificar código', {
          prefix: 'Recuperação',
          error,
          data: { 
            email,
            errorCode: error.errorCode 
          }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao verificar código', {
          prefix: 'Recuperação',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de verificação finalizada', {
        prefix: 'Recuperação'
      })
      
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    errorCode,
    submitToken
  }
}
