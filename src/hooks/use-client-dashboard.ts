import { useState, useEffect } from 'react'

import api from '@/http/api'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

// Tipos para os dados da dashboard
interface DashboardCase {
  id: string
  title: string
  createdAt: string
}

interface DashboardData {
  casesMetrics: {
    totalCases: number
    openCases: number
    inProgressCases: number
    closedCases: number
  }
  profileStatus: {
    isComplete: boolean
    missingFields: string[]
    lastUpdate: string
  }
  documentsMetrics: {
    totalDocuments: number
    casesWithoutDocuments: DashboardCase[]
  }
  profile: {
    name: string
    email: string
  }
}

/**
 * Hook para buscar dados da dashboard do cliente
 */
export const useClientDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  const fetchDashboardData = async () => {
    try {
      console.log('🔄 [Dashboard] Buscando dados da dashboard...')
      setIsLoading(true)
      setErrorCode(null)

      const response = await api.get<DashboardData>('/clients/dashboard')

      // Log dos dados recebidos
      console.log('✅ [Dashboard] Dados recebidos com sucesso!')
      console.log('📊 [Dashboard] Métricas:', {
        casos: {
          total: response.data.casesMetrics.totalCases,
          abertos: response.data.casesMetrics.openCases,
          andamento: response.data.casesMetrics.inProgressCases,
          concluidos: response.data.casesMetrics.closedCases
        },
        documentos: {
          total: response.data.documentsMetrics.totalDocuments,
          casosSemDocumentos: response.data.documentsMetrics.casesWithoutDocuments.length
        },
        perfil: {
          completo: response.data.profileStatus.isComplete,
          camposFaltantes: response.data.profileStatus.missingFields.length
        }
      })

      setData(response.data)

    } catch (error) {
      if (error instanceof AppError) {
        console.error(`❌ [Dashboard] Erro ao buscar dados: Código ${error.errorCode}`, error)
        setErrorCode(error.errorCode)
      } else {
        console.error('❌ [Dashboard] Erro desconhecido ao buscar dados:', error)
        setErrorCode(ErrorCode.UNKNOWN_ERROR)
      }

    } finally {
      // Delay artificial para suavizar a transição
      await new Promise(resolve => setTimeout(resolve, 350))
      console.log('🏁 [Dashboard] Operação de busca finalizada')
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