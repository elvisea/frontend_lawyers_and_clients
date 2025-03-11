import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import api from '@/http/api'

export const useConfirmEmailViewModel = (email: string | null) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const submitToken = async (token: string) => {
    if (!email) return

    try {
      console.log('🔄 [Verificação] Iniciando verificação do token...')
      setIsLoading(true)
      setErrorCode(null)

      await api.post('email-verifications/validade-token', {
        email,
        token
      })

      console.log('✅ [Verificação] token verificado com sucesso!')

      // Redireciona para a página de redefinição de senha
      router.push('/auth/confirm-email/success')

    } catch (error) {
      console.error('❌ [Verificação] Erro ao verificar código:', error)
      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {

      // Delay artificial para suavizar a transição de 350ms
      setTimeout(() => {
        setIsLoading(false)
        console.log('🏁 [Verificação] Operação finalizada')
      }, 350)
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
      console.log('🔄 [Atualização] Iniciando atualização do token...')
      setIsLoading(true)
      setErrorCode(null)

      await api.put(`users/request-new-token/${email}`)

      console.log('✅ [Atualização] token atualizado com sucesso!')

    } catch (error) {
      console.error('❌ [Atualização] Erro ao atualizar token:', error)
      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {

      // Delay artificial para suavizar a transição de 350ms
      setTimeout(() => {
        setIsLoading(false)
        console.log('🏁 [Atualização] Operação finalizada')
      }, 350)
    }
  }

  return {
    isLoading,
    errorCode,
    updateToken
  }
}
