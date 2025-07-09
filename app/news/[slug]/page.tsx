// app/news/[slug]/page.tsx
import { getNewsArticleBySlug } from '@/lib/cosmic'
import { generatePageMetadata } from '@/components/SEO'
import { notFound } from 'next/navigation'

export const revalidate = 10

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)
  
  if (!article) {
    return {}
  }

  return await generatePageMetadata({
    path: `/news/${slug}`,
    overrides: {
      title: article.metadata.title || article.title,
      description: article.metadata.content.replace(/<[^>]*>/g, '').substring(0, 160),
      ogImage: article.metadata.featured_image?.imgix_url
    }
  })
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {article.metadata.category && (
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                {article.metadata.category.value}
              </span>
            )}
            <span className="text-gray-500">
              {new Date(article.metadata.published_date).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.metadata.title || article.title}
          </h1>
          {article.metadata.featured_image && (
            <img
              src={`${article.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={article.metadata.title || article.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.metadata.content }}
        />
      </div>
    </div>
  )
}