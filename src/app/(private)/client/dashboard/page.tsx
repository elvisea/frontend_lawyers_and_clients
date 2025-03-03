'use client'

import { useRouter } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'

import { useClientProfile } from '@/hooks/use-client-profile'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

export default function ClientDashboardPage() {
  const router = useRouter()
  const { profile, isLoading: isLoadingProfile } = useClientProfile()

  return (
    <div className="space-y-6 px-2 sm:px-8">
      {/* Header */}
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-3xl">Olá</CardTitle>
          <CardDescription className="text-lg">
            Bem-vindo ao seu painel de controle
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Card de Aviso - Perfil não cadastrado */}
      {!isLoadingProfile && !profile && (
        <Card className="border-yellow-600/20 bg-yellow-50/50 dark:border-yellow-400/20 dark:bg-yellow-900/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <CardTitle className="text-yellow-800 dark:text-yellow-300">
                Complete suas Informações Pessoais
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-yellow-700 dark:text-yellow-300/90">
                Para ter uma melhor experiência na plataforma e aumentar suas chances de encontrar o advogado ideal, complete seu perfil.
              </p>
              <p className="text-yellow-700 dark:text-yellow-300/90">
                Com suas informações completas:
              </p>
              <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300/90 ml-1 space-y-1">
                <li>Os advogados poderão avaliar melhor seu caso</li>
                <li>Agilize o processo de análise do seu caso</li>
                <li>Facilite a comunicação com os profissionais</li>
                <li>Tenha um atendimento mais personalizado</li>
              </ul>
            </div>
            <Button
              variant="outline"
              className="border-yellow-600/50 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-600 
                dark:border-yellow-400/50 dark:text-yellow-300 dark:hover:bg-yellow-400/10 
                dark:hover:border-yellow-400"
              onClick={() => router.push('/client/profile/create')}
            >
              Completar Informações Agora
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resto do conteúdo da dashboard */}
      <div className="flex items-center justify-center w-full h-full">
        <h1 className="text-xl font-semibold">CLIENT DASHBOARD</h1>
      </div>
    </div>
  )
} 