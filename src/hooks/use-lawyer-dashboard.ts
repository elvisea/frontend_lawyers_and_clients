import { useState, useEffect } from 'react'
import api from '@/http/api'
import Logger from '@/utils/logger'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'
import { CaseStatus } from '@/types/case'

// Tipos para os dados da dashboard
interface RecentCase {
  id: string
  title: string
  clientName: string
  status: CaseStatus
  createdAt: string
}

interface LawyerProfile {
  isComplete: boolean
  specialties: string[]
  certificates: string[]
  yearsOfExperience: number
}

interface CasesMetrics {
  available: number
  inProgress: number
  closed: number
}

interface FinancialSummary {
  totalAmount: number
  casesAmount: number
  subscriptionsAmount: number
}

interface Transaction {
  id: string
  amount: number
  status: 'COMPLETED' | 'PENDING'
  createdAt: string
  type: 'CASE' | 'SUBSCRIPTION'
  reference?: string
}

interface DashboardData {
  profile: {
    name: string
    email: string
  }
  casesMetrics: CasesMetrics
  recentCases: RecentCase[]
  lawyerProfile: LawyerProfile
  financialSummary: FinancialSummary
  recentTransactions: Transaction[]
}

/**
 * Hook para buscar dados da dashboard do advogado
 */
export const useLawyerDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const fetchDashboardData = async () => {
    try {
      Logger.info('Buscando dados da dashboard do advogado', {
        prefix: 'Dashboard'
      })

      setIsLoading(true)
      setErrorCode(null)

      const response = await api.get<DashboardData>('/lawyers/dashboard')

      Logger.info('Dados da dashboard recebidos com sucesso', {
        prefix: 'Dashboard',
        data: {
          casos: {
            disponiveis: response.data.casesMetrics.available,
            andamento: response.data.casesMetrics.inProgress,
            concluidos: response.data.casesMetrics.closed
          },
          perfil: {
            completo: response.data.lawyerProfile.isComplete,
            especialidades: response.data.lawyerProfile.specialties.length,
            certificados: response.data.lawyerProfile.certificates.length,
            experiencia: response.data.lawyerProfile.yearsOfExperience
          },
          financeiro: {
            total: response.data.financialSummary.totalAmount,
            casos: response.data.financialSummary.casesAmount,
            assinaturas: response.data.financialSummary.subscriptionsAmount
          },
          transacoes: {
            total: response.data.recentTransactions.length,
            recentes: response.data.recentTransactions.slice(0, 3).map(t => ({
              id: t.id.substring(0, 8),
              tipo: t.type,
              status: t.status
            }))
          }
        }
      })

      setData(response.data)

    } catch (error) {
      if (error instanceof AppError) {
        Logger.error('Erro ao buscar dados da dashboard', {
          prefix: 'Dashboard',
          error,
          data: { errorCode: error.errorCode }
        })
        setErrorCode(error.errorCode)
      } else {
        Logger.error('Erro desconhecido ao buscar dados da dashboard', {
          prefix: 'Dashboard',
          error
        })
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      
      Logger.info('Operação de busca da dashboard finalizada', {
        prefix: 'Dashboard'
      })
      
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return {
    data,
    isLoading,
    errorCode,
    refresh: fetchDashboardData
  }
} 