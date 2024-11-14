'use server'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signInSchema } from '@/schemas/signInSchema'
import userService from '@/services/userService'
import { AuthError } from 'next-auth'
import type { z } from 'zod'

export const login = async (
  values: z.infer<typeof signInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = signInSchema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields!' }

  const { username, password } = validatedFields.data
  const existingUser = await userService.getUserByUsername(username)

  if (!existingUser?.username || !existingUser?.password)
    return { error: 'Username does not exist!' }

  if (!existingUser.isActive) return { error: 'User is not active!' }

  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
    return { success: 'Logged in!' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }
    throw error
  }
}
