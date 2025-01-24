import api from "./api";

export enum Type {
  CLIENT = "CLIENT",
  LAWYER = "LAWYER"
}

export type SignInRequest = {
  email: string; password: string;
}

export type SignInResponse = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
}

export async function signIn({ email, password }: SignInRequest) {
  const { data } = await api.post<SignInResponse>('/auth', { email, password })
  return data
}