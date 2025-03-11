'use client'

import { ModeToggle } from "@/components/mode-toggle";

type AuthLayoutProps = {
  children: React.ReactNode;
}

const appName = process.env.APP_NAME || 'App_Name'

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex h-16 items-center border-b px-4">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="text-xl font-semibold">{appName}</h1>
        </div>
        <ModeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t">
        <div className="mx-auto w-full max-w-3xl px-4">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {appName}. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
