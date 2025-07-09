import { Suspense } from 'react'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Portfolio from '@/components/Portfolio'
import Team from '@/components/Team'
import News from '@/components/News'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ClientLogos from '@/components/ClientLogos'
import LoadingSpinner from '@/components/LoadingSpinner'
import { generatePageMetadata } from '@/components/SEO'

export async function generateMetadata(): Promise<Metadata> {
  return await generatePageMetadata({ path: '/' })
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Stats />
      </Suspense>
      
      <ClientLogos />
      
      <Suspense fallback={<LoadingSpinner />}>
        <Services />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Process />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Portfolio />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Team />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <News />
      </Suspense>
      
      <Contact />
    </main>
  )
}