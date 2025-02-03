import { CasesList } from './components/cases-list'

export default function LawyerCasesPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Casos Disponíveis</h1>
      </div>

      <div className="flex-1">
        <CasesList />
      </div>
    </div>
  )
} 