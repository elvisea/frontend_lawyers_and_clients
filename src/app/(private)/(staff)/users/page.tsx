'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Users, Search, Mail, UserCircle } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/loading'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { useGetUsers } from '@/hooks/use-get-users'
import { UserType } from '@/enums/type'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const ITEMS_PER_PAGE = 10

export default function UsersPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useGetUsers({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    type: UserType.CLIENT
  })

  const handleUserClick = (userId: string) => {
    router.push(`/users/${userId}`)
  }

  const handleCreateUser = () => {
    router.push('/users/new')
  }

  const handlePageChange = (page: number) => {
    if (page < 1 || page > (data?.meta.total.pages || 1)) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return <Loading size="lg" />
  }

  return (
    <div className="space-y-6 min-h-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Users className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-semibold">Clientes</h1>
            {data && (
              <p className="text-sm text-muted-foreground mt-1">
                Total de {data.meta.total.items} cliente{data.meta.total.items === 1 ? '' : 's'}
              </p>
            )}
          </div>
        </div>

        <Button onClick={handleCreateUser}>
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Novo Cliente</span>
          <span className="sm:hidden">Novo</span>
        </Button>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar clientes..."
          className="pl-9 w-full"
        />
      </div>

      {/* Lista de Clientes */}
      <div className="space-y-4 min-h-[300px]">
        {data?.data.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user.id)}
            className="group cursor-pointer bg-card hover:bg-accent/50 border rounded-lg p-4 transition-colors"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4 sm:flex-1">
                <UserCircle className="h-10 w-10 text-muted-foreground shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {user.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0">
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {data?.data.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Users className="h-12 w-12 mb-4 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Nenhum cliente encontrado</p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Tente ajustar sua busca ou adicione um novo cliente
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Paginação */}
      {data && data.meta.total.pages > 1 && (
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

              {Array.from({ length: data.meta.total.pages }).map((_, index) => {
                const page = index + 1

                if (
                  page === 1 ||
                  page === data.meta.total.pages ||
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
                  (page === currentPage + 2 && currentPage < data.meta.total.pages - 2)
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
                    if (currentPage < data.meta.total.pages) {
                      handlePageChange(currentPage + 1)
                    }
                  }}
                  className={currentPage >= data.meta.total.pages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}