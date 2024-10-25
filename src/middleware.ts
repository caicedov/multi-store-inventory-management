import authConfig from '@/auth.config'
import NextAuth from 'next-auth'

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { nextUrl } = request
  const isLoggedIn = !!request.auth

  return null
})