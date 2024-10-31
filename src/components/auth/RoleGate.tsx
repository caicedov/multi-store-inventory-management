'use client'

import { FormError } from '@/components/FormError'
import { useCurrentRole } from '@/hooks/useCurrentRole'
import type { Role } from '@prisma/client'

interface RoleGateProps {
  children: React.ReactNode
  allowedRole: Role
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole()

  if (role !== allowedRole)
    return (
      <FormError message='You do not have permission to view this content' />
    )
  return <>{children}</>
}
