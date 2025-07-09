import { getProcessSteps } from '@/lib/cosmic'
import { ProcessStep } from '@/types'

export default async function Process() {
  const steps = await getProcessSteps()

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-secondary">A thoughtful</span>
            <span className="text-primary"> process</span>
            <span className="text-secondary">.</span>
          </h2>
          <p className="section-subtitle">
            Our strategy is simplicity. Yes, start lean and launch fast, but don't skip steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step: ProcessStep, index: number) => (
            <div key={step.id} className="text-center space-y-4">
              <div className="text-6xl mb-4">
                {step.metadata.icon || '🎯'}
              </div>
              <h3 className="text-xl font-bold text-secondary">
                {step.metadata.step_name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.metadata.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}