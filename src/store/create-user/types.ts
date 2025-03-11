import { UserType } from "@/enums/type"
import { ErrorCode } from "@/enums/error-code"

export type CreateUserData = {
  name: string
  email: string
}

export type CreateUserResponse = {
  id: string
  name: string
  email: string
  type: UserType
}

export type CreateUserStore = {
  isLoading: boolean
  errorCode: ErrorCode | null
  createUser: (type: UserType, data: CreateUserData) => Promise<void>
  reset: () => void
}