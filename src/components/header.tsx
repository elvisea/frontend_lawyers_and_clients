'use client'

import { Bell } from 'lucide-react'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        {/* Lado esquerdo - pode conter breadcrumbs ou título da página */}
        <div>
          {/* Espaço reservado para breadcrumbs ou título */}
        </div>

        {/* Lado direito - ações globais */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notificações"
          >
            <Bell className="h-5 w-5" />
            {/* Indicador de notificações */}
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white grid place-items-center">
              2
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
} 