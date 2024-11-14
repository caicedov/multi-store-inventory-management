import { NavItem } from '@/components/dashboard/NavItem'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Home,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react'
import Link from 'next/link'

const DesktopNav = () => {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Link
          href={'/dashboard'}
          className='group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base'
        >
          <div>Store</div>
          <span className='sr-only'>Multi Stores</span>
        </Link>
        <NavItem href='/dashboard' label='Dashboard'>
          <Home className='w-5 h-5' />
        </NavItem>
        <NavItem href='/dashboard/sales' label='Sales'>
          <ShoppingCart className='h-5 w-5' />
        </NavItem>
        <NavItem href='/dashboard/products' label='Products'>
          <Package className='w-5 h-5' />
        </NavItem>
        <NavItem href='/dashboard/users' label='Users'>
          <Users2 className='h-5 w-5' />
        </NavItem>

        <NavItem href='/dashboard/analytics' label='Analytics'>
          <LineChart className='h-5 w-5' />
        </NavItem>
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='#' // TODO: Add href
              className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
            >
              <Settings className='w-5 h-5' />
              <span className='sr-only'>Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}

export default DesktopNav
