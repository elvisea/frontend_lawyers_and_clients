import { useState, useEffect } from 'react'

import api from '@/http/api'
import Logger from '@/utils/logger'
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
      Logger.info('Buscando dados da dashboard', {
        prefix: 'Dashboard'
      })

      setIsLoading(true)
      setErrorCode(null)

      const response = await api.get<DashboardData>('/clients/dashboard')

      Logger.info('Dados recebidos com sucesso', {
        prefix: 'Dashboard',
        data: {
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
      
      Logger.info('Operação de busca finalizada', {
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