import { UserType } from "@/enums/type"

export type User = {
  id: string
  email: string
  name: string
  type: UserType
  createdAt: string
  updatedAt: string
}

export type Meta = {
  page: number
  limit: number
  total: {
    items: number
    pages: number
  }
}

export type UsersResponse = {
  data: User[]
  meta: Meta
}
