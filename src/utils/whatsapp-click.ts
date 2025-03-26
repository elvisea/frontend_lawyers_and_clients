import { env } from "@/env"

export const PHONE_NUMBER = env.NEXT_PUBLIC_PHONE_NUMBER

export type UserType = 'default' | 'clients' | 'lawyers'

const messages = {
  default: "Olá! Gostaria de mais informações sobre a plataforma JusMatch. Podem me ajudar?",
  clients: "Olá! Estou precisando de ajuda jurídica e gostaria de mais informações sobre a plataforma. Podem me ajudar?",
  lawyers: "Olá! Sou advogado(a) e gostaria de mais informações sobre como fazer parte da plataforma. Podem me ajudar?"
}

export const whatsAppClick = (userType: UserType = 'default') => {
  const message = encodeURIComponent(messages[userType])
  window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank')
}