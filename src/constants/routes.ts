import { UserType } from '@/enums/type'

import {
  LayoutGrid,
  FileText,
  InboxIcon,
  FolderOpen,
  ClipboardList,
  UserCircle,
  Cog,
  Users
} from 'lucide-react'

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
      icon: ClipboardList
    },
    profile: {
      href: '/admin/profile',
      label: 'Perfil',
      icon: UserCircle
    },
    settings: {
      href: '/admin/settings',
      label: 'Configurações',
      icon: Cog
    },
  },
  [UserType.STAFF]: {
    dashboard: {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
    },
    users: {
      href: '/users',
      label: 'Usuários',
      icon: Users
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
      icon: FileText
    },
    profile: {
      label: 'Perfil',
      href: '/client/profile',
      icon: UserCircle
    },
    settings: {
      label: 'Configurações',
      href: '/client/settings',
      icon: Cog
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
      label: 'Casos Disponíveis',
      icon: FolderOpen
    },
    accepted: {
      href: '/lawyer/accepted-cases',
      label: 'Casos Aceitos',
      icon: InboxIcon
    },
    profile: {
      href: '/lawyer/profile',
      label: 'Perfil',
      icon: UserCircle
    },
    settings: {
      href: '/lawyer/settings',
      label: 'Configurações',
      icon: Cog
    },
  },
}


