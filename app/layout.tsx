import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SEO from '@/components/SEO'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cosmic Naked Clone',
  description: 'A modern web agency showcase built with Next.js and Cosmic CMS',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🫣</text></svg>",
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
        <SEO seoData={{
          title: 'Cosmic Naked Clone',
          description: 'A modern web agency showcase built with Next.js and Cosmic CMS',
          siteUrl: 'https://your-domain.com',
          ogImage: '',
          twitterHandle: '',
          googleAnalyticsId: ''
        }} currentPath="/" />
        {children}
      </body>
    </html>
  )
}