import type { Role } from "@prisma/client"

export interface UserCreateInput {
  name: string
  username: string
  password: string
}

export interface UserUpdateInput {
  name?: string
  username?: string
  password?: string
  role?: Role
  isActive?: boolean
}

export interface UserFilterParams {
  skip?: number
  take?: number
  search?: string
  role?: Role
  isActive?: boolean
}