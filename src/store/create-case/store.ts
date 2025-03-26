import { create } from 'zustand'

import api from '@/http/api'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'
import Logger from '@/utils/logger'

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
      Logger.info('Iniciando criação de caso', { prefix: 'Case' })
      Logger.info(`Dados do caso - Título: ${data.title}, Descrição: ${data.description}, Valor: ${Number(data.price.toFixed(2))}, Cliente ID: ${data.clientId}`, {
        prefix: 'Case',
        sensitive: true
      })

      set({ isLoading: true, errorCode: null })

      const response = await api.post<CreateCaseResponse>('/cases/internal', {
        ...data,
        price: Number(data.price.toFixed(2))
      })

      Logger.info('Caso criado com sucesso', { prefix: 'Case' })
      Logger.info(`Detalhes do caso criado - ID: ${response.data.id}, Título: ${response.data.title}, Valor: ${response.data.price}`, {
        prefix: 'Case',
        sensitive: true
      })

      return response.data

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error(`Erro ao criar caso: ${error.message}`, { prefix: 'Case' })
        set({ errorCode: error.errorCode })
      } else {
        Logger.error('Erro desconhecido ao criar caso', { prefix: 'Case' })
        set({ errorCode: ErrorCode.UNKNOWN_ERROR })
      }
      return null

    } finally {
      await new Promise(resolve => setTimeout(resolve, 350))
      set({ isLoading: false })
    }
  },

  reset: () => {
    Logger.info('Resetando estado do caso', { prefix: 'Case' })
    set({ isLoading: false, errorCode: null })
  }
})) 