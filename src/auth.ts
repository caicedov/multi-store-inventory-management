import authConfig from '@/auth.config'
import db from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { getUserById } from './data/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
  },
  events: {},
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token

      token.name = existingUser.name
      token.username = existingUser.username
      token.role = existingUser.role
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          username: token.username,
          name: token.name,
          role: token.role
        }
      }
      /*
      if (token.sub && session.user) session.user.id = token.sub;
      if (token.role && session.user) session.user.role = token.role;
      if (session.user) {
        session.user.name = token.name
        session.user.username = token.username
      }
      return session
      */
    }
  },
  ...authConfig,
})
