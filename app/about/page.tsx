import { Metadata } from 'next'
import About from '@/components/About'
import { getSEOSettings } from '@/lib/cosmic'

export async function generateMetadata(): Promise<Metadata> {
  const seoSettings = await getSEOSettings()
  
  return {
    title: `About Us - ${seoSettings?.metadata?.site_title || 'Naked Development'}`,
    description: 'Learn about our team, mission, and the passion that drives us to create exceptional digital experiences.',
    keywords: 'about naked development, team, company, app development agency, leadership',
    openGraph: {
      title: `About Us - ${seoSettings?.metadata?.site_title || 'Naked Development'}`,
      description: 'Learn about our team, mission, and the passion that drives us to create exceptional digital experiences.',
      images: seoSettings?.metadata?.og_image?.imgix_url ? [
        {
          url: `${seoSettings.metadata.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: 'About Naked Development',
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `About Us - ${seoSettings?.metadata?.site_title || 'Naked Development'}`,
      description: 'Learn about our team, mission, and the passion that drives us to create exceptional digital experiences.',
      images: seoSettings?.metadata?.og_image?.imgix_url ? [
        `${seoSettings.metadata.og_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
      ] : [],
    },
  }
}

export default function AboutPage() {
  return <About />
}