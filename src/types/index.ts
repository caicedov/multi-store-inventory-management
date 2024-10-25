export type Role = 'ADMIN' | 'SELLER'

export interface User {
  id: string
  name: string
  role: Role
}
