import { getServices } from '@/lib/cosmic'

export default async function Services() {
  const services = await getServices()

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-secondary">Badass</span>
            <span className="text-primary"> Skills</span>
          </h2>
          <p className="section-subtitle">
            We bring together strategy, creativity and technology to solve complex problems
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={service.id} className="text-center space-y-4">
              <div className="text-6xl mb-4">
                {service.metadata.icon || '🛠️'}
              </div>
              <h3 className="text-xl font-bold text-secondary">
                {service.metadata.service_name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.metadata.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}