import { CasesList } from './components/cases-list'

export default function CasesPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Casos Disponíveis</h1>
        </div>

        {/* Lista */}
        <CasesList />
      </div>
    </div>
  )
} 