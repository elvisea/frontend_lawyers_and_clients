'use client'

import { AcceptedCases } from "./components/accepted-cases"

export default function AcceptedCasesPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Casos Aceitos</h1>
        </div>

        <AcceptedCases />
      </div>
    </div>
  )
} 