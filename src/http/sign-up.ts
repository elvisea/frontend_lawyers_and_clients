import api from "./api";

export enum Type {
  CLIENT = "CLIENT",
  LAWYER = "LAWYER"
}

export type SignUpRequest = {
  email: string; password: string; name: string; type: Type
}

export type SignUpResponse = {
  id: string;
  name: string;
  email: string;
  userType: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

export async function signUp({ email, password, name, type }: SignUpRequest) {
  const { data } = await api.post<SignUpResponse>('/users', { email, password, name, type })
  return data
}