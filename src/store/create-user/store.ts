import { create } from 'zustand'

import api from '@/http/api'
import { AppError } from '@/errors/app-error'

import { UserType } from '@/enums/type'
import { ErrorCode } from '@/enums/error-code'

import { CreateUserData, CreateUserResponse, CreateUserStore } from './types'

export const useCreateUserStore = create<CreateUserStore>((set) => ({
  isLoading: false,
  errorCode: null,

  createUser: async (type: UserType, data: CreateUserData) => {
    try {
      console.log('🔄 [Usuário] Iniciando criação de usuário...')
      console.log('📝 [Usuário] Dados:', {
        nome: data.name,
        email: data.email,
        tipo: type
      })

      set({ isLoading: true, errorCode: null })

      const response = await api.post<CreateUserResponse>('/users/internal', {
        ...data,
        type
      })

      console.log('✅ [Usuário] Usuário criado com sucesso!')

      console.log('📊 [Usuário] Dados:', {
        id: response.data.id,
        nome: response.data.name,
        email: response.data.email,
        tipo: response.data.type
      })

      // Redireciona após sucesso
      window.location.href = `/users/${response.data.id}/success`

    } catch (error) {
      if (error instanceof AppError) {
        set({ errorCode: error.errorCode })
      } else {
        set({ errorCode: ErrorCode.UNKNOWN_ERROR })
      }

    } finally {
      set({ isLoading: false })
    }
  },

  reset: () => {
    set({ isLoading: false, errorCode: null })
  }
})) 