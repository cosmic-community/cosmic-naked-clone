import { createBucketClient } from '@cosmicjs/sdk'
import { 
  CompanyInfo, 
  TeamMember, 
  PortfolioProject, 
  Service, 
  ProcessStep, 
  NewsArticle,
  CosmicResponse 
} from '@/types'

// Create Cosmic client with staging environment
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging' // Set to staging as requested
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get company information
export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'company-info',
        slug: 'naked-development'
      })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as CompanyInfo
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch company information')
  }
}

// Get all team members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'team-members'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const members = response.objects as TeamMember[]
    return members.sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch team members')
  }
}

// Get all portfolio projects
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'portfolio-projects'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as PortfolioProject[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch portfolio projects')
  }
}

// Get featured portfolio projects
export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'portfolio-projects',
        'metadata.featured': true
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as PortfolioProject[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured projects')
  }
}

// Get all services
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'services'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const services = response.objects as Service[]
    return services.sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch services')
  }
}

// Get all process steps
export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'process-steps'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const steps = response.objects as ProcessStep[]
    return steps.sort((a, b) => (a.metadata.order || 0) - (b.metadata.order || 0))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch process steps')
  }
}

// Get all news articles
export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'news-articles'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const articles = response.objects as NewsArticle[]
    return articles.sort((a, b) => 
      new Date(b.metadata.published_date).getTime() - 
      new Date(a.metadata.published_date).getTime()
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch news articles')
  }
}

// Get single news article by slug
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'news-articles',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as NewsArticle
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch news article')
  }
}

// Get single portfolio project by slug
export async function getPortfolioProject(slug: string): Promise<PortfolioProject | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'portfolio-projects',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as PortfolioProject
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch portfolio project')
  }
}

// Get single team member by slug
export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'team-members',
        slug: slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as TeamMember
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch team member')
  }
}