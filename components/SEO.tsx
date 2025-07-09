import { generateSEOData, generateMetadata, SEOData } from '@/lib/seo'
import { Metadata } from 'next'

interface SEOProps {
  path: string
  overrides?: Partial<SEOData>
}

export async function generatePageMetadata({ path, overrides }: SEOProps): Promise<Metadata> {
  const seoData = await generateSEOData(path, overrides)
  return generateMetadata(seoData, path)
}

export default function SEO({ seoData, currentPath }: { seoData: SEOData; currentPath: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Naked Development',
    url: seoData.siteUrl,
    description: seoData.description,
    ...(seoData.ogImage && { image: seoData.ogImage }),
    sameAs: [
      ...(seoData.twitterHandle ? [`https://twitter.com/${seoData.twitterHandle.replace('@', '')}`] : []),
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Google Analytics */}
      {seoData.googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${seoData.googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${seoData.googleAnalyticsId}');
              `,
            }}
          />
        </>
      )}

      {/* Additional meta tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://imgix.cosmicjs.com" />
      
      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      {seoData.googleAnalyticsId && (
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      )}
    </>
  )
}