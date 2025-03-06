'use client'

import { useRouter } from 'next/navigation'
import {
  LayoutGrid,
  FolderOpen,
  Clock,
  ArrowRight,
  InboxIcon,
  UserCircle,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Loader2,

  TrendingUp
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useLawyerDashboard } from '@/hooks/use-lawyer-dashboard'

export default function LawyerDashboardPage() {
  const router = useRouter()
  const { data, isLoading } = useLawyerDashboard()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6 px-2 sm:px-8">
      {/* Header */}
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader>
          <CardTitle className="text-3xl">Olá, {data?.profile.name}</CardTitle>
          <CardDescription className="text-lg">
            Bem-vindo ao seu painel de controle
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Card de Aviso - Perfil não cadastrado */}
      {!data?.lawyerProfile.isComplete && (
        <Card className="border-yellow-600/20 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-xl text-yellow-800 dark:text-yellow-300">
                    Complete seu Perfil Profissional
                  </CardTitle>
                  <CardDescription className="text-yellow-700/90 dark:text-yellow-400/90">
                    Aumente suas chances de conseguir casos na plataforma
                  </CardDescription>
                </div>
              </div>

              <Button
                onClick={() => router.push('/lawyer/profile/create')}
                className="w-full sm:w-auto shrink-0 bg-yellow-600 text-white hover:bg-yellow-700 
                  dark:bg-yellow-600/90 dark:text-white dark:hover:bg-yellow-500"
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Completar Perfil Agora
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2">
              {[
                {
                  title: 'Visualizar Casos',
                  description: 'Acesse casos disponíveis para aceitar',
                  icon: FolderOpen
                },
                {
                  title: 'Recursos Premium',
                  description: 'Desbloqueie funcionalidades exclusivas',
                  icon: LayoutGrid
                },
                {
                  title: 'Especialidades',
                  description: 'Destaque suas áreas de atuação',
                  icon: UserCircle
                },
                {
                  title: 'Visibilidade',
                  description: 'Aumente sua presença na plataforma',
                  icon: TrendingUp
                }
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                    <item.icon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      {item.title}
                    </h4>
                    <p className="text-sm text-yellow-700/75 dark:text-yellow-400/75">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seção: Atalhos Rápidos */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Atalhos Rápidos</h2>
          <p className="text-sm text-muted-foreground">Acesso direto às principais funções</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {[
            {
              label: 'Casos Disponíveis',
              href: '/lawyer/cases',
              icon: FolderOpen,
              description: `${data?.casesMetrics.available} casos aguardando`,
            },
            {
              label: 'Casos em Andamento',
              href: '/lawyer/accepted-cases',
              icon: InboxIcon,
              description: `${data?.casesMetrics.inProgress} casos ativos`,
            },
            {
              label: 'Assinatura',
              href: '/lawyer/subscription',
              icon: LayoutGrid,
              description: 'Gerenciar plano',
            },
            {
              label: 'Perfil',
              href: '/lawyer/profile',
              icon: UserCircle,
              description: 'Configurações',
            }
          ].map((item) => (
            <Card
              key={item.href}
              className="hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => router.push(item.href)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <item.icon className="h-5 w-5 text-primary" />
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Seção: Visão Geral dos Casos */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Visão Geral dos Casos</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/lawyer/cases')}
          >
            Ver todos os casos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
                <FolderOpen className="h-5 w-5 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{data?.casesMetrics.available}</span>
                  <span className="text-sm text-muted-foreground">casos</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Aguardando aceitação
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/20 to-yellow-500/40" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{data?.casesMetrics.inProgress}</span>
                  <span className="text-sm text-muted-foreground">casos</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Em processamento
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 to-blue-500/40" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{data?.casesMetrics.closed}</span>
                  <span className="text-sm text-muted-foreground">casos</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Finalizados com sucesso
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/20 to-green-500/40" />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Seção: Financeiro */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Financeiro</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/lawyer/payments')}
          >
            Ver histórico completo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Últimas Transações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.recentTransactions.map(transaction => (
                <div
                  key={transaction.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    {transaction.type === 'CASE' ? (
                      <ClipboardList className="h-4 w-4 text-primary" />
                    ) : (
                      <LayoutGrid className="h-4 w-4 text-primary" />
                    )}
                    <div>
                      <p className="font-medium">
                        {transaction.type === 'CASE' ? 'Compra de Caso' : 'Assinatura'}
                        {transaction.reference && ` - ${transaction.reference}`}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(transaction.createdAt), {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0">
                    <p className="font-medium">R$ {transaction.amount.toFixed(2)}</p>
                    <Badge variant={transaction.status === 'COMPLETED' ? 'default' : 'secondary'}>
                      {transaction.status === 'COMPLETED' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Resumo Financeiro</CardTitle>
              <CardDescription>detalhamento de gastos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Casos</span>
                  <span className="font-medium">R$ {data?.financialSummary.casesAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assinaturas</span>
                  <span className="font-medium">R$ {data?.financialSummary.subscriptionsAmount.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {data?.financialSummary.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 