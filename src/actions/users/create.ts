import type { UserCreateInput } from "@/types/user"

export async function createUserAction(
  userData: UserCreateInput
) {
  const res = await fetch('/api/users/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })

  if (!res.ok) throw new Error('Error creating user')

  return await res.json()
}