import { auth } from '@/auth'
import { LoginButton } from '@/components/auth/LoginButton'
import SignOutButton from '@/components/auth/SignOutButton'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

export async function User() {
  const session = await auth()
  const user = session?.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon'}
          className='overflow-hidden rounded-full'
        >
          <Image
            width={48}
            height={48}
            alt='Avatar'
            className='overflow-hidden rounded-full'
            src={'/assets/placeholder-user.png'}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Setting</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <SignOutButton>Logout</SignOutButton>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <LoginButton mode='redirect'>
              <Button variant='outline' size='lg'>
                Iniciar sesión
              </Button>
            </LoginButton>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
