import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SEO from '@/components/SEO'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { generateSEOData } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generateSEOData('/')
  
  return {
    title: {
      default: seoData.title,
      template: `%s | ${seoData.title}`,
    },
    description: seoData.description,
    keywords: seoData.keywords,
    authors: [{ name: 'Naked Development' }],
    creator: 'Naked Development',
    publisher: 'Naked Development',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🫣</text></svg>",
    },
    metadataBase: new URL(seoData.siteUrl),
    alternates: {
      canonical: '/',
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
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: seoData.siteUrl,
      title: seoData.title,
      description: seoData.description,
      siteName: seoData.title,
      ...(seoData.ogImage && {
        images: [
          {
            url: `${seoData.ogImage}?w=1200&h=630&fit=crop&auto=format,compress`,
            width: 1200,
            height: 630,
            alt: seoData.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      ...(seoData.twitterHandle && { creator: seoData.twitterHandle }),
      ...(seoData.ogImage && { 
        images: [`${seoData.ogImage}?w=1200&h=630&fit=crop&auto=format,compress`] 
      }),
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const seoData = await generateSEOData('/')
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SEO seoData={seoData} currentPath="/" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}