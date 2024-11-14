import DashboardWrapper from '@/components/dashboard/DashboardWrapper'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: DashboardLayoutProps) => {
  return <DashboardWrapper>{children}</DashboardWrapper>
}

export default ProtectedLayout
