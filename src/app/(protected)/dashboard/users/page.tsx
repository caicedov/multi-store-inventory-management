'use client'
import { createUserAction } from '@/actions/users/create'
import UserTable from '@/components/dashboard/users/UsersTable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '@prisma/client'
import { Download, Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function UsersPage() {
  const [search, setSearch] = useState<string>('')
  const [role, setRole] = useState<Role | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState<boolean>(false)
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

  const formSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
    createUserAction(values)
    setOpenModal(false)
    form.reset()
  }

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
              <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className='mr-2 h-4 w-4' />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[500px]'>
                  <DialogHeader>
                    <DialogTitle>New User</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className='space-y-4'
                    >
                      <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder='Enter full name' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder='Enter username' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                type={'password'}
                                placeholder='Enter password'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter className='gap-2 sm:gap-0'>
                        <Button
                          type='button'
                          variant={'outline'}
                          onClick={() => setOpenModal(false)}
                        >
                          Discard
                        </Button>
                        <Button type='submit'>Add User</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
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
