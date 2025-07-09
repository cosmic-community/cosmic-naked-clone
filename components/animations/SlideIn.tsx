'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SlideInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'left' | 'right' | 'up' | 'down'
  distance?: number
  className?: string
}

export default function SlideIn({ 
  children, 
  delay = 0, 
  duration = 0.8, 
  direction = 'left',
  distance = 50,
  className = ''
}: SlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, opacity: 0 }
      case 'right':
        return { x: distance, opacity: 0 }
      case 'up':
        return { y: -distance, opacity: 0 }
      case 'down':
        return { y: distance, opacity: 0 }
      default:
        return { x: -distance, opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      default:
        return { x: 0, opacity: 1 }
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