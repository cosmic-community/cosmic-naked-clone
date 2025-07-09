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
  robotsMeta?: string
  canonicalUrl?: string
}

export async function generateSEOData(path: string, overrides?: Partial<SEOData>): Promise<SEOData> {
  try {
    // First, try to get page-specific SEO data
    let pageSpecificData: SEOData | null = null
    
    try {
      const pageResponse = await cosmic.objects.findOne({
        type: 'page-seo',
        'metadata.page_path': path
      }).props(['title', 'slug', 'metadata'])
      
      if (pageResponse.object) {
        const pageSEO = pageResponse.object
        pageSpecificData = {
          title: pageSEO.metadata.seo_title,
          description: pageSEO.metadata.seo_description,
          keywords: pageSEO.metadata.keywords,
          ogImage: pageSEO.metadata.og_image?.imgix_url,
          canonicalUrl: pageSEO.metadata.canonical_url,
          robotsMeta: pageSEO.metadata.robots_meta_override,
          siteUrl: '', // Will be filled from global settings
          twitterHandle: '', // Will be filled from global settings
          googleAnalyticsId: '', // Will be filled from global settings
          facebookAppId: '' // Will be filled from global settings
        }
      }
    } catch (error) {
      // Page-specific SEO not found, continue with global settings
      console.log('Page-specific SEO not found for path:', path)
    }

    // Fetch global SEO settings from Cosmic CMS
    const globalResponse = await cosmic.objects.findOne({
      type: 'globals',
      slug: 'seo-settings'
    }).props(['title', 'slug', 'metadata'])

    const globalSEO = globalResponse.object
    
    const defaultData: SEOData = {
      title: globalSEO?.metadata?.site_title || 'Naked Development',
      description: globalSEO?.metadata?.site_description || 'Expert web development services',
      keywords: globalSEO?.metadata?.keywords || 'web development, design, consulting',
      ogImage: globalSEO?.metadata?.og_image?.imgix_url || '',
      twitterHandle: globalSEO?.metadata?.twitter_handle || '@nakeddevelopment',
      siteUrl: globalSEO?.metadata?.site_url || 'https://nakeddevelopment.com',
      googleAnalyticsId: globalSEO?.metadata?.google_analytics_id || '',
      facebookAppId: globalSEO?.metadata?.facebook_app_id || '',
      robotsMeta: globalSEO?.metadata?.robots_meta?.value || 'index,follow'
    }

    // Merge page-specific data with global defaults
    const mergedData = pageSpecificData ? {
      ...defaultData,
      ...pageSpecificData,
      // Ensure global-only fields are preserved
      siteUrl: defaultData.siteUrl,
      twitterHandle: defaultData.twitterHandle,
      googleAnalyticsId: defaultData.googleAnalyticsId,
      facebookAppId: defaultData.facebookAppId,
      robotsMeta: pageSpecificData.robotsMeta || defaultData.robotsMeta
    } : defaultData

    return {
      ...mergedData,
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
      twitterHandle: '@nakeddevelopment',
      robotsMeta: 'index,follow'
    }

    return {
      ...fallbackData,
      ...overrides
    }
  }
}

export function generateMetadata(seoData: SEOData, path: string): Metadata {
  const canonicalUrl = seoData.canonicalUrl || `${seoData.siteUrl}${path}`
  
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
      index: seoData.robotsMeta?.includes('index') !== false,
      follow: seoData.robotsMeta?.includes('follow') !== false,
      googleBot: {
        index: seoData.robotsMeta?.includes('index') !== false,
        follow: seoData.robotsMeta?.includes('follow') !== false,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      siteName: 'Naked Development',
      images: seoData.ogImage
        ? [
            {
              url: `${seoData.ogImage}?w=1200&h=630&fit=crop&auto=format,compress`,
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
      images: seoData.ogImage ? [`${seoData.ogImage}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
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