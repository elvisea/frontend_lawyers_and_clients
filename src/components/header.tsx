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
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
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
            className="ghost"
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