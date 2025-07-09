export interface CosmicObject {
  id: string
  slug: string
  title: string
  metadata: Record<string, any>
}

export interface CompanyInfo extends CosmicObject {
  metadata: {
    company_name: string
    tagline: string
    description: string
    phone?: string
    email?: string
    primary_location?: string
    secondary_location?: string
    stats?: {
      app_downloads?: string
      funds_raised?: string
      cups_of_coffee?: string
      high_fives?: string
      apps_launched?: string
    }
  }
}

export interface Service extends CosmicObject {
  metadata: {
    service_name: string
    description: string
    icon?: string
    order?: number
  }
}

export interface ProcessStep extends CosmicObject {
  metadata: {
    step_name: string
    description: string
    icon?: string
    order: number
  }
}

export interface TeamMember extends CosmicObject {
  metadata: {
    name: string
    job_title: string
    bio: string
    photo?: {
      url: string
      imgix_url: string
    }
    email?: string
    location?: string
    order?: number
  }
}

export interface PortfolioProject extends CosmicObject {
  metadata: {
    project_name: string
    client?: string
    description: string
    project_image?: {
      url: string
      imgix_url: string
    }
    industry?: string
    featured: boolean
  }
}

export interface NewsArticle extends CosmicObject {
  metadata: {
    title: string
    content: string
    category: {
      key: string
      value: string
    }
    featured_image?: {
      url: string
      imgix_url: string
    }
    published_date: string
  }
}

export interface SEOSettings extends CosmicObject {
  metadata: {
    site_title: string
    site_description: string
    site_url: string
    default_keywords?: string
    default_og_image?: {
      url: string
      imgix_url: string
    }
    twitter_handle?: string
    facebook_app_id?: string
    google_analytics_id?: string
    robots_meta: string
  }
}

export interface PageSEO extends CosmicObject {
  metadata: {
    page_name: string
    page_path: string
    seo_title: string
    seo_description: string
    keywords?: string
    og_image?: {
      url: string
      imgix_url: string
    }
    canonical_url?: string
    robots_meta_override?: string
  }
}