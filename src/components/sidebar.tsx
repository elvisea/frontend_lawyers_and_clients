'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet'

import { SidebarProps } from '@/types/sidebar'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'

export function Sidebar({ items, title = 'Dashboard' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  const NavItems = () => (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-1 p-2">
        {Object.values(items).map((item, index) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Button
              key={index}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3',
                isActive && 'font-medium'
              )}
              asChild
            >
              <Link href={item.href} onClick={() => setIsOpen(false)}>
                {Icon && (
                  <Icon className={cn('h-8 w-8', isActive && 'text-foreground')} />
                )}
                <span>{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </ScrollArea>
  )

  // Versão Mobile
  const MobileSidebar = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden fixed left-4 h-16 flex items-center z-40"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="h-16 px-4 border-b">
          <div className="flex h-full items-center">
            <SheetTitle className="text-base font-semibold">
              {title}
            </SheetTitle>
          </div>
          <SheetDescription className="sr-only">
            Menu de navegação principal com opções de acesso às funcionalidades do sistema
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          <NavItems />
          <div className="mt-auto p-2 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )

  // Versão Desktop
  const DesktopSidebar = () => (
    <aside className="hidden lg:flex w-64 flex-col border-r h-screen">
      <div className="h-16 px-4 border-b flex items-center">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="flex flex-col flex-1">
        <NavItems />
        <div className="mt-auto p-2 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  )
} 