import { getCompanyInfo } from '@/lib/cosmic'

export default async function Contact() {
  const companyInfo = await getCompanyInfo()

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-secondary">Let's</span>
            <span className="text-primary"> Talk</span>
          </h2>
          <p className="section-subtitle">
            Ready to start your next project? Get in touch with our team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                {companyInfo?.metadata.phone && (
                  <div className="flex items-center space-x-3">
                    <span className="text-primary text-xl">📞</span>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">{companyInfo.metadata.phone}</p>
                    </div>
                  </div>
                )}
                
                {companyInfo?.metadata.email && (
                  <div className="flex items-center space-x-3">
                    <span className="text-primary text-xl">✉️</span>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">{companyInfo.metadata.email}</p>
                    </div>
                  </div>
                )}
                
                {companyInfo?.metadata.primary_location && (
                  <div className="flex items-center space-x-3">
                    <span className="text-primary text-xl">📍</span>
                    <div>
                      <p className="font-medium">Primary Location</p>
                      <p className="text-gray-600">{companyInfo.metadata.primary_location}</p>
                    </div>
                  </div>
                )}
                
                {companyInfo?.metadata.secondary_location && (
                  <div className="flex items-center space-x-3">
                    <span className="text-primary text-xl">📍</span>
                    <div>
                      <p className="font-medium">Secondary Location</p>
                      <p className="text-gray-600">{companyInfo.metadata.secondary_location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your company"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}