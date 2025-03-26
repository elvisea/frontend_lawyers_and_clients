'use client'

import { Power } from 'lucide-react'
import { Button } from './ui/button'

import { ModeToggle } from './mode-toggle'
import { useAuth } from '@/contexts/auth-context'

export function Header() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/95 supports-[backdrop-filter]:bg-background/60">
      <div className="h-full flex items-center justify-between">
        {/* Lado esquerdo - pode conter breadcrumbs ou título da página */}
        <div>
          {/* Espaço reservado para breadcrumbs ou título */}
        </div>

        {/* Lado direito - ações globais */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            aria-label="Sair do sistema"
          >
            <Power className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
} 