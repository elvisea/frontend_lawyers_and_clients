import { UserType } from "@/enums/type";

export type SignUpRequest = {
  email: string;
  password: string;
  name: string;
  type: UserType
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

export type SignInRequest = {
  email: string; password: string;
}

export type SignInResponse = {
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
}

export type RefreshTokenRequest = {
  refreshToken: string;
}

export type ValidateTokenRequest = {
  email: string; token: string;
}

