import CardWrapper from '@/components/auth/CardWrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel='Oops! Algo ha salido mal'
      backButtonHref='/auth/login'
      backButtonLabel='Volver a iniciar sesión'
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive text-4xl' />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard
