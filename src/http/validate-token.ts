import api from "./api";

export type ValidateTokenRequest = {
  email: string; token: string;
}

export async function validateToken({ email, token }: ValidateTokenRequest) {
  const response = await api.post('/email-verifications/validade-token', { email, token })
  return response
}