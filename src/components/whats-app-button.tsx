'use client'

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

import { whatsAppClick } from "@/utils/whatsapp-click"

type Props = {
  resource: 'clients' | 'lawyers' | 'default'
}

export function WhatsAppButton({ resource }: Props) {
  const handleWhatsAppClick = () => {
    whatsAppClick(resource)
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 bg-green-500 hover:bg-green-600 text-white shadow-lg"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
} 