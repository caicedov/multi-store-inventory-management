/*import type { Role } from '@prisma/client'
import type { DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  username: string | unknown;
  role?: Role | undefined;
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }

  interface User {
    id?: string
    username?: string | unknown
    role?: Role | undefined
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role
  }
}
*/
import type { Role } from '@prisma/client'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Agregamos propiedades adicionales al objeto `user` en la sesión.
   * `Session` es el objeto que recibe la sesión del usuario al llamarse `getSession`, `useSession`, etc.
   */
  interface Session {
    user: {
      id: string
      username: string
      role: Role
    } & DefaultSession['user']
  }

  interface User {
    id: string
    username: string
    role: string
  }

}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username: string
    role: Role
  }
}