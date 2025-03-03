'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { CaseForm } from './components/case-form'
import { StepIndicator } from './components/step-indicator'

const steps = [
  {
    title: 'Informações',
    description: 'Detalhes do caso'
  },
  {
    title: 'Documentos',
    description: 'Anexar arquivos'
  }
]

export default function NewCasePage() {
  const router = useRouter()

  return (
    <div className="px-4 max-w-screen-md mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Criar Novo Caso</h1>
      </div>

      <StepIndicator currentStep={0} steps={steps} />

      <div className="space-y-4">
        <div className="text-muted-foreground">
          <h2 className="text-lg font-medium text-foreground">Etapa 1: Informações do Caso</h2>
          <p>
            Forneça informações detalhadas sobre seu caso para que os advogados possam
            entender melhor sua situação. Quanto mais detalhes você fornecer,
            melhor será o atendimento.
          </p>
        </div>

        <CaseForm />
      </div>
    </div>
  )
}