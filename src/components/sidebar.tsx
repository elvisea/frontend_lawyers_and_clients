'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, X } from 'lucide-react'

import { SidebarProps } from '@/types/sidebar'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'

export function Sidebar({ items, title = 'Dashboard' }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  const toggleSidebar = () => {
    console.log('🔄 [Sidebar] Alternando visibilidade')
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = async () => {
    console.log('🚪 [Sidebar] Iniciando logout...')
    await logout()
  }

  return (
    <>
      {/* Botão mobile para abrir/fechar sidebar */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 lg:hidden"
        aria-label={isSidebarOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay para mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-full w-64 transform bg-background border-r transition-transform duration-200 ease-in-out',
          'lg:translate-x-0 lg:static lg:h-screen',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={toggleSidebar}
            className="lg:hidden"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Container flex para garantir que o conteúdo principal e o footer fiquem corretamente posicionados */}
        <div className="flex h-[calc(100%-4rem)] flex-col justify-between">
          {/* Navigation */}
          <nav className="flex flex-col gap-1 p-4">
            {Object.values(items).map((item, index) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    'hover:bg-muted/50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    isActive && 'bg-muted font-medium'
                  )}
                >
                  {Icon && (
                    <Icon className={cn('h-4 w-4', isActive && 'text-foreground')} />
                  )}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer com botão de logout */}
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                'text-red-500 hover:bg-red-500/10',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
            >
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
} 