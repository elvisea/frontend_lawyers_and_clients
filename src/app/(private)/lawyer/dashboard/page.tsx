'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  LayoutGrid,
  FolderOpen,
  Clock,
  ArrowRight,
  InboxIcon,
  UserCircle,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  AlertTriangle
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

import { Loading } from '@/components/loading'
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header'

import { DashboardStats } from '@/types/dashboard'
import { useLawyerProfile } from '@/hooks/use-lawyer-profile'

export default function LawyerDashboardPage() {
  const router = useRouter()
  const { profile, isLoading: isLoadingProfile } = useLawyerProfile()

  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setStats({
          availableCases: 15,
          acceptedCases: 8,
          totalSpent: 2450.00,
          spentByCases: 1800.00,
          spentBySubscription: 650.00,
          recentPayments: [
            {
              id: '1',
              amount: 300.00,
              date: '2024-03-15T10:00:00Z',
              status: 'COMPLETED',
              type: 'CASE'
            },
            {
              id: '2',
              amount: 150.00,
              date: '2024-03-14T15:30:00Z',
              status: 'PENDING',
              type: 'SUBSCRIPTION'
            }
          ],
          casesByStatus: {
            open: 15,
            inProgress: 5,
            closed: 3
          }
        })
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-6 px-2 sm:px-8">
      <PageHeader>
        <PageHeaderHeading>Olá, Advogado</PageHeaderHeading>
        <PageHeaderDescription>
          Bem-vindo ao seu painel de controle
        </PageHeaderDescription>
      </PageHeader>

      {/* Card de Aviso - Perfil não cadastrado */}
      {!isLoadingProfile && !profile && (
        <Card className="border-yellow-600/20 bg-yellow-50/50 dark:border-yellow-400/20 dark:bg-yellow-900/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <CardTitle className="text-yellow-800 dark:text-yellow-300">
                Complete seu Perfil Profissional
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-yellow-700 dark:text-yellow-300/90">
                Para começar a receber casos e ter acesso completo à plataforma, é necessário completar seu perfil profissional.
              </p>
              <p className="text-yellow-700 dark:text-yellow-300/90">
                Com seu perfil completo você poderá:
              </p>
              <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300/90 ml-1 space-y-1">
                <li>Visualizar e aceitar casos disponíveis</li>
                <li>Assinar planos e acessar recursos premium</li>
                <li>Destacar suas especialidades e experiência</li>
                <li>Aumentar sua visibilidade na plataforma</li>
              </ul>
            </div>
            <Button
              variant="outline"
              className="border-yellow-600/50 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-600 
                dark:border-yellow-400/50 dark:text-yellow-300 dark:hover:bg-yellow-400/10 
                dark:hover:border-yellow-400"
              onClick={() => router.push('/lawyer/profile/create')}
            >
              Completar Perfil Agora
            </Button>
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
              description: `${stats?.availableCases} casos aguardando`,
            },
            {
              label: 'Casos Aceitos',
              href: '/lawyer/accepted-cases',
              icon: InboxIcon,
              description: `${stats?.acceptedCases} casos ativos`,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{stats?.casesByStatus.inProgress}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{stats?.casesByStatus.closed}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  {Math.round((stats?.casesByStatus.closed || 0) / (stats?.acceptedCases || 1) * 100)}%
                </span>
              </div>
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
              {stats?.recentPayments.map(payment => (
                <div
                  key={payment.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    {payment.type === 'CASE' ? (
                      <ClipboardList className="h-4 w-4 text-primary" />
                    ) : (
                      <LayoutGrid className="h-4 w-4 text-primary" />
                    )}
                    <div>
                      <p className="font-medium">
                        {payment.type === 'CASE' ? 'Compra de Caso' : 'Assinatura'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(payment.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 mt-2 sm:mt-0">
                    <p className="font-medium">R$ {payment.amount.toFixed(2)}</p>
                    <Badge variant={payment.status === 'COMPLETED' ? 'default' : 'secondary'}>
                      {payment.status === 'COMPLETED' ? 'Pago' : 'Pendente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Total Investido</CardTitle>
              <CardDescription>detalhamento de gastos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Casos</span>
                  <span className="font-medium">R$ {stats?.spentByCases.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assinaturas</span>
                  <span className="font-medium">R$ {stats?.spentBySubscription.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {stats?.totalSpent.toFixed(2)}
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