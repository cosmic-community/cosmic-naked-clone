import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Stats from '@/components/Stats'
import Portfolio from '@/components/Portfolio'
import Team from '@/components/Team'
import ClientLogos from '@/components/ClientLogos'
import News from '@/components/News'
import Contact from '@/components/Contact'
import { getCompanyInfo } from '@/lib/cosmic'

export default async function Home() {
  const companyInfo = await getCompanyInfo()

  return (
    <main>
      <Hero />
      <Services />
      <Process />
      <Stats companyInfo={companyInfo} />
      <Portfolio />
      <Team />
      <ClientLogos />
      <News />
      <Contact />
    </main>
  )
}