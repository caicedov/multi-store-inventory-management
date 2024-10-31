import authConfig from '@/auth.config'
import NextAuth from 'next-auth'

import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Role } from '@prisma/client'
import db from './lib/db'
import { getUserById } from './services/userService'


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {},
  callbacks: {
    // Callback que se ejecuta al intentar iniciar sesión
    async signIn({ user }) {
      const existingUser = await getUserById(user.id as string)

      if (!existingUser) return false

      if (!existingUser?.active) return false

      return true
    },
    // Callback para modificar el JWT antes de ser emitidos
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      token.idUser = existingUser.id
      token.name = existingUser.name
      token.username = existingUser.username
      // Add role to token
      token.role = existingUser.role
      return token
    },
    // Callback para agregar datos a la sesion
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.name = token.name as string
        session.user.username = token.username as string
        session.user.role = token.role as Role
      }
      return session
    },
  },
  ...authConfig,
})
