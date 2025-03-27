import { useState, useEffect } from 'react'

import api from '@/http/api'
import Logger from '@/utils/logger'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'
import { UsersResponse } from '@/app/(private)/(staff)/dashboard/types'
import { UserType } from '@/enums/type'

interface GetUsersParams {
  type?: UserType
  page?: number
  limit?: number
}

export const useGetUsers = (params?: GetUsersParams) => {
  const [data, setData] = useState<UsersResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const fetchUsers = async (searchParams?: GetUsersParams) => {
    try {
      Logger.info('Iniciando busca de usuários', {
        prefix: 'Users',
        data: {
          tipo: searchParams?.type || 'todos',
          pagina: searchParams?.page || 1,
          limite: searchParams?.limit || 'padrão'
        }
      })

      setIsLoading(true)
      setErrorCode(null)

      const queryParams = new URLSearchParams()
      if (searchParams?.type) queryParams.append('type', searchParams.type)
      if (searchParams?.page) queryParams.append('page', String(searchParams.page))
      if (searchParams?.limit) queryParams.append('limit', String(searchParams.limit))

      const url = `/users?${queryParams.toString()}`
      
      Logger.info('Realizando requisição', {
        prefix: 'Users',
        data: { url }
      })

      const response = await api.get<UsersResponse>(url)

      Logger.info('Usuários carregados com sucesso', {
        prefix: 'Users',
        data: {
          total: response.data.meta.total.items,
          paginas: response.data.meta.total.pages,
          paginaAtual: response.data.meta.page,
          quantidade: response.data.data.length,
          primeirosUsuarios: response.data.data.slice(0, 3).map(user => ({
            id: user.id.substring(0, 8),
            nome: user.name,
            tipo: user.type,
            criado: new Date(user.createdAt).toISOString()
          }))
        }
      })

      setData(response.data)

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao buscar usuários', {
          prefix: 'Users',
          error,
          data: { 
            errorCode: error.errorCode,
            params: searchParams 
          }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao buscar usuários', {
          prefix: 'Users',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de busca finalizada', {
        prefix: 'Users'
      })
      
      setIsLoading(false)
    }
  }

  useEffect(() => {
    Logger.info('Detectada mudança nos parâmetros de busca', {
      prefix: 'Users',
      data: {
        tipo: params?.type || 'todos',
        pagina: params?.page || 1,
        limite: params?.limit || 'padrão'
      }
    })
    fetchUsers(params)
  }, [params?.page, params?.type, params?.limit])

  return {
    data,
    isLoading,
    errorCode,
    refetch: fetchUsers
  }
} 