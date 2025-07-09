import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Naked Development - #1 Ranked US App Development Agency',
  description: 'We solve problems with strategy, creativity and technology. A lot of people have ideas, but don\'t have a clue. We can help.',
  keywords: ['app development', 'mobile apps', 'web development', 'UI/UX design', 'startup', 'technology'],
  authors: [{ name: 'Naked Development' }],
  creator: 'Naked Development',
  publisher: 'Naked Development',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nakeddev.com'),
  openGraph: {
    title: 'Naked Development - #1 Ranked US App Development Agency',
    description: 'We solve problems with strategy, creativity and technology. A lot of people have ideas, but don\'t have a clue. We can help.',
    url: 'https://nakeddev.com',
    siteName: 'Naked Development',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naked Development - #1 Ranked US App Development Agency',
    description: 'We solve problems with strategy, creativity and technology. A lot of people have ideas, but don\'t have a clue. We can help.',
    creator: '@nakeddev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}