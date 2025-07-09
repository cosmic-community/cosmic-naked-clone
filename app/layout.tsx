import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SEO } from '@/components/SEO'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cosmic Naked Clone',
  description: 'A modern web agency showcase built with Next.js and Cosmic CMS',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SEO />
        {children}
      </body>
    </html>
  )
}