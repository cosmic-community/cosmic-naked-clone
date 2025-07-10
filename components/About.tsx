import { getCompanyInfo, getTeamMembers } from '@/lib/cosmic'
import { TeamMember } from '@/types'
import FadeIn from '@/components/animations/FadeIn'
import SlideIn from '@/components/animations/SlideIn'

interface CompanyStats {
  app_downloads?: string
  funds_raised?: string
  cups_of_coffee?: string
  high_fives?: string
  apps_launched?: string
}

interface CompanyInfo {
  id: string
  title: string
  slug: string
  metadata: {
    company_name: string
    tagline: string
    description: string
    phone?: string
    email?: string
    primary_location?: string
    secondary_location?: string
    stats?: CompanyStats
  }
}

export default async function About() {
  const companyInfo = await getCompanyInfo() as CompanyInfo | null
  const teamMembers = await getTeamMembers()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                About <span className="text-primary">Naked</span> Development
              </h1>
              {companyInfo?.metadata?.tagline && (
                <p className="text-xl md:text-2xl text-secondary font-medium mb-8">
                  {companyInfo.metadata.tagline}
                </p>
              )}
              {companyInfo?.metadata?.description && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {companyInfo.metadata.description}
                </p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      {companyInfo?.metadata?.stats && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SlideIn direction="up">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {Object.entries(companyInfo.metadata.stats).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {value}
                    </div>
                    <div className="text-sm md:text-base text-gray-600 capitalize">
                      {key.replace(/_/g, ' ')}
                    </div>
                  </div>
                ))}
              </div>
            </SlideIn>
          </div>
        </section>
      )}

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  We believe in the power of technology to transform ideas into reality. Our mission is to help entrepreneurs, startups, and established businesses navigate the complex world of digital transformation with confidence and clarity.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We don't just build apps – we build partnerships. Every project is an opportunity to create something meaningful that makes a real difference in people's lives.
                </p>
              </div>
            </FadeIn>
            <SlideIn direction="right">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Naked?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-gray-600">Transparent process from start to finish</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-gray-600">Proven track record with 327+ apps launched</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-gray-600">Strategic approach that de-risks your investment</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-gray-600">Expert team with decades of combined experience</span>
                  </li>
                </ul>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet the Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Behind every great project is a team of passionate individuals who bring diverse skills, 
                experiences, and perspectives to the table.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member: TeamMember, index: number) => (
              <SlideIn key={member.id} direction="up" delay={index * 0.1}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {(member.metadata.photo || member.metadata.image) && (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={`${(member.metadata.photo?.imgix_url || member.metadata.image?.imgix_url)}?w=400&h=400&fit=crop&auto=format,compress`}
                        alt={member.metadata.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.metadata.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">
                      {member.metadata.job_title || member.metadata.position}
                    </p>
                    {member.metadata.location && (
                      <p className="text-sm text-gray-500 mb-3">
                        📍 {member.metadata.location}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.metadata.bio}
                    </p>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's talk about your project and how we can help bring your vision to life.
              </p>
              
              {companyInfo?.metadata && (
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-lg">
                  {companyInfo.metadata.phone && (
                    <div className="flex items-center space-x-2">
                      <span>📞</span>
                      <a href={`tel:${companyInfo.metadata.phone}`} className="text-primary hover:text-secondary transition-colors">
                        {companyInfo.metadata.phone}
                      </a>
                    </div>
                  )}
                  {companyInfo.metadata.email && (
                    <div className="flex items-center space-x-2">
                      <span>✉️</span>
                      <a href={`mailto:${companyInfo.metadata.email}`} className="text-primary hover:text-secondary transition-colors">
                        {companyInfo.metadata.email}
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {companyInfo?.metadata && (companyInfo.metadata.primary_location || companyInfo.metadata.secondary_location) && (
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-600 mt-6">
                  {companyInfo.metadata.primary_location && (
                    <div className="flex items-center space-x-2">
                      <span>📍</span>
                      <span>{companyInfo.metadata.primary_location}</span>
                    </div>
                  )}
                  {companyInfo.metadata.secondary_location && (
                    <div className="flex items-center space-x-2">
                      <span>📍</span>
                      <span>{companyInfo.metadata.secondary_location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}