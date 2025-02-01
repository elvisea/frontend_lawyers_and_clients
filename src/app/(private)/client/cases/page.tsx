'use client'

import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CasesList } from './components/cases-list'

export default function ClientCasesPage() {
  const router = useRouter()

  const handleNewCase = () => {
    router.push('/client/cases/new')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Meus Casos</h1>
        <Button onClick={handleNewCase}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Caso
        </Button>
      </div>

      <CasesList />
    </div>
  )
} 