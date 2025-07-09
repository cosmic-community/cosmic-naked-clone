import { getNewsArticles } from '@/lib/cosmic'
import { NewsArticle } from '@/types'
import Link from 'next/link'

export default async function News() {
  const articles = await getNewsArticles()

  return (
    <section id="news" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-secondary">Latest</span>
            <span className="text-primary"> News</span>
          </h2>
          <p className="section-subtitle">
            Stay up to date with our latest insights and company updates
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.slice(0, 4).map((article: NewsArticle, index: number) => (
            <Link 
              key={article.id} 
              href={`/news/${article.slug}`}
              className="card block hover:shadow-xl transition-shadow duration-300"
            >
              {article.metadata.featured_image && (
                <img
                  src={`${article.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
                  alt={article.metadata.title || article.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <div className="space-y-4">
                {article.metadata.category && (
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    {article.metadata.category.value}
                  </span>
                )}
                
                <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                  {article.metadata.title || article.title}
                </h3>
                
                <div 
                  className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: article.metadata.content }}
                />
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {new Date(article.metadata.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-primary font-medium">Read more →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}