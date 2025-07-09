export default function ClientLogos() {
  const clients = [
    'Quiksilver',
    'UPS',
    'Bank of America',
    'Jim Henson',
    'Henkel',
    'PGA',
    'American Red Cross',
    'Transamerica',
    'Experian'
  ]

  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-300">
            We've had the privilege of working with some amazing companies
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-8 items-center">
          {clients.map((client, index) => (
            <div key={index} className="text-center">
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                {client}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}