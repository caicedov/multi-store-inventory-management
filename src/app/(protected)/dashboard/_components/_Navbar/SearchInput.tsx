'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function SearchInput() {
  const router = useRouter()
  const [isPending, setIsPending] = useTransition()

  function searchAction() {
    // TODO: Implement search action
  }

  return (
    <form action='' className='relative ml-auto flex-1 md:grow-0'>
      <Search className='absolute left-2.5 top-[.75rem] h-4 w-4 text-muted-foreground' />
      <Input
        name='q'
        type='search'
        placeholder='Search...'
        className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] focus:outline-none focus:border-blue-500'
      />
      {isPending && <div>Hola</div>}
    </form>
  )
}
