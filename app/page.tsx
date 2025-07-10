import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Portfolio from '@/components/Portfolio'
import Team from '@/components/Team'
import ClientLogos from '@/components/ClientLogos'
import News from '@/components/News'
import Contact from '@/components/Contact'
import { getCompanyInfo } from '@/lib/cosmic'
import { generateSEOData, generateMetadata } from '@/lib/seo'
import { Metadata } from 'next'

export const revalidate = 10

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await generateSEOData('/')
  return generateMetadata(seoData, '/')
}

export default async function Home() {
  const companyInfo = await getCompanyInfo()

  return (
    <main>
      <Hero />
      <Stats companyInfo={companyInfo} />
      <Services />
      <Process />
      <Portfolio />
      <Team />
      <ClientLogos />
      <News />
      <Contact />
    </main>
  )
}