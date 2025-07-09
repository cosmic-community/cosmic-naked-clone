import { Metadata } from 'next'
import { cosmic } from './cosmic'

export interface SEOData {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  twitterHandle?: string
  siteUrl: string
  googleAnalyticsId?: string
  facebookAppId?: string
}

export async function generateSEOData(path: string, overrides?: Partial<SEOData>): Promise<SEOData> {
  try {
    // Fetch global SEO settings from Cosmic CMS
    const response = await cosmic.objects.findOne({
      type: 'globals',
      slug: 'seo-settings'
    }).props(['title', 'slug', 'metadata'])

    const seoSettings = response.object
    
    const defaultData: SEOData = {
      title: seoSettings?.metadata?.site_title || 'Naked Development',
      description: seoSettings?.metadata?.site_description || 'Expert web development services',
      keywords: seoSettings?.metadata?.keywords || 'web development, design, consulting',
      ogImage: seoSettings?.metadata?.og_image?.imgix_url || '',
      twitterHandle: seoSettings?.metadata?.twitter_handle || '@nakeddevelopment',
      siteUrl: seoSettings?.metadata?.site_url || 'https://nakeddevelopment.com',
      googleAnalyticsId: seoSettings?.metadata?.google_analytics_id || '',
      facebookAppId: seoSettings?.metadata?.facebook_app_id || ''
    }

    return {
      ...defaultData,
      ...overrides
    }
  } catch (error) {
    console.error('Error fetching SEO data:', error)
    
    // Fallback data if Cosmic fetch fails
    const fallbackData: SEOData = {
      title: 'Naked Development',
      description: 'Expert web development services',
      keywords: 'web development, design, consulting',
      siteUrl: 'https://nakeddevelopment.com',
      twitterHandle: '@nakeddevelopment'
    }

    return {
      ...fallbackData,
      ...overrides
    }
  }
}

export function generateMetadata(seoData: SEOData, path: string): Metadata {
  return {
    title: seoData.title,
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: `${seoData.siteUrl}${path}`,
      siteName: 'Naked Development',
      images: seoData.ogImage
        ? [
            {
              url: seoData.ogImage,
              width: 1200,
              height: 630,
              alt: seoData.title,
            },
          ]
        : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      creator: seoData.twitterHandle,
      images: seoData.ogImage ? [seoData.ogImage] : [],
    },
    ...(seoData.facebookAppId && {
      facebook: {
        appId: seoData.facebookAppId,
      },
    }),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
  }
}