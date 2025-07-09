# Naked Development Clone

A modern, responsive clone of the Naked Development website built with Next.js 15 and Tailwind CSS, powered by Cosmic CMS. This application showcases an award-winning app development agency's services, portfolio, team, and company information with a clean, professional design.

![Naked Development](https://imgix.cosmicjs.com/b34c6b20-5cf8-11f0-a051-23c10f41277a-photo-1559136555-9303baea8ebd-1752088366929.jpg?w=1200&h=400&fit=crop&auto=format,compress)

## Features

- **Modern Next.js 15 App Router** - Server-side rendering with streaming
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dynamic Content Management** - Powered by Cosmic CMS
- **Portfolio Showcase** - Interactive project gallery
- **Team Directory** - Meet the leadership team
- **News & Articles** - Latest company updates and insights
- **Services Overview** - Comprehensive service offerings
- **Process Timeline** - Visual development process steps
- **Company Statistics** - Real-time achievement metrics
- **Contact Integration** - Multiple contact methods
- **SEO Optimized** - Meta tags and structured data
- **TypeScript Support** - Full type safety
- **Performance Optimized** - Image optimization and lazy loading

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=naked-dev-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a clone of the https://nakeddev.com website"

### Code Generation Prompt

> Create a clone of the https://nakeddev.com website using Next.js. Set apiEnvironment: "staging" in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the cloned bucket

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd naked-development-clone
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Company Information
```typescript
import { cosmic } from '@/lib/cosmic'

const companyInfo = await cosmic.objects
  .findOne({
    type: 'company-info',
    slug: 'naked-development'
  })
  .props(['id', 'title', 'metadata'])
```

### Getting Team Members
```typescript
const teamMembers = await cosmic.objects
  .find({
    type: 'team-members'
  })
  .props(['id', 'title', 'metadata'])
  .sort('metadata.order')
```

### Fetching Portfolio Projects
```typescript
const projects = await cosmic.objects
  .find({
    type: 'portfolio-projects'
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with Cosmic CMS using the following object types:

- **Company Info** - Business details and statistics
- **Team Members** - Leadership team profiles
- **Portfolio Projects** - Showcase of work
- **Services** - Service offerings
- **Process Steps** - Development methodology
- **News & Articles** - Company updates and insights

The Cosmic SDK is configured to work with the staging environment and provides full TypeScript support for all content types.

## Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify
1. Build command: `bun run build`
2. Publish directory: `.next`
3. Add environment variables in Netlify dashboard

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

For production deployment, ensure all environment variables are properly configured in your hosting platform.

<!-- README_END -->