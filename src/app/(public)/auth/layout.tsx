'use client'

import Link from "next/link";

import { LogoIcon } from "@/components/Icons";
import { ModeToggle } from "@/components/mode-toggle";

type AuthLayoutProps = {
  children: React.ReactNode;
}

const appName = process.env.APP_NAME || 'App_Name'

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <LogoIcon />
          {appName}
        </Link>
        <ModeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t text-center px-4">
        <h3>
          © {new Date().getFullYear()} {appName}. Todos os direitos reservados. {" "}
          <br />
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/elvis-e-amancio/"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Developed by Elvis E. A.
          </a>
        </h3>
      </footer>
    </div>
  )
}
