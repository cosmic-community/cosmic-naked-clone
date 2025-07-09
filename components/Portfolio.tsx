import { getFeaturedProjects } from '@/lib/cosmic'
import { PortfolioProject } from '@/types'
import Link from 'next/link'

export default async function Portfolio() {
  const projects = await getFeaturedProjects()

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-secondary">Our</span>
            <span className="text-primary"> Work</span>
          </h2>
          <p className="section-subtitle">
            We've helped hundreds of startups and enterprises build amazing products
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project: PortfolioProject, index: number) => (
            <Link 
              key={project.id} 
              href={`/work/${project.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-lg block hover:shadow-xl transition-shadow duration-300"
            >
              {project.metadata.project_image && (
                <img
                  src={`${project.metadata.project_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={project.metadata.project_name}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">
                    {project.metadata.project_name}
                  </h3>
                  {project.metadata.client && (
                    <p className="text-gray-300 mb-2">
                      {project.metadata.client}
                    </p>
                  )}
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {project.metadata.description}
                  </p>
                  {project.metadata.industry && (
                    <div className="mt-2">
                      <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs">
                        {project.metadata.industry}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}