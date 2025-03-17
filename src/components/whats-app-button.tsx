'use client'

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const PHONE_NUMBER = "5541992190528"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Gostaria de obter mais informações sobre os serviços jurídicos oferecidos pela plataforma. Podem me ajudar?"
    )
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank')
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