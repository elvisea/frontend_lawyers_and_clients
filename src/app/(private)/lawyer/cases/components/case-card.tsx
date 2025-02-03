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
import { statusMap } from '@/app/(private)/client/cases/components/case-card'

interface CaseCardProps {
  data: Case
}

export function CaseCard({ data }: CaseCardProps) {
  const router = useRouter()

  const firstName = data.client.name.split(' ')[0]
  const isAvailable = data.status === 'OPEN'

  const handleViewDetails = () => {
    if (!isAvailable) return
    router.push(`/lawyer/cases/${data.id}`)
  }

  return (
    <Card className={`transition-colors ${!isAvailable ? 'opacity-60' : 'hover:border-primary/50'}`}>
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
            {/* Cliente */}
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="text-foreground">
                {firstName}
              </span>
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
        {isAvailable ? (
          <Button
            size="sm"
            variant="outline"
            className="w-full text-primary border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary"
            onClick={handleViewDetails}
          >
            <FileText className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="w-full cursor-not-allowed"
            disabled
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Caso não disponível
          </Button>
        )}
      </CardFooter>
    </Card>
  )
} 