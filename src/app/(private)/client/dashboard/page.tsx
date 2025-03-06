'use client'

import { useRouter } from 'next/navigation'

import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'

import {
  AlertTriangle,
  FileText,
  FolderOpen,
  Plus,
  AlertCircle,
  Clock,
  CheckCircle2,
  FileWarning,
  Loader2
} from 'lucide-react'

import { useClientDashboard } from '@/hooks/use-client-dashboard'

import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

export default function ClientDashboardPage() {
  const router = useRouter()

  const { data, isLoading } = useClientDashboard()

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  // Se não houver casos cadastrados
  if (data?.casesMetrics.totalCases === 0) {
    return (
      <div className="space-y-6 px-2 sm:px-8">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-3xl">Olá {data.profile.name}</CardTitle>
            <CardDescription className="text-lg">
              Bem-vindo à sua área de casos
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center py-8">
          <CardContent className="space-y-4">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Nenhum caso cadastrado</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Comece criando seu primeiro caso. Nossa plataforma irá ajudá-lo a organizar suas informações
                e encontrar o advogado ideal para sua situação.
              </p>
            </div>
            <Button onClick={() => router.push('/client/cases/new')} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Criar Novo Caso
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-2 sm:px-8">
      {/* Header */}
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-3xl">Olá {data?.profile.name}</CardTitle>
          <CardDescription className="text-lg">
            Acompanhe seus casos e documentos
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Card de Aviso - Perfil não cadastrado */}
      {!data?.profileStatus.isComplete && (
        <Alert className="border-yellow-600/20 bg-yellow-50/50 dark:border-yellow-400/20 dark:bg-yellow-900/10">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <AlertTitle className="text-yellow-800 dark:text-yellow-300">
            Complete suas Informações Pessoais
          </AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300/90">
            Para ter uma melhor experiência na plataforma e aumentar suas chances de encontrar o advogado ideal, complete seu perfil.
          </AlertDescription>
          <Button
            variant="outline"
            className="mt-4 border-yellow-600/50 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-600"
            onClick={() => router.push('/client/profile/create')}
          >
            Completar Perfil
          </Button>
        </Alert>
      )}

      {/* Métricas dos Casos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Casos</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.casesMetrics.totalCases}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Aberto</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.casesMetrics.openCases}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.casesMetrics.inProgressCases}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.casesMetrics.closedCases}</div>
          </CardContent>
        </Card>
      </div>

      {/* Documentos */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Total de Documentos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Documentos</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {data?.documentsMetrics.totalDocuments}
            </div>
            <p className="text-sm text-muted-foreground">
              documentos anexados aos seus casos
            </p>
          </CardContent>
        </Card>

        {/* Casos sem Documentos */}
        {data && data.documentsMetrics.casesWithoutDocuments.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Casos sem Documentos</CardTitle>
                <FileWarning className="h-5 w-5 text-orange-500" />
              </div>
              <CardDescription>
                Estes casos precisam de documentos para prosseguir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.documentsMetrics.casesWithoutDocuments.map((caso) => (
                <div
                  key={caso.id}
                  className="flex items-center justify-between p-2 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium line-clamp-1">{caso.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Criado {formatDistanceToNow(new Date(caso.createdAt), { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/client/cases/${caso.id}/documents`)}
                  >
                    Adicionar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Botão de Criar Novo Caso */}
      <div className="flex justify-end">
        <Button onClick={() => router.push('/client/cases/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Criar Novo Caso
        </Button>
      </div>
    </div>
  )
} 