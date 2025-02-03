'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { CasesList } from './components/cases-list'

export default function CasesPage() {
  const router = useRouter()

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Meus Casos</h1>
          <Button onClick={() => router.push('/client/cases/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Caso
          </Button>
        </div>

        {/* Lista */}
        <CasesList />
      </div>
    </div>
  )
} 