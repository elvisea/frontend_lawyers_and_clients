import { CheckCircle2 } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
  steps: {
    title: string
    description: string
  }[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  // Calcular a porcentagem de progresso
  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="w-full mb-6">
      {/* Barra de progresso */}
      <div className="h-2 w-full bg-muted rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Etapas */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div className={`flex items-center justify-center h-5 w-5 rounded-full 
              ${index <= currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'}`}
            >
              {index < currentStep ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <span className="text-xs font-medium">{index + 1}</span>
              )}
            </div>
            <span className={`text-sm font-medium ${index === currentStep
                ? 'text-foreground'
                : 'text-muted-foreground'
              }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 