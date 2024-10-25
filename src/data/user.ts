import db from "@/lib/db"
import type { User } from "@/types"

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({ where: { username } })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}

export const createUser = async (user: Omit<User, 'id' | 'createdAt'>) => {
  const newUser = await db.user.create({
    data: {
      ...user,
      role: 'ADMIN',
    },

  })
  // TODO: Implement
}