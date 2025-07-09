export interface Service {
  id: string
  title: string
  slug: string
  metadata: {
    service_name: string
    icon: string
    description: string
    order: number
  }
}

export interface ProcessStep {
  id: string
  title: string
  slug: string
  metadata: {
    step_name: string
    step_number: number
    icon: string
    description: string
    order: number
  }
}

export interface TeamMember {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    job_title: string
    position: string
    bio: string
    location?: string
    photo?: {
      url: string
      imgix_url: string
    }
    image: {
      url: string
      imgix_url: string
    }
    order: number
  }
}

export interface PortfolioProject {
  id: string
  title: string
  slug: string
  metadata: {
    project_name: string
    client: string
    description: string
    industry: string
    featured: boolean
    project_image: {
      url: string
      imgix_url: string
    }
    gallery: Array<{
      url: string
      imgix_url: string
    }>
  }
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  metadata: {
    title: string
    excerpt: string
    published_date: string
    author: string
    category?: {
      value: string
    }
    featured_image: {
      url: string
      imgix_url: string
    }
    content: string
  }
}

export interface MediaImage {
  name: string
  url: string
  imgix_url: string
}