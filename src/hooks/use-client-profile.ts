import { useState, useEffect } from 'react'

import api from '@/http/api'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

interface ClientProfile {
  id: string
  cpf: string
  rg: string
  birthDate: string
  occupation: string
  address: {
    street: string
    number: string
    city: string
    state: string
    zipCode: string
    complement: string | null
    neighborhood: string
  }
  phone: string
  createdAt: string
  updatedAt: string
}

export const useClientProfile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<ClientProfile | null>(null)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      setErrorCode(null)

      const { data } = await api.get<ClientProfile>('/clients/profile')
      setProfile(data)

    } catch (error) {
      if (error instanceof AppError) {
        setErrorCode(error.errorCode)
      } else {
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }
    } finally {
      await new Promise(resolve => setTimeout(resolve, 350))
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profile,
    isLoading,
    errorCode,
    refetch: fetchProfile
  }
} 