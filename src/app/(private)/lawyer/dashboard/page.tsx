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
  CheckCircle2
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Separator } from '@/components/ui/separator'

import { Loading } from '@/components/loading'
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/page-header'

import { DashboardStats } from '@/types/dashboard'

export default function LawyerDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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
    <div className="container space-y-8">
      <PageHeader>
        <PageHeaderHeading>Olá, Advogado</PageHeaderHeading>
        <PageHeaderDescription>
          Bem-vindo ao seu painel de controle
        </PageHeaderDescription>
      </PageHeader>

      {/* Seção: Atalhos Rápidos */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Atalhos Rápidos</h2>
          <p className="text-sm text-muted-foreground">Acesso direto às principais funções</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Casos Disponíveis',
              href: '/lawyer/cases',
              icon: FolderOpen,
              description: `${stats?.availableCases} casos aguardando`,
            },
            {
              label: 'Casos Aceitos',
              href: '/lawyer/accepted',
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
      <section className="space-y-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <section className="space-y-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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