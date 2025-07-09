// app/work/[slug]/page.tsx
import { getProjectBySlug } from '@/lib/cosmic'
import { generatePageMetadata } from '@/components/SEO'
import { notFound } from 'next/navigation'

interface WorkPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  
  if (!project) {
    return {}
  }

  return await generatePageMetadata({
    path: `/work/${slug}`,
    overrides: {
      title: `${project.metadata.project_name} - Our Work - Naked Development`,
      description: project.metadata.description,
      ogImage: project.metadata.project_image?.imgix_url
    }
  })
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
              {project.metadata.industry || 'Project'}
            </span>
            {project.metadata.client && (
              <span className="text-gray-500">
                Client: {project.metadata.client}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {project.metadata.project_name}
          </h1>
          {project.metadata.project_image && (
            <img
              src={`${project.metadata.project_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={project.metadata.project_name}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p>{project.metadata.description}</p>
        </div>
      </div>
    </div>
  )
}