'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RouteType, UserType } from '@/enums/type'
import Loading from '@/components/loading'
import { useAuth } from '@/contexts/auth-context'

type RouteGuardProps = {
  type: RouteType
  allowedTypes?: UserType[]
  children: React.ReactNode
}

export const RouteGuard = ({ type, allowedTypes = [], children }: RouteGuardProps) => {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    console.log(`🛡️ [Route Guard] Iniciando verificação de acesso (${type})`)

    if (isLoading) {
      console.log('⏳ [Route Guard] Verificação pendente - carregando estado')
      return
    }

    if (type === RouteType.PRIVATE) {
      console.log('🔒 [Route Guard] Verificando acesso à rota privada')
      console.log(`   ➔ Permissões requeridas: ${allowedTypes.join(', ') || 'Nenhuma específica'}`)
      console.log(`   ➔ Usuário atual: ${user?.type || 'Não autenticado'}`)

      if (!isAuthenticated) {
        console.log('❌ [Route Guard] Acesso negado - usuário não autenticado')
        console.log('⏩ Redirecionando para /auth/sign-in')
        router.push('/auth/sign-in')
      }
      else if (allowedTypes.length > 0 && !allowedTypes.includes(user!.type)) {
        console.log(`🚫 [Route Guard] Acesso negado - permissão insuficiente`)
        console.log(`   ➔ Necessário: ${allowedTypes.join(', ')}`)
        console.log(`   ➔ Possui: ${user!.type}`)
        console.log('⏩ Redirecionando para /auth/sign-in')
        router.push('/auth/sign-in')
      }
      else {
        console.log('✅ [Route Guard] Acesso permitido - todas as verificações foram aprovadas')
      }
    }
    else {
      console.log('🌐 [Route Guard] Rota pública - acesso liberado')
    }
  }, [isAuthenticated, isLoading, router, type, allowedTypes, user])

  if (isLoading) {
    console.log('⏳ [Route Guard] Renderizando estado de carregamento')
    return <Loading />
  }

  if (type === RouteType.PRIVATE) {
    if (!isAuthenticated) {
      console.log('🚧 [Route Guard] Bloqueando renderização - usuário não autenticado')
      return null
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(user!.type)) {
      console.log('🚧 [Route Guard] Bloqueando renderização - permissões insuficientes')
      return null
    }
  }

  console.log('🎉 [Route Guard] Renderizando conteúdo protegido')
  return <React.Fragment>{children}</React.Fragment>
}