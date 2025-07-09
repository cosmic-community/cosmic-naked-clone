import './globals.css'
import { Inter } from 'next/font/google'
import { generatePageMetadata } from '@/components/SEO'
import { generateSEOData } from '@/lib/seo'
import SEO from '@/components/SEO'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  return await generatePageMetadata({ path: '/' })
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const seoData = await generateSEOData('/')
  
  return (
    <html lang="en">
      <head>
        <SEO seoData={seoData} currentPath="/" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}