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

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function Stats({ companyInfo }: StatsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  if (!companyInfo?.metadata.stats) {
    return null
  }

  const stats: StatItem[] = [
    {
      value: companyInfo.metadata.stats.app_downloads || '0',
      label: 'App Downloads',
    },
    {
      value: companyInfo.metadata.stats.funds_raised || '0',
      label: 'Funds Raised',
    },
    {
      value: companyInfo.metadata.stats.cups_of_coffee || '0',
      label: 'Cups of Coffee',
    },
    {
      value: companyInfo.metadata.stats.high_fives || '0',
      label: 'High Fives',
    },
    {
      value: companyInfo.metadata.stats.apps_launched || '0',
      label: 'Apps Launched',
    },
  ]

  // Parse numeric values and extract prefixes/suffixes
  const parseStatValue = (value: string): { number: number; prefix: string; suffix: string } => {
    // Handle different formats like "1.37M", "$2.965M", "4,679", "12B", etc.
    const match = value.match(/^([^0-9]*)([\d.,]+)([^0-9]*)$/)
    
    if (match) {
      const [, prefix, numberPart, suffix] = match
      
      // Convert values like "1.37M" to actual numbers
      let multiplier = 1
      let cleanSuffix = suffix
      
      if (suffix.includes('M')) {
        multiplier = 1000000
        cleanSuffix = suffix.replace('M', '')
      } else if (suffix.includes('B')) {
        multiplier = 1000000000
        cleanSuffix = suffix.replace('B', '')
      } else if (suffix.includes('K')) {
        multiplier = 1000
        cleanSuffix = suffix.replace('K', '')
      }
      
      const number = parseFloat(numberPart.replace(/,/g, '')) * multiplier
      
      return {
        number: Math.round(number),
        prefix: prefix || '',
        suffix: cleanSuffix || ''
      }
    }
    
    // Fallback for simple numbers
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0
    return {
      number: numericValue,
      prefix: '',
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