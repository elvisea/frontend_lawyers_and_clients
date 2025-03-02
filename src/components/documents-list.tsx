import { FileText, Loader2 } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Document {
  id: string
  name: string
  type: string
  url: string
}

interface DocumentsListProps {
  documents: Document[]
  isInteractive?: boolean
  isDownloading?: Record<string, boolean>
  onDocumentClick?: (documentId: string) => void
}

export function DocumentsList({
  documents,
  isInteractive = false,
  isDownloading = {},
  onDocumentClick,
}: DocumentsListProps) {
  return (
    <Card>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="documents" className="border-none">
            <AccordionTrigger className="text-base hover:no-underline">
              <div className="flex items-center gap-2 flex-1">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <span className="text-2xl font-semibold">Lista de Documentos</span>
                <Badge variant="secondary">
                  {documents.length}
                </Badge>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="grid gap-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => isInteractive && onDocumentClick?.(doc.id)}
                    className={`
                      flex items-center justify-between rounded-lg border p-3 
                      ${isInteractive ? 'hover:bg-muted/50 transition-colors cursor-pointer' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.type}
                        </p>
                      </div>
                    </div>
                    {isInteractive && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          disabled={isDownloading[doc.id]}
                        >
                          {isDownloading[doc.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <FileText className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {isDownloading[doc.id] ? 'Baixando documento...' : 'Baixar documento'}
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
} 