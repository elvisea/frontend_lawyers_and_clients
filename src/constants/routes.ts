import { UserType } from '@/enums/type'

export const USER_TYPE_ROUTES: Record<UserType, string> = {
  [UserType.ADMIN]: '/admin/dashboard',
  [UserType.CLIENT]: '/client/dashboard',
  [UserType.LAWYER]: '/lawyer/dashboard',
}

export const PUBLIC_ROUTES: string[] = [
  '/',
  '/landing/clients',
  '/landing/lawyers',
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/reset-password',
  '/auth/confirm-token',
  '/auth/forgot-password',
]

// Rotas específicas para cada tipo de usuário
export const CLIENT_ROUTES: Record<string, string> = {
  dashboard: '/client/dashboard',
  profile: '/client/profile',
  cases: '/client/cases',
  settings: '/client/settings',
} as const

export const ADMIN_ROUTES: Record<string, string> = {
  dashboard: '/admin/dashboard',
  profile: '/admin/profile',
  cases: '/admin/cases',
  settings: '/admin/settings',
} as const

export const LAWYER_ROUTES: Record<string, string> = {
  dashboard: '/lawyer/dashboard',
  profile: '/lawyer/profile',
  cases: '/lawyer/cases',
  settings: '/lawyer/settings',
} as const
