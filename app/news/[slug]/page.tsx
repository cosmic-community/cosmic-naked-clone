// app/news/[slug]/page.tsx
import { getNewsArticleBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'

interface NewsPageProps {
  params: Promise<{ slug: string }>
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params
  
  try {
    const article = await getNewsArticleBySlug(slug)
    
    if (!article) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="mb-4">
                {article.metadata.category && (
                  <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                    {article.metadata.category.value}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-secondary mb-6">
                {article.metadata.title}
              </h1>
              <p className="text-gray-600">
                {new Date(article.metadata.published_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Featured Image */}
            {article.metadata.featured_image && (
              <div className="mb-12">
                <img
                  src={`${article.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                  alt={article.metadata.title}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.metadata.content }}
                />
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
              <a
                href="/#news"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                ← Back to News
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading article:', error)
    notFound()
  }
}