import { Metadata } from 'next'
import { getSEOSettings, getPageSEO } from './cosmic'

export interface SEOData {
  title: string
  description: string
  siteUrl: string
  ogImage?: string
  twitterHandle?: string
  facebookAppId?: string
  googleAnalyticsId?: string
  keywords?: string
  robotsMeta?: string
}

export async function generateSEOData(path: string, overrides: Partial<SEOData> = {}): Promise<SEOData> {
  const seoSettings = await getSEOSettings()
  const pageSEO = await getPageSEO(path)
  
  // Base SEO data from globals
  const baseData: SEOData = {
    title: seoSettings?.metadata?.site_title || 'Cosmic Naked Clone',
    description: seoSettings?.metadata?.site_description || 'A modern web agency showcase built with Next.js and Cosmic CMS',
    siteUrl: seoSettings?.metadata?.site_url || 'https://your-domain.com',
    ogImage: seoSettings?.metadata?.og_image?.imgix_url || '',
    twitterHandle: seoSettings?.metadata?.twitter_handle || '',
    facebookAppId: seoSettings?.metadata?.facebook_app_id || '',
    googleAnalyticsId: seoSettings?.metadata?.google_analytics_id || '',
    keywords: seoSettings?.metadata?.keywords || '',
    robotsMeta: seoSettings?.metadata?.robots_meta?.value || 'index,follow',
  }

  // Override with page-specific SEO if available
  if (pageSEO) {
    const pageData: Partial<SEOData> = {
      title: pageSEO.metadata?.title || baseData.title,
      description: pageSEO.metadata?.description || baseData.description,
      ogImage: pageSEO.metadata?.og_image?.imgix_url || baseData.ogImage,
      keywords: pageSEO.metadata?.keywords || baseData.keywords,
    }
    Object.assign(baseData, pageData)
  }

  // Apply any overrides
  return { ...baseData, ...overrides }
}

export function generateMetadata(seoData: SEOData, path: string): Metadata {
  const fullUrl = `${seoData.siteUrl}${path}`
  
  // Optimize OG image if available
  const ogImageUrl = seoData.ogImage 
    ? `${seoData.ogImage}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    robots: seoData.robotsMeta,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: fullUrl,
      siteName: seoData.title,
      type: 'website',
      locale: 'en_US',
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
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
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      ...(seoData.facebookAppId && { 'fb:app_id': seoData.facebookAppId }),
    },
  }
}