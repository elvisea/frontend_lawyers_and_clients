import api from '../api'

import {
  RefreshTokenRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  ValidateTokenRequest,
} from './types'

export async function signIn({ email, password }: SignInRequest) {
  const { data } = await api.post<SignInResponse>('/auth', { email, password })
  return data
}

export async function signUp({
  email,
  password,
  name,
  type,
}: SignUpRequest) {
  const { data } = await api.post<SignUpResponse>('/users', {
    email,
    password,
    name,
    type,
  })
  return data
}

export async function refreshToken({ refreshToken }: RefreshTokenRequest) {
  const { data } = await api.post<SignInResponse>('/auth/refresh-token', {
    refreshToken,
  })
  return data
}

export async function validateToken({ email, token }: ValidateTokenRequest) {
  const response = await api.post('/email-verifications/validade-token', {
    email,
    token,
  })
  return response
}
