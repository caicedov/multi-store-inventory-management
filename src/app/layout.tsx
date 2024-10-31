import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'
import { SessionProvider } from 'next-auth/react'
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Multi-Store Inventory Management',
  description:
    'A modern web application for managing inventory across multiple store locations.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
