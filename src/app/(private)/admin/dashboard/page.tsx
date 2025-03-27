'use client'

import api from "@/http/api"
import Logger from "@/utils/logger"
import { useEffect, useRef } from "react"

import { UsersResponse } from "./types"
import { AppError } from "@/errors/app-error"

export default function AdminDashboardPage() {
  const fetchedRef = useRef(false)

  useEffect(() => {
    Logger.info('Iniciando dashboard administrativo', {
      prefix: 'Admin'
    })

    if (fetchedRef.current) {
      Logger.info('Requisição já realizada - evitando duplicação', {
        prefix: 'Admin'
      })
      return
    }

    const fetchUsers = async () => {
      try {
        Logger.info('Iniciando requisição de usuários', {
          prefix: 'Admin',
          data: {
            endpoint: 'GET /users'
          }
        })

        const response = await api.get<UsersResponse>('/users')

        Logger.info('Requisição concluída com sucesso', {
          prefix: 'Admin',
          data: {
            status: response.status,
            meta: {
              page: response.data.meta.page,
              limit: response.data.meta.limit,
              totalItems: response.data.meta.total.items,
              totalPages: response.data.meta.total.pages
            }
          }
        })

        if (response.data.data.length > 0) {
          const firstUser = response.data.data[0]
          Logger.info('Primeiro usuário da lista', {
            prefix: 'Admin',
            data: {
              id: firstUser.id.substring(0, 8) + '...',
              name: firstUser.name,
              email: firstUser.email,
              type: firstUser.type,
              createdAt: firstUser.createdAt
            }
          })
        } else {
          Logger.info('Nenhum usuário encontrado', {
            prefix: 'Admin'
          })
        }
      } catch (error) {
        if (error instanceof AppError) {
          Logger.error('Falha na requisição de usuários', {
            prefix: 'Admin',
            error,
            data: {
              type: 'Erro de aplicação',
              errorCode: error.errorCode,
              statusCode: error.statusCode,
              message: error.message
            }
          })
        } else {
          Logger.error('Falha na requisição de usuários', {
            prefix: 'Admin',
            error,
            data: {
              type: 'Erro genérico',
              message: error
            }
          })
        }

        Logger.info('Tentando recarregar os dados', {
          prefix: 'Admin'
        })
      }
    }

    Logger.info('Buscando dados do servidor', {
      prefix: 'Admin'
    })

    fetchUsers().then(() => {
      Logger.info('Carregamento inicial concluído', {
        prefix: 'Admin'
      })
    })

    fetchedRef.current = true

    return () => {
      Logger.info('Resetando estado do componente', {
        prefix: 'Admin'
      })
      fetchedRef.current = false
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-xl font-semibold">ADMIN DASHBOARD</h1>
    </div>
  )
}