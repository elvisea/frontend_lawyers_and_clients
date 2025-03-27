import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import api from '@/http/api'
import Logger from '@/utils/logger'

export const useConfirmEmailViewModel = (email: string | null) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const submitToken = async (token: string) => {
    if (!email) return

    try {
      Logger.info('Iniciando verificação do token', {
        prefix: 'Verificação',
        data: { email }
      })

      setIsLoading(true)
      setErrorCode(null)

      await api.post('email-verifications/validade-token', {
        email,
        token
      })

      Logger.info('Token verificado com sucesso', {
        prefix: 'Verificação',
        data: { email }
      })

      router.push('/auth/confirm-email/success')

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao verificar token', {
          prefix: 'Verificação',
          error,
          data: { 
            email,
            errorCode: error.errorCode 
          }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao verificar token', {
          prefix: 'Verificação',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de verificação finalizada', {
        prefix: 'Verificação'
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

export const useUpdateTokenModel = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const updateToken = async (email: string | null) => {
    if (!email) return

    try {
      Logger.info('Iniciando atualização do token', {
        prefix: 'Atualização',
        data: { email }
      })

      setIsLoading(true)
      setErrorCode(null)

      await api.put(`users/request-new-token/${email}`)

      Logger.info('Token atualizado com sucesso', {
        prefix: 'Atualização',
        data: { email }
      })

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao atualizar token', {
          prefix: 'Atualização',
          error,
          data: { 
            email,
            errorCode: error.errorCode 
          }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao atualizar token', {
          prefix: 'Atualização',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de atualização finalizada', {
        prefix: 'Atualização'
      })
      
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    errorCode,
    updateToken
  }
}
