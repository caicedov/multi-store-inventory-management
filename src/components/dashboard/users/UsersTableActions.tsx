'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { User } from '@prisma/client'
import { Edit, MoreHorizontal, UserRoundCheck, UserRoundX } from 'lucide-react'
import Link from 'next/link'

interface UsersTableActionsProps {
  user: User
}

export function UsersTableActions({ user }: UsersTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className='h-8 w-8 p-0'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {/** TODO: Implement button functions */}
        <Link href={`/users/${user.id}/edit`}>
          <DropdownMenuItem>
            <Edit className='h-4 w-4 mr-2' />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className={user.isActive ? 'text-red-600' : 'text-blue-600'}
        >
          {user.isActive ? (
            <UserRoundX className='h-4 w-4 mr-2' />
          ) : (
            <UserRoundCheck className='h-4 w-4 mr-2' />
          )}
          {user.isActive ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
