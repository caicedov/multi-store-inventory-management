import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './schemas/signInSchema'
import { getUserByUsername } from './services/userService'

export default {
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { success, data } = signInSchema.safeParse(credentials)
        if (!success) throw new Error('Invalid credentials')

        const user = await getUserByUsername(data.username)

        if (!user || !user.password) throw new Error('Invalid credentials')

        const passwordMatch = await bcrypt.compare(data.password, user.password)

        if (!passwordMatch) throw new Error('Invalid credentials')

        return user

      },
    }),
  ],
} satisfies NextAuthConfig
