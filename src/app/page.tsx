import { LoginButton } from '@/components/auth/LoginButton'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6 text-center'>
        <h1 className='text-4xl font-bold text-white drop-shadow-md'>
          🏪Multi-Store Inventory Management🏪
        </h1>
        <p className='text-white text-lg'>
          {' '}
          A modern web application for managing inventory across multiple store
          locations.
        </p>
        <div>
          <LoginButton mode='redirect'>
            <Button variant='outline' size='lg'>
              Iniciar sesión
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  )
}
