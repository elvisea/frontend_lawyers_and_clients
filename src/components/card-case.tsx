'use client'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileText, Clock, User } from 'lucide-react'

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
import { Separator } from '@/components/ui/separator'

import { CaseStatus } from '@/types/case'
import { statusMap } from '@/app/(private)/client/cases/components/case-card'

type CardCaseProps = {
  title: string
  description: string
  status: CaseStatus
  documents: number
  createdAt: Date
  client: {
    name: string
  }
  onAction?: () => void
}

export function CardCase({
  title,
  description,
  status,
  documents,
  createdAt,
  client,
  onAction,
}: CardCaseProps) {

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base line-clamp-2">{title}</CardTitle>
          <Badge
            variant="outline"
            className={`${statusMap[status].color} flex items-center justify-center h-7 w-full max-w-[140px]`}
          >
            {statusMap[status].label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 flex-shrink-0" />
            <span>{client.name}</span>
          </div>

          <Separator orientation="vertical" className="h-4 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>
              {formatDistanceToNow(new Date(createdAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </span>
          </div>

          <Separator orientation="vertical" className="h-4 hidden sm:block" />

          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 flex-shrink-0" />
            <span>
              {documents} {documents === 1 ? 'documento' : 'documentos'}
            </span>
          </div>

        </div>
      </CardContent>

      {onAction && (
        <CardFooter>
          <Button
            size="sm"
            variant="outline"
            className="w-full text-primary hover:bg-primary/10 hover:text-primary border-primary/20"
            onClick={onAction}
          >
            <FileText className="h-4 w-4 mr-2" />
            Ver Detalhes
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 