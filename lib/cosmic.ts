import { createBucketClient } from '@cosmicjs/sdk'
import { Service, ProcessStep, TeamMember, PortfolioProject, NewsArticle } from '@/types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
})

export async function getCompanyInfo() {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'company-info' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects[0] || null
  } catch (error) {
    console.error('Error fetching company info:', error)
    return null
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects.sort((a: Service, b: Service) => (a.metadata.order || 0) - (b.metadata.order || 0))
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'process-steps' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects.sort((a: ProcessStep, b: ProcessStep) => (a.metadata.order || 0) - (b.metadata.order || 0))
  } catch (error) {
    console.error('Error fetching process steps:', error)
    return []
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects.sort((a: TeamMember, b: TeamMember) => (a.metadata.order || 0) - (b.metadata.order || 0))
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'portfolio-projects', 'metadata.featured': true })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'portfolio-projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return object
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'news-articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects.sort((a: NewsArticle, b: NewsArticle) => new Date(b.metadata.published_date).getTime() - new Date(a.metadata.published_date).getTime())
  } catch (error) {
    console.error('Error fetching news articles:', error)
    return []
  }
}

export async function getNewsArticleBySlug(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'news-articles', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return object
  } catch (error) {
    console.error('Error fetching news article by slug:', error)
    return null
  }
}