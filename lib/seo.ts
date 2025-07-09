import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
  apiEnvironment: "staging",
})

export interface SEOSettings {
  id: string
  title: string
  metadata: {
    site_title: string
    site_description: string
    site_url: string
    default_keywords?: string
    default_og_image?: {
      url: string
      imgix_url: string
    }
    twitter_handle?: string
    facebook_app_id?: string
    google_analytics_id?: string
    robots_meta: string
  }
}

export interface PageSEO {
  id: string
  title: string
  metadata: {
    page_name: string
    page_path: string
    seo_title: string
    seo_description: string
    keywords?: string
    og_image?: {
      url: string
      imgix_url: string
    }
    canonical_url?: string
    robots_meta_override?: string
  }
}

export interface SEOData {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  robotsMeta?: string
  twitterHandle?: string
  facebookAppId?: string
  googleAnalyticsId?: string
  siteUrl: string
}

export async function getGlobalSEOSettings(): Promise<SEOSettings | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'seo-settings' })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return object as SEOSettings
  } catch (error) {
    console.error('Error fetching global SEO settings:', error)
    return null
  }
}

export async function getPageSEO(path: string): Promise<PageSEO | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'page-seo', 'metadata.page_path': path })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return object as PageSEO
  } catch (error) {
    console.error('Error fetching page SEO:', error)
    return null
  }
}

export async function getAllPageSEO(): Promise<PageSEO[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'page-seo' })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return objects as PageSEO[]
  } catch (error) {
    console.error('Error fetching all page SEO:', error)
    return []
  }
}

export async function generateSEOData(
  path: string,
  overrides: Partial<SEOData> = {}
): Promise<SEOData> {
  const globalSettings = await getGlobalSEOSettings()
  const pageSEO = await getPageSEO(path)
  
  // Default fallback values
  const defaultSEO: SEOData = {
    title: 'Naked Development - #1 Ranked US App Development Agency',
    description: 'We solve problems with strategy, creativity and technology. A lot of people have ideas, but don\'t have a clue. We can help.',
    keywords: 'app development, mobile apps, web development, UI/UX design, startup, technology',
    siteUrl: 'https://nakeddev.com',
    robotsMeta: 'index, follow'
  }

  // Build SEO data with proper fallbacks
  const seoData: SEOData = {
    title: overrides.title || 
           pageSEO?.metadata.seo_title || 
           globalSettings?.metadata.site_title || 
           defaultSEO.title,
    
    description: overrides.description || 
                pageSEO?.metadata.seo_description || 
                globalSettings?.metadata.site_description || 
                defaultSEO.description,
    
    keywords: overrides.keywords || 
             pageSEO?.metadata.keywords || 
             globalSettings?.metadata.default_keywords || 
             defaultSEO.keywords,
    
    ogImage: overrides.ogImage || 
            (pageSEO?.metadata.og_image?.imgix_url ? 
             `${pageSEO.metadata.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress` : 
             undefined) ||
            (globalSettings?.metadata.default_og_image?.imgix_url ? 
             `${globalSettings.metadata.default_og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress` : 
             undefined),
    
    canonicalUrl: overrides.canonicalUrl || 
                 pageSEO?.metadata.canonical_url || 
                 undefined,
    
    robotsMeta: overrides.robotsMeta || 
               pageSEO?.metadata.robots_meta_override || 
               globalSettings?.metadata.robots_meta || 
               defaultSEO.robotsMeta,
    
    twitterHandle: overrides.twitterHandle || 
                  globalSettings?.metadata.twitter_handle || 
                  undefined,
    
    facebookAppId: overrides.facebookAppId || 
                  globalSettings?.metadata.facebook_app_id || 
                  undefined,
    
    googleAnalyticsId: overrides.googleAnalyticsId || 
                      globalSettings?.metadata.google_analytics_id || 
                      undefined,
    
    siteUrl: overrides.siteUrl || 
            globalSettings?.metadata.site_url || 
            defaultSEO.siteUrl
  }

  return seoData
}

export function generateMetadata(seoData: SEOData, currentPath: string = '/') {
  const fullUrl = `${seoData.siteUrl}${currentPath === '/' ? '' : currentPath}`
  
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
    metadataBase: new URL(seoData.siteUrl),
    alternates: {
      canonical: seoData.canonicalUrl || fullUrl,
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: fullUrl,
      siteName: 'Naked Development',
      locale: 'en_US',
      type: 'website',
      ...(seoData.ogImage && {
        images: [
          {
            url: seoData.ogImage,
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
      ...(seoData.ogImage && { images: [seoData.ogImage] }),
    },
    robots: {
      index: seoData.robotsMeta?.includes('index') || false,
      follow: seoData.robotsMeta?.includes('follow') || false,
      googleBot: {
        index: seoData.robotsMeta?.includes('index') || false,
        follow: seoData.robotsMeta?.includes('follow') || false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    ...(seoData.facebookAppId && {
      facebook: {
        appId: seoData.facebookAppId,
      },
    }),
  }
}