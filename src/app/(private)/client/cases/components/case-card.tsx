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

import { Case } from '@/types/case'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CaseCardProps {
  data: Case
}

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

export function CaseCard({ data }: CaseCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/client/cases/${data.id}`)
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="line-clamp-1">{data.title}</CardTitle>
          <div className="flex items-center justify-center min-w-[140px]">
            <Badge
              variant="outline"
              className={`${statusMap[data.status].color} flex items-center justify-center w-full text-center`}
            >
              {statusMap[data.status].label}
            </Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {data.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        {/* Status do Advogado */}
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          {data.lawyer ? (
            <span className="text-foreground">{data.lawyer.name}</span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-500" />
              Aguardando aceitação de um advogado
            </span>
          )}
        </div>

        {/* Data de Criação */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            Criado {formatDistanceToNow(new Date(data.createdAt), {
              addSuffix: true,
              locale: ptBR
            })}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          className="text-primary border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary"
          onClick={handleViewDetails}
        >
          <FileText className="h-4 w-4 mr-2" />
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  )
} 