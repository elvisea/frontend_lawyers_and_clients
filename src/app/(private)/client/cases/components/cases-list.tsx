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

import { Skeleton } from '@/components/ui/skeleton'

import api from '@/http/api'
import { Case, CasesResponse } from '@/types/case'

import { CaseCard } from './case-card'
import { AppError } from '@/errors/app-error'
import { ErrorCode } from '@/enums/error-code'

const ITEMS_PER_PAGE = 6

export function CasesList() {
  const [cases, setCases] = useState<Case[]>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [errorCode, setErrorCode] = useState<ErrorCode | null>(null)

  console.log('🚨 [CasesList] errorCode:', errorCode)

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
        setCases(response.data.cases)
        setTotal(response.data.total)
      } catch (error) {
        if (error instanceof AppError) {
          setErrorCode(error.errorCode)
        } else {
          setErrorCode(ErrorCode.UNKNOWN_ERROR)
        }
        console.error('Erro ao carregar casos:', error)
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[302px] w-full rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (cases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <h3 className="mt-2 text-sm font-semibold">Nenhum caso encontrado</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Comece criando um novo caso clicando no botão acima.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Total de casos: {total}
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => (
          <CaseCard key={item.id} data={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
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
      )}
    </div>
  )
} 