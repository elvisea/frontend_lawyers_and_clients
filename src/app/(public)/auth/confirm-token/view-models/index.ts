import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import api from '@/http/api'

export const useConfirmTokenViewModel = (email: string | null) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const submitToken = async (code: string) => {
    if (!email) return

    try {
      console.log('🔄 [Verificação] Iniciando verificação do código...')
      setIsLoading(true)
      setErrorCode(null)

      await api.post('password-reset/verify', {
        email,
        code
      })

      console.log('✅ [Verificação] Código verificado com sucesso!')

      // Redireciona para a página de redefinição de senha
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}&code=${code}`)

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
