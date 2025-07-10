import { getCompanyInfo } from '@/lib/cosmic'

export default async function Footer() {
  const companyInfo = await getCompanyInfo()

  return (
    <footer className="bg-secondary text-white py-8 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                N<span className="text-primary">A</span>KED
                <span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              {companyInfo?.metadata.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>App Development</li>
              <li>UI/UX Design</li>
              <li>Brand Strategy</li>
              <li>AI & Software Development</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>About Us</li>
              <li>Our Work</li>
              <li>Team</li>
              <li>News</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              {companyInfo?.metadata.phone && (
                <p>{companyInfo.metadata.phone}</p>
              )}
              {companyInfo?.metadata.email && (
                <p>{companyInfo.metadata.email}</p>
              )}
              {companyInfo?.metadata.primary_location && (
                <p>{companyInfo.metadata.primary_location}</p>
              )}
              {companyInfo?.metadata.secondary_location && (
                <p>{companyInfo.metadata.secondary_location}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-sm text-gray-400">
          <p>
            © 2024 {companyInfo?.metadata.company_name || 'Naked Development'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}