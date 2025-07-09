'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  direction = 'up',
  className = ''
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 30, opacity: 0 }
      case 'down':
        return { y: -30, opacity: 0 }
      case 'left':
        return { x: -30, opacity: 0 }
      case 'right':
        return { x: 30, opacity: 0 }
      default:
        return { y: 30, opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getFinalPosition()}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.25, 0.25, 0.75] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}