'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CasesList } from './components/cases-list'

export default function ClientCasesPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Meus Casos</h1>
        <Button asChild>
          <Link href="/client/cases/new">
            <Plus className="h-4 w-4 mr-2" />
            Novo Caso
          </Link>
        </Button>
      </div>

      <div className="flex-1">
        <CasesList />
      </div>
    </div>
  )
} 