import { useState, useEffect } from 'react'
import api from '@/http/api'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

interface LawyerProfile {
  id: string
  phone: string
  address: {
    street: string
    number: string
    city: string
    state: string
    zipCode: string
    complement: string | null
    neighborhood: string
  }
  oab: {
    number: string
    state: string
  }
  specialties: string[]
  description: string
  yearsOfExp: number
  education: string
  certificates: string[]
  createdAt: string
  updatedAt: string
}

export const useLawyerProfile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<LawyerProfile | null>(null)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      setErrorCode(null)

      const { data } = await api.get<LawyerProfile>('/lawyers/profile')
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