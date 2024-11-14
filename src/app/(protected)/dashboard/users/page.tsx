'use client'
import UserTable from '@/components/dashboard/users/UsersTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {} from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useUsers } from '@/hooks/useUsers'
import { Role } from '@prisma/client'
import { ChevronDown, Download, Search } from 'lucide-react'
import { useState } from 'react'

export default function UsersPage() {
  const [search, setSearch] = useState<string>('')
  const [role, setRole] = useState<Role | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const pageSize = 10
  const { users, loading, total, hasMore } = useUsers({
    search,
    role,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  const handleRoleChange = (role: Role | string | undefined) => {
    setPage(1)
    setRole(role === 'all' ? undefined : (role as Role))
  }

  const handleSearch = (value: string) => {
    setPage(1)
    setSearch(value)
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className='container mx-auto p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Users management</h1>
      </div>
      <Card>
        <CardHeader>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0'>
            <CardTitle>Users ({total} users)</CardTitle>
            <div className='flex flex-col sm:flex-row gap-2'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search by name or username'
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className='pl-8'
                />
              </div>
              <Select
                value={role}
                onValueChange={(value) => handleRoleChange(value)}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Select role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All</SelectItem>
                  <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                  <SelectItem value={Role.SELLER}>Seller</SelectItem>
                  <SelectItem value={Role.TECH}>Tech</SelectItem>
                </SelectContent>
              </Select>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant='outline' size='icon' disabled aria-disabled>
                    <Download className='h-4 w-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download all</p>
                </TooltipContent>
              </Tooltip>
              <Button>
                Add product
                <ChevronDown className='h-4 w-4 ml-2' />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <UserTable users={users} loading={loading} />
          <div className='mt-4 flex items-center justify-between px-2'>
            <div className='text-sm text-muted-foreground'>
              Showing {(page - 1) * pageSize + 1} -{' '}
              {Math.min(page * pageSize, total)} of {total} users
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant={'outline'}
                size={'sm'}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className='text-sm font-medium'>
                Page {page} of {totalPages}
              </div>
              <Button
                variant={'outline'}
                size={'sm'}
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasMore}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
