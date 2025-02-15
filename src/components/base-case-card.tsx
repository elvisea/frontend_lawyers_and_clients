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

import { Case } from '@/types/case'
import { statusMap } from '@/app/(private)/client/cases/components/case-card'

interface BaseCaseCardProps {
  data: Case
  showPrice?: boolean
  onAction: () => void
}

export function BaseCaseCard({
  data,
  showPrice = false,
  onAction,
}: BaseCaseCardProps) {

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base line-clamp-2">{data.title}</CardTitle>
          <Badge
            variant="secondary"
            className={`${statusMap[data.status].color} shrink-0 w-fit`}
          >
            {statusMap[data.status].label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">
          {data.description}
        </CardDescription>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="text-foreground">{data.client.name}</span>
          </div>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>
              {formatDistanceToNow(new Date(data.createdAt), {
                addSuffix: true,
                locale: ptBR
              })}
            </span>
          </div>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 flex-shrink-0" />
            <span>
              {data.documents} {data.documents === 1 ? 'documento' : 'documentos'}
            </span>
          </div>
        </div>

        {showPrice && data.price && (
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm font-medium">Valor do caso</span>
            <span className="text-lg font-semibold text-primary">
              {`R$ ${data.price}`}
            </span>
          </div>
        )}
      </CardContent>

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
    </Card>
  )
} 