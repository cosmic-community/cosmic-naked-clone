import { getCompanyInfo } from '@/lib/cosmic'

export default async function Hero() {
  const companyInfo = await getCompanyInfo()

  if (!companyInfo) {
    return null
  }

  return (
    <section className="pt-24 pb-16 section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h1 className="hero-text">
              <span className="text-secondary">#1 Ranked US App</span>
              <br />
              <span className="text-secondary">Development Agency</span>
              <span className="text-primary">.</span>
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {companyInfo.metadata.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="btn-primary text-center"
              >
                LET'S TALK
              </a>
              <a
                href="#portfolio"
                className="btn-secondary text-center"
              >
                VIEW OUR WORK
              </a>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="relative">
            <div className="flex justify-center items-center space-x-4">
              {/* Left Phone */}
              <div className="relative">
                <img
                  src="https://imgix.cosmicjs.com/b2e25eb0-5cf8-11f0-a051-23c10f41277a-photo-1516321318423-f06f85e504b3-1752088366185.jpg?w=300&h=600&fit=crop&auto=format,compress"
                  alt="BOOM Dating App"
                  className="w-48 h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
              </div>

              {/* Right Phone */}
              <div className="relative">
                <img
                  src="https://imgix.cosmicjs.com/b2e60830-5cf8-11f0-a051-23c10f41277a-photo-1551288049-bebda4e38f71-1752088366185.jpg?w=300&h=600&fit=crop&auto=format,compress"
                  alt="Analytics Dashboard"
                  className="w-48 h-96 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}