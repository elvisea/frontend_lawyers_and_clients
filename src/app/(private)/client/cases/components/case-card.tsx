'use client'

import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileText, Clock, User, AlertCircle } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Case } from '@/types/case'

export const statusMap = {
  OPEN: {
    label: 'Aguardando',
    color: 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
  },
  IN_PROGRESS: {
    label: 'Em Andamento',
    color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
  },
  CLOSED: {
    label: 'Finalizado',
    color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
  }
} as const

interface CaseCardProps {
  data: Case
}

export function CaseCard({ data }: CaseCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/client/cases/${data.id}`)
  }

  return (
    <Card className="transition-colors hover:border-primary/50">
      <CardHeader className="flex flex-col gap-3 pb-4">
        <div className="space-y-2.5">
          <CardTitle className="line-clamp-2 text-base">{data.title}</CardTitle>
          <Badge
            variant="outline"
            className={`${statusMap[data.status].color} flex items-center justify-center h-7 w-full max-w-[140px]`}
          >
            {statusMap[data.status].label}
          </Badge>
        </div>
        <CardDescription className="line-clamp-3 text-sm">
          {data.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {/* Status do Advogado */}
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 flex-shrink-0" />
              {data.lawyer ? (
                <span className="text-foreground line-clamp-1">
                  {data.lawyer.name}
                </span>
              ) : (
                <span className="text-muted-foreground flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span>Aguardando advogado</span>
                </span>
              )}
            </div>

            {/* Data */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>
                {formatDistanceToNow(new Date(data.createdAt), {
                  addSuffix: true,
                  locale: ptBR
                })}
              </span>
            </div>

            {/* Documentos */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4 flex-shrink-0" />
              <span>
                {data.documents} {data.documents === 1 ? 'documento' : 'documentos'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          size="sm"
          variant="outline"
          className="w-full text-primary border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary"
          onClick={handleViewDetails}
        >
          <FileText className="h-4 w-4 mr-2" />
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  )
} 