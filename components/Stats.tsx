import { getCompanyInfo } from '@/lib/cosmic'

export default async function Stats() {
  const companyInfo = await getCompanyInfo()

  if (!companyInfo?.metadata.stats) {
    return null
  }

  const stats = [
    {
      value: companyInfo.metadata.stats.app_downloads || '0',
      label: 'App Downloads',
    },
    {
      value: companyInfo.metadata.stats.funds_raised || '0',
      label: 'Funds Raised',
    },
    {
      value: companyInfo.metadata.stats.cups_of_coffee || '0',
      label: 'Cups of Coffee',
    },
    {
      value: companyInfo.metadata.stats.high_fives || '0',
      label: 'High Fives',
    },
    {
      value: companyInfo.metadata.stats.apps_launched || '0',
      label: 'Apps Launched',
    },
  ]

  return (
    <section className="py-16 bg-gray-100">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}