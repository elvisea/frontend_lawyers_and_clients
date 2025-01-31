import { UserType } from '@/enums/type'
import { File, LayoutGrid, Settings, User } from 'lucide-react'

export type Route = {
  label: string
  href: string
  icon: React.ElementType
}

export const routes: Record<UserType, Record<string, Route>> = {
  [UserType.ADMIN]: {
    dashboard: {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    cases: {
      href: '/admin/cases',
      label: 'Casos',
      icon: File
    },
    profile: {
      href: '/admin/profile',
      label: 'Perfil',
      icon: User
    },
    settings: {
      href: '/admin/settings',
      label: 'Configurações',
      icon: Settings
    },
  },
  [UserType.CLIENT]: {
    dashboard: {
      label: 'Dashboard',
      href: '/client/dashboard',
      icon: LayoutGrid
    },
    cases: {
      label: 'Casos',
      href: '/client/cases',
      icon: File
    },
    profile: {
      label: 'Perfil',
      href: '/client/profile',
      icon: User
    },
    settings: {
      label: 'Configurações',
      href: '/client/settings',
      icon: Settings
    },
  },
  [UserType.LAWYER]: {
    dashboard: {
      href: '/lawyer/dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    cases: {
      href: '/lawyer/cases',
      label: 'Casos',
      icon: File
    },
    profile: {
      href: '/lawyer/profile',
      label: 'Perfil',
      icon: User
    },
    settings: {
      href: '/lawyer/settings',
      label: 'Configurações',
      icon: Settings
    },
  },
}


