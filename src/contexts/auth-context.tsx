'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import api from '@/http/api'

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
    console.log('🔍 [Auth] Verificando tokens armazenados...')
    try {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        console.log('✅ [Auth] Token encontrado no localStorage')
        const decoded = parseToken(accessToken)
        console.log(`   ➔ Tipo de usuário: ${decoded.type}`)
        console.log(`   ➔ ID do usuário: ${decoded.sub}`)

        setUser({ id: decoded.sub, type: decoded.type })
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        console.log('⚙️ [Auth] Configurações da API atualizadas com token')
        return true
      }

      console.log('❌ [Auth] Nenhum token encontrado no localStorage')
      return false
    } catch (error) {
      console.error('🚨 [Auth] Erro ao decodificar token:', error)
      return false
    }
  }

  useEffect(() => {
    console.log('🏁 [Auth] Inicializando provedor de autenticação')
    const tokenLoaded = loadTokenFromStorage()
    console.log(`   ➔ Token ${tokenLoaded ? 'encontrado' : 'não encontrado'}`)
  }, [])

  const login = async ({ email, password }: SignInRequest) => {
    console.log('🔑 [Auth] Iniciando processo de login...')
    setIsLoading(true)

    try {
      console.log('📡 [Auth] Fazendo requisição de autenticação...')
      const { accessToken, refreshToken } = await signIn({ email, password })

      console.log('✅ [Auth] Login bem-sucedido')
      console.log('   ➔ Access Token:', accessToken.substring(0, 15) + '...')
      console.log('   ➔ Refresh Token:', refreshToken.substring(0, 15) + '...')

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      console.log('💾 [Auth] Tokens armazenados no localStorage')

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      console.log('⚙️ [Auth] Configurações da API atualizadas')

      const decoded = parseToken(accessToken)
      setUser({ id: decoded.sub, type: decoded.type })
      console.log(`👤 [Auth] Estado do usuário atualizado → Tipo: ${decoded.type}`)

      const redirectPath = routes[decoded.type].dashboard.href
      console.log(`⏩ [Auth] Redirecionando para: ${redirectPath}`)
      router.push(redirectPath)
    } catch (error) {
      console.error('🚨 [Auth] Falha no login:', error)
      throw error
    } finally {
      console.log('🏁 [Auth] Finalizando processo de login')
      setIsLoading(false)
    }
  }

  const logout = async () => {
    console.log('🚪 [Auth] Iniciando logout...')
    setIsLoading(true)

    try {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      console.log('🗑️ [Auth] Tokens removidos do localStorage')

      setUser(null)
      console.log('🔄 [Auth] Estado do usuário resetado')

      console.log('⏩ [Auth] Redirecionando para login')
      router.push('/auth/sign-in')
    } catch (error) {
      console.error('🚨 [Auth] Erro durante logout:', error)
    } finally {
      console.log('🏁 [Auth] Logout concluído')
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
    console.error('🚨 [Auth] useAuth usado fora do AuthProvider')
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}
