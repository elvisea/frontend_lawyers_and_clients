import { useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/http/api'
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
      console.log('🔄 [Reset] Iniciando alteração de senha...')
      setIsLoading(true)
      setErrorCode(null)

      await api.post('password-reset', data)

      console.log('✅ [Reset] Senha alterada com sucesso!')

      // Limpa os parâmetros da URL antes de redirecionar
      router.replace('/auth/reset-password/success')

    } catch (error) {
      console.error('❌ [Reset] Erro ao alterar senha:', error)
      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      setTimeout(() => {
        setIsLoading(false)
        console.log('🏁 [Reset] Operação finalizada')
      }, 350)
    }
  }

  return {
    resetPassword,
    isLoading,
    errorCode
  }
} 