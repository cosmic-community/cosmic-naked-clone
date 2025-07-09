'use client'

import { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface StatsProps {
  companyInfo: any
}

interface StatItem {
  value: string
  label: string
}

interface CountUpProps {
  end: number
  duration?: number
  inView: boolean
  prefix?: string
  suffix?: string
}

function CountUp({ end, duration = 2, inView, prefix = '', suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, inView])

  // Format the count with shorthand notation
  const formatCount = (num: number): string => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num.toLocaleString()
  }

  return <span>{prefix}{formatCount(count)}{suffix}</span>
}

export default function Stats({ companyInfo }: StatsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (!companyInfo?.metadata.stats) {
    return null
  }

  // Convert the large numbers to their actual values for animation
  const stats: StatItem[] = [
    {
      value: '3700000', // 3.7M
      label: 'App Downloads',
    },
    {
      value: '96500000', // $96.5M
      label: 'Funds Raised',
    },
    {
      value: '4679', // 4,679
      label: 'Cups of Coffee',
    },
    {
      value: '1200000000', // 1.2B
      label: 'High Fives',
    },
    {
      value: '327', // 327
      label: 'Apps Launched',
    },
  ]

  // Parse numeric values and extract prefixes/suffixes
  const parseStatValue = (value: string): { number: number; prefix: string; suffix: string } => {
    const numericValue = parseFloat(value) || 0
    
    // Check if this is the funds raised stat to add $ prefix
    const isFundsRaised = value === '96500000'
    
    return {
      number: numericValue,
      prefix: isFundsRaised ? '$' : '',
      suffix: ''
    }
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8" ref={ref}>
          {stats.map((stat, index) => {
            const { number, prefix, suffix } = parseStatValue(stat.value)
            
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  {number > 0 ? (
                    <CountUp 
                      end={number} 
                      inView={isInView} 
                      prefix={prefix}
                      suffix={suffix}
                    />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}