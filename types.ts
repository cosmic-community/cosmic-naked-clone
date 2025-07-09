// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
}

// Company Info object type
export interface CompanyInfo extends CosmicObject {
  type_slug: 'company-info';
  metadata: {
    company_name: string;
    tagline: string;
    description: string;
    phone?: string;
    email?: string;
    primary_location?: string;
    secondary_location?: string;
    stats?: {
      app_downloads?: string;
      funds_raised?: string;
      cups_of_coffee?: string;
      high_fives?: string;
      apps_launched?: string;
    };
  };
}

// Team Member object type
export interface TeamMember extends CosmicObject {
  type_slug: 'team-members';
  metadata: {
    name: string;
    job_title: string;
    bio: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    location?: string;
    order?: number;
  };
}

// Portfolio Project object type
export interface PortfolioProject extends CosmicObject {
  type_slug: 'portfolio-projects';
  metadata: {
    project_name: string;
    client?: string;
    description: string;
    project_image?: {
      url: string;
      imgix_url: string;
    };
    industry?: string;
    featured?: boolean;
  };
}

// Service object type
export interface Service extends CosmicObject {
  type_slug: 'services';
  metadata: {
    service_name: string;
    description: string;
    icon?: string;
    order?: number;
  };
}

// Process Step object type
export interface ProcessStep extends CosmicObject {
  type_slug: 'process-steps';
  metadata: {
    step_name: string;
    description: string;
    icon?: string;
    order: number;
  };
}

// News Article object type
export interface NewsArticle extends CosmicObject {
  type_slug: 'news-articles';
  metadata: {
    title: string;
    content: string;
    category?: {
      key: string;
      value: string;
    };
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    published_date: string;
  };
}

// Category types for news articles
export type NewsCategory = 'news' | 'awards' | 'podcast' | 'design' | 'funding' | 'rants';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isCompanyInfo(obj: CosmicObject): obj is CompanyInfo {
  return obj.type_slug === 'company-info';
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type_slug === 'team-members';
}

export function isPortfolioProject(obj: CosmicObject): obj is PortfolioProject {
  return obj.type_slug === 'portfolio-projects';
}

export function isService(obj: CosmicObject): obj is Service {
  return obj.type_slug === 'services';
}

export function isProcessStep(obj: CosmicObject): obj is ProcessStep {
  return obj.type_slug === 'process-steps';
}

export function isNewsArticle(obj: CosmicObject): obj is NewsArticle {
  return obj.type_slug === 'news-articles';
}