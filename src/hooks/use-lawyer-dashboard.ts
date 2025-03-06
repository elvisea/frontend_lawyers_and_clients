import { useState, useEffect } from 'react'
import api from '@/http/api'
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
      console.log('🔄 [Dashboard Advogado] Buscando dados da dashboard...')
      setIsLoading(true)
      setErrorCode(null)

      const response = await api.get<DashboardData>('/lawyers/dashboard')

      // Log dos dados recebidos
      console.log('✅ [Dashboard Advogado] Dados recebidos com sucesso!')
      console.log('📊 [Dashboard Advogado] Métricas:', {
        casos: {
          disponíveis: response.data.casesMetrics.available,
          andamento: response.data.casesMetrics.inProgress,
          concluídos: response.data.casesMetrics.closed
        },
        perfil: {
          completo: response.data.lawyerProfile.isComplete,
          especialidades: response.data.lawyerProfile.specialties.length,
          certificados: response.data.lawyerProfile.certificates.length
        },
        financeiro: {
          total: response.data.financialSummary.totalAmount,
          casos: response.data.financialSummary.casesAmount,
          assinaturas: response.data.financialSummary.subscriptionsAmount
        },
        transacoes: response.data.recentTransactions.length
      })

      setData(response.data)

    } catch (error) {
      if (error instanceof AppError) {
        console.error(`❌ [Dashboard Advogado] Erro ao buscar dados: Código ${error.errorCode}`, error)
        setErrorCode(error.errorCode)
      } else {
        console.error('❌ [Dashboard Advogado] Erro desconhecido ao buscar dados:', error)
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      console.log('🏁 [Dashboard Advogado] Operação de busca finalizada')
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