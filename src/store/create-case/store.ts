import { create } from 'zustand'

import api from '@/http/api'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

type CreateCaseData = {
  title: string
  description: string
  clientId: string
  price: number
}

type CreateCaseResponse = {
  id: string
  title: string
  description: string
  price: number
  clientId: string
}

type CreateCaseStore = {
  isLoading: boolean
  errorCode: ErrorCode | null
  createCase: (data: CreateCaseData) => Promise<CreateCaseResponse | null>
  reset: () => void
}

export const useCreateCaseStore = create<CreateCaseStore>((set) => ({
  isLoading: false,
  errorCode: null,

  createCase: async (data: CreateCaseData) => {
    try {
      console.log('🔄 [Caso] Iniciando criação de caso...')
      console.log('📝 [Caso] Dados:', {
        titulo: data.title,
        descricao: data.description,
        valor: Number(data.price.toFixed(2)),
        clienteId: data.clientId
      })

      set({ isLoading: true, errorCode: null })

      const response = await api.post<CreateCaseResponse>('/cases/internal', {
        ...data,
        price: Number(data.price.toFixed(2))
      })

      console.log('✅ [Caso] Caso criado com sucesso!')
      console.log('📊 [Caso] Dados:', response.data)

      return response.data

    } catch (error) {
      if (error instanceof AppError) {
        set({ errorCode: error.errorCode })
      } else {
        set({ errorCode: ErrorCode.UNKNOWN_ERROR })
      }
      return null

    } finally {
      await new Promise(resolve => setTimeout(resolve, 350))
      set({ isLoading: false })
    }
  },

  reset: () => {
    set({ isLoading: false, errorCode: null })
  }
})) 