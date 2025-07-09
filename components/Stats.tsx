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
}

function CountUp({ end, duration = 2, inView }: CountUpProps) {
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

  return <span>{count.toLocaleString()}</span>
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

  // Parse numeric values from strings (remove commas and convert to numbers)
  const parseNumericValue = (value: string): number => {
    const numericValue = value.replace(/[^0-9]/g, '')
    return parseInt(numericValue) || 0
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8" ref={ref}>
          {stats.map((stat, index) => {
            const numericValue = parseNumericValue(stat.value)
            const hasNonNumericChars = stat.value.replace(/[0-9,]/g, '')
            
            return (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  {numericValue > 0 ? (
                    <>
                      {hasNonNumericChars}
                      <CountUp end={numericValue} inView={isInView} />
                    </>
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