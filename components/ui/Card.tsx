import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, ...props }, ref) => {
    const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300'
    
    const variantClasses = {
      default: 'bg-white shadow-soft border border-gray-100',
      outlined: 'bg-white border-2 border-gray-200',
      elevated: 'bg-white shadow-medium',
      flat: 'bg-gray-50'
    }
    
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10'
    }

    const hoverClasses = hover ? 'hover:shadow-strong hover:scale-105' : ''

    return (
      <div
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          hoverClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding = 'md', ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-4 pb-2',
      md: 'p-6 pb-4',
      lg: 'p-8 pb-6'
    }

    return (
      <div
        className={cn(
          'border-b border-gray-100',
          paddingClasses[padding],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, padding = 'md', ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }

    return (
      <div
        className={cn(
          paddingClasses[padding],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

CardBody.displayName = 'CardBody'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding = 'md', ...props }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'p-4 pt-2',
      md: 'p-6 pt-4',
      lg: 'p-8 pt-6'
    }

    return (
      <div
        className={cn(
          'border-t border-gray-100',
          paddingClasses[padding],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardBody, CardFooter }