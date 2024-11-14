import type { UserFilterParams } from "@/types/user";
import type { User } from "@prisma/client";
import { useEffect, useState } from "react";

export function useUsers({ skip = 0, take = 10, search, role }: UserFilterParams) {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)

      const queryParams = new URLSearchParams({
        skip: skip.toString(),
        take: take.toString(),
        ...(search ? { search } : {}),
        ...(role ? { role } : {}),
      })

      try {
        const res = await fetch(`/api/users?${queryParams.toString()}`)
        const data = await res.json()

        if (!res.ok) throw new Error(data.error)
          
        setUsers(data.users)
        setTotal(data.total)
        setHasMore(data.hasMore)

      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [skip, take, search, role])

  return { users, total, hasMore, loading }
}
