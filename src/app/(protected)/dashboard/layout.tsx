import DashboardWrapper from '@/app/(protected)/dashboard/_components/DashboardWrapper'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: DashboardLayoutProps) => {
  return <DashboardWrapper>{children}</DashboardWrapper>
}

export default ProtectedLayout
