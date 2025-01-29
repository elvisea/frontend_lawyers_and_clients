import { UserType } from "@/enums/type"

interface TokenPayload {
  sub: string
  type: UserType
  iat: number
  exp: number
}

export function parseToken(token: string): TokenPayload {
  // Divide o token em partes
  const parts = token.split(".")

  if (parts.length !== 3) {
    throw new Error("Token inválido")
  }

  // Decodifica a parte do payload (segunda parte do token)
  const payload = parts[1]

  // Adiciona padding se necessário
  const padding = "=".repeat((4 - (payload.length % 4)) % 4)
  const base64 = (payload + padding).replace(/-/g, "+").replace(/_/g, "/")

  // Converte de base64 para string
  const jsonPayload = JSON.parse(atob(base64))

  return {
    sub: jsonPayload.sub,
    type: jsonPayload.type as UserType,
    iat: jsonPayload.iat,
    exp: jsonPayload.exp
  }
} 