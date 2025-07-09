import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  dot?: boolean
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    rounded = false,
    dot = false,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200'
    
    const variantClasses = {
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      primary: 'bg-primary text-white hover:bg-primary/90',
      secondary: 'bg-secondary text-white hover:bg-secondary/90',
      success: 'bg-green-100 text-green-800 hover:bg-green-200',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      error: 'bg-red-100 text-red-800 hover:bg-red-200',
      outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
    }
    
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    }

    const shapeClasses = rounded ? 'rounded-full' : 'rounded-md'

    const dotClasses = dot ? 'w-2 h-2 p-0' : ''

    return (
      <span
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          shapeClasses,
          dotClasses,
          className
        )}
        ref={ref}
        {...props}
      >
        {dot ? null : children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }