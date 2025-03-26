'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Logger from '@/utils/logger'
import { RouteType, UserType } from '@/enums/type'

import { Loading } from '@/components/loading'
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
    Logger.info(`Iniciando verificação de acesso (${type})`, { prefix: 'RouteGuard' })

    if (isLoading) {
      Logger.info('Verificação pendente - carregando estado', { prefix: 'RouteGuard' })
      return
    }

    if (type === RouteType.PRIVATE) {
      Logger.info('Verificando acesso à rota privada', { prefix: 'RouteGuard' })
      Logger.info(`Permissões requeridas: ${allowedTypes.join(', ') || 'Nenhuma específica'}`, { prefix: 'RouteGuard', sensitive: true })
      Logger.info(`Usuário atual: ${user?.type || 'Não autenticado'}`, { prefix: 'RouteGuard', sensitive: true })

      if (!isAuthenticated) {
        Logger.warn('Acesso negado - usuário não autenticado', { prefix: 'RouteGuard' })
        Logger.info('Redirecionando para /auth/sign-in', { prefix: 'RouteGuard' })
        router.push('/auth/sign-in')
      }
      else if (allowedTypes.length > 0 && !allowedTypes.includes(user!.type)) {
        Logger.warn('Acesso negado - permissão insuficiente', { prefix: 'RouteGuard' })
        Logger.info(`Necessário: ${allowedTypes.join(', ')}`, { prefix: 'RouteGuard', sensitive: true })
        Logger.info(`Possui: ${user!.type}`, { prefix: 'RouteGuard', sensitive: true })
        Logger.info('Redirecionando para /auth/sign-in', { prefix: 'RouteGuard' })
        router.push('/auth/sign-in')
      }
      else {
        Logger.info('Acesso permitido - todas as verificações foram aprovadas', { prefix: 'RouteGuard' })
      }
    }
    else {
      Logger.info('Rota pública - acesso liberado', { prefix: 'RouteGuard' })
    }
  }, [isAuthenticated, isLoading, router, type, allowedTypes, user])

  if (isLoading) {
    Logger.info('Renderizando estado de carregamento', { prefix: 'RouteGuard' })
    return <Loading />
  }

  if (type === RouteType.PRIVATE) {
    if (!isAuthenticated) {
      Logger.warn('Bloqueando renderização - usuário não autenticado', { prefix: 'RouteGuard' })
      return null
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(user!.type)) {
      Logger.warn('Bloqueando renderização - permissões insuficientes', { prefix: 'RouteGuard' })
      return null
    }
  }

  Logger.info('Renderizando conteúdo protegido', { prefix: 'RouteGuard' })
  return <React.Fragment>{children}</React.Fragment>
}