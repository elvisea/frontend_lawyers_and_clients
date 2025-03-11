import { useState, useEffect } from 'react'

import api from '@/http/api'
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
      console.log('🔄 [Users] Iniciando busca de usuários...')
      console.log('📝 [Users] Parâmetros:', {
        tipo: searchParams?.type || 'todos',
        página: searchParams?.page || 1,
        limite: searchParams?.limit || 'padrão'
      })

      setIsLoading(true)
      setErrorCode(null)

      const queryParams = new URLSearchParams()
      if (searchParams?.type) queryParams.append('type', searchParams.type)
      if (searchParams?.page) queryParams.append('page', String(searchParams.page))
      if (searchParams?.limit) queryParams.append('limit', String(searchParams.limit))

      const url = `/users?${queryParams.toString()}`
      console.log(`🔍 [Users] URL da requisição: ${url}`)

      const response = await api.get<UsersResponse>(url)

      console.log('✅ [Users] Usuários carregados com sucesso!')
      console.log('📊 [Users] Resumo dos dados:', {
        total: response.data.meta.total.items,
        páginas: response.data.meta.total.pages,
        páginaAtual: response.data.meta.page,
        usuáriosNaPágina: response.data.data.length
      })

      // Log detalhado dos usuários (limitado a 3 para não poluir o console)
      console.log('👥 [Users] Primeiros usuários da página:', response.data.data.slice(0, 3).map(user => ({
        id: user.id,
        nome: user.name,
        tipo: user.type,
        criado: new Date(user.createdAt).toLocaleString()
      })))

      setData(response.data)

    } catch (error) {
      if (error instanceof AppError) {
        console.error(`❌ [Users] Erro ao buscar usuários: Código ${error.errorCode}`, error)
        setErrorCode(error.errorCode)
      } else {
        console.error('❌ [Users] Erro desconhecido ao buscar usuários:', error)
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      console.log('🏁 [Users] Operação de busca finalizada')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('👀 [Users] Detectada mudança nos parâmetros:', {
      tipo: params?.type || 'todos',
      página: params?.page || 1,
      limite: params?.limit || 'padrão'
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