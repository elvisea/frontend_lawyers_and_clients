'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/http/api'
import Logger from '@/utils/logger'

import { routes } from '@/constants/routes'
import { UserType } from '@/enums/type'
import { parseToken } from '@/utils/token'

import { signIn } from '@/http/auth'
import { SignInRequest } from '@/http/auth/types'

type User = {
  id: string
  type: UserType
}

type AuthContextData = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  login: ({ email, password }: SignInRequest) => Promise<void>
  logout: () => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const isAuthenticated = !!user

  const loadTokenFromStorage = () => {
    Logger.info('Verificando tokens armazenados...', { prefix: 'Auth' })
    try {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        Logger.info('Token encontrado no localStorage', { prefix: 'Auth' })
        const decoded = parseToken(accessToken)
        Logger.info(`Usuário decodificado - Tipo: ${decoded.type}, ID: ${decoded.sub}`, { prefix: 'Auth', sensitive: true })

        setUser({ id: decoded.sub, type: decoded.type })
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        Logger.info('Configurações da API atualizadas com token', { prefix: 'Auth' })
        return true
      }

      Logger.info('Nenhum token encontrado no localStorage', { prefix: 'Auth' })
      return false
    } catch (error) {
      Logger.error(`Erro ao decodificar token: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, { prefix: 'Auth' })
      return false
    }
  }

  useEffect(() => {
    Logger.info('Inicializando provedor de autenticação', { prefix: 'Auth' })
    const tokenLoaded = loadTokenFromStorage()
    Logger.info(`Token ${tokenLoaded ? 'encontrado' : 'não encontrado'}`, { prefix: 'Auth' })
  }, [])

  const login = async ({ email, password }: SignInRequest) => {
    Logger.info('Iniciando processo de login', { prefix: 'Auth' })
    setIsLoading(true)

    try {
      Logger.info('Fazendo requisição de autenticação', { prefix: 'Auth' })
      const { accessToken, refreshToken } = await signIn({ email, password })

      Logger.info('Login bem-sucedido', { prefix: 'Auth' })
      Logger.info('Tokens recebidos e validados', { prefix: 'Auth', sensitive: true })

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      Logger.info('Tokens armazenados no localStorage', { prefix: 'Auth' })

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      Logger.info('Configurações da API atualizadas', { prefix: 'Auth' })

      const decoded = parseToken(accessToken)
      setUser({ id: decoded.sub, type: decoded.type })
      Logger.info(`Usuário autenticado com tipo: ${decoded.type}`, { prefix: 'Auth' })

      const redirectPath = routes[decoded.type].dashboard.href
      Logger.info(`Redirecionando para: ${redirectPath}`, { prefix: 'Auth' })
      router.push(redirectPath)
    } catch (error) {
      Logger.error(`Erro no login: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, { prefix: 'Auth' })
      throw error
    } finally {
      Logger.info('Processo de login finalizado', { prefix: 'Auth' })
      setIsLoading(false)
    }
  }

  const logout = async () => {
    Logger.info('Iniciando logout', { prefix: 'Auth' })
    setIsLoading(true)

    try {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      Logger.info('Tokens removidos do localStorage', { prefix: 'Auth' })

      setUser(null)
      Logger.info('Estado do usuário resetado', { prefix: 'Auth' })

      Logger.info('Redirecionando para login', { prefix: 'Auth' })
      router.push('/auth/sign-in')
    } catch (error) {
      Logger.error(`Erro durante logout: ${error instanceof Error ? error.message : 'Erro desconhecido'}`, { prefix: 'Auth' })
    } finally {
      Logger.info('Logout concluído', { prefix: 'Auth' })
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    Logger.error('useAuth usado fora do AuthProvider', { prefix: 'Auth' })
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
