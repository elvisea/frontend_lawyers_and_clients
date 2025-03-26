import { create } from 'zustand'

import api from '@/http/api'
import { AppError } from '@/errors/app-error'
import Logger from '@/utils/logger'

import { UserType } from '@/enums/type'
import { ErrorCode } from '@/enums/error-code'

import { CreateUserData, CreateUserResponse, CreateUserStore } from './types'

export const useCreateUserStore = create<CreateUserStore>((set) => ({
  isLoading: false,
  errorCode: null,

  createUser: async (type: UserType, data: CreateUserData) => {
    try {
      Logger.info('Iniciando criação de usuário', { prefix: 'User' })
      Logger.info(`Criando usuário do tipo ${type}`, {
        prefix: 'User',
        sensitive: true
      })

      set({ isLoading: true, errorCode: null })

      const response = await api.post<CreateUserResponse>('/users/internal', {
        ...data,
        type
      })

      Logger.info('Usuário criado com sucesso', { prefix: 'User' })
      Logger.info(`Usuário criado - ID: ${response.data.id}`, {
        prefix: 'User',
        sensitive: true
      })

      // Redireciona após sucesso
      window.location.href = `/users/${response.data.id}/success`

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error(`Erro ao criar usuário: ${error.message}`, { prefix: 'User' })
        set({ errorCode: error.errorCode })
      } else {
        Logger.error('Erro desconhecido ao criar usuário', { prefix: 'User' })
        set({ errorCode: ErrorCode.UNKNOWN_ERROR })
      }

    } finally {
      set({ isLoading: false })
    }
  },

  reset: () => {
    Logger.info('Resetando estado do usuário', { prefix: 'User' })
    set({ isLoading: false, errorCode: null })
  }
})) 