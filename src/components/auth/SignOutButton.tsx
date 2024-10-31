'use client'
import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

interface SignOutButtonProps {
  children?: React.ReactNode
}

const SignOutButton = ({ children }: SignOutButtonProps) => {
  return <Button onClick={logout}>{children}</Button>
}

export default SignOutButton
