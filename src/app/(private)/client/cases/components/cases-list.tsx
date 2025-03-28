'use client'

import { useEffect, useState } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Loader2 } from 'lucide-react'

import api from '@/http/api'
import Logger from '@/utils/logger'
import { Case, CasesResponse } from '@/types/case'

import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

import { CaseCard } from './case-card'

const ITEMS_PER_PAGE = 8

export function CasesList() {
  const [cases, setCases] = useState<Case[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  Logger.info('🚨 [CasesList] errorCode:', {
    prefix: 'CasesList',
    data: { errorCode }
  })

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setIsLoading(true)
        const response = await api.get<CasesResponse>('/cases/client', {
          params: {
            page: currentPage,
            limit: ITEMS_PER_PAGE
          }
        })

        // Delay artificial para suavizar a transição
        await new Promise(resolve => setTimeout(resolve, 350))

        setCases(response.data.cases)
        setTotal(response.data.total)
      } catch (error) {
        if (error instanceof AppError) {
          setErrorCode(error.errorCode)
        } else {
          setErrorCode(ErrorCode.UNKNOWN_ERROR)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchCases()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return

    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-12rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (cases.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="text-center">
          <h3 className="text-sm font-semibold">Nenhum caso encontrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Você ainda não possui nenhum caso cadastrado.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <p className="text-sm text-muted-foreground mb-6">
        Total de casos: {total}
      </p>

      <div className="space-y-4">
        {cases.map((item) => (
          <CaseCard key={item.id} data={item} />
        ))}
      </div>

      <div className="flex justify-center mt-6 pb-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1)
                  }
                }}
                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1

              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handlePageChange(page)
                      }}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }

              if (
                (page === currentPage - 2 && currentPage > 3) ||
                (page === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              return null
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1)
                  }
                }}
                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
} 