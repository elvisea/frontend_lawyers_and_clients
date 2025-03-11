import { useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/http/api'

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
      console.log('🔄 [Recuperação de Senha] Iniciando solicitação...')
      setIsLoading(true)
      setErrorCode(null)

      await api.post('password-reset/request', data)

      console.log('✅ [Recuperação de Senha] Email enviado com sucesso!')

      // Redireciona para a página de confirmação
      router.push(`/auth/confirm-token?email=${encodeURIComponent(data.email)}`)

    } catch (error) {
      console.error('❌ [Recuperação de Senha] Erro ao solicitar recuperação:', error)
      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      setIsLoading(false)

      // Delay artificial para suavizar a transição de 350ms
      setTimeout(() => {
        setIsLoading(false)
        console.log('🏁 [Recuperação de Senha] Operação finalizada')
      }, 350)
    }
  }

  return {
    requestPasswordReset,
    isLoading,
    errorCode
  }
} 