'use client'

import api from "@/http/api"
import { useEffect, useRef } from "react"

import { UsersResponse } from "./types"
import { AppError } from "@/errors/app-error"

export default function AdminDashboardPage() {
  const fetchedRef = useRef(false)

  useEffect(() => {
    console.log('🏁 [Admin] Iniciando dashboard administrativo')

    if (fetchedRef.current) {
      console.log('⏩ [Admin] Requisição já realizada - evitando duplicação')
      return
    }

    const fetchUsers = async () => {
      try {
        console.log('📡 [Admin] Iniciando requisição de usuários')
        console.log('   ➔ Endpoint: GET /users')

        const response = await api.get<UsersResponse>('/users')

        console.log('✅ [Admin] Requisição concluída com sucesso')
        console.log(`   ➔ Status: ${response.status}`)
        console.log('📊 [Admin] Metadados da resposta:')
        console.log('   ➔ Página atual:', response.data.meta.page)
        console.log('   ➔ Itens por página:', response.data.meta.limit)
        console.log('   ➔ Total de itens:', response.data.meta.total.items)
        console.log('   ➔ Total de páginas:', response.data.meta.total.pages)

        if (response.data.data.length > 0) {
          console.log('👥 [Admin] Primeiro usuário da lista:')
          const firstUser = response.data.data[0]
          console.log('   ➔ ID:', firstUser.id.substring(0, 8) + '...')
          console.log('   ➔ Nome:', firstUser.name)
          console.log('   ➔ Email:', firstUser.email)
          console.log('   ➔ Tipo:', firstUser.type)
          console.log('   ➔ Criado em:', firstUser.createdAt)
        } else {
          console.log('📭 [Admin] Nenhum usuário encontrado')
        }
      } catch (error) {
        console.error('🚨 [Admin] Falha na requisição de usuários:')

        if (error instanceof AppError) {
          console.error('   ➔ Tipo: Erro de aplicação')
          console.error(`   ➔ Código: ${error.errorCode}`)
          console.error(`   ➔ Status HTTP: ${error.statusCode}`)
          console.error(`   ➔ Mensagem: ${error.message}`)
        } else {
          console.error('   ➔ Tipo: Erro genérico')
          console.error(`   ➔ Mensagem: ${error}`)
        }

        console.log('📋 [Admin] Detalhes completos do erro:', error)
        console.log('⏳ [Admin] Tentando recarregar os dados...')
      }
    }

    console.log('🔍 [Admin] Buscando dados do servidor...')
    fetchUsers().then(() => {
      console.log('🏁 [Admin] Carregamento inicial concluído')
    })

    fetchedRef.current = true

    return () => {
      console.log('🧹 [Admin] Resetando estado do componente')
      fetchedRef.current = false
    }
  }, [])

  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-xl font-semibold">ADMIN DASHBOARD</h1>
    </div>
  )
}