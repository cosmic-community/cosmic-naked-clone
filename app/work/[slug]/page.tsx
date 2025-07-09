// app/work/[slug]/page.tsx
import { getProjectBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  
  try {
    const project = await getProjectBySlug(slug)
    
    if (!project) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-secondary mb-4">
                {project.metadata.project_name}
              </h1>
              {project.metadata.client && (
                <p className="text-xl text-gray-600 mb-6">
                  {project.metadata.client}
                </p>
              )}
              {project.metadata.industry && (
                <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                  {project.metadata.industry}
                </span>
              )}
            </div>

            {/* Featured Image */}
            {project.metadata.project_image && (
              <div className="mb-12">
                <img
                  src={`${project.metadata.project_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                  alt={project.metadata.project_name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-secondary mb-6">About This Project</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {project.metadata.description}
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
              <a
                href="/#portfolio"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                ← Back to Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading project:', error)
    notFound()
  }
}