import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/
  return phoneRegex.test(phone)
}

export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`
}

export function parseJson<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T
  } catch {
    return fallback
  }
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export function formatNumber(
  number: number,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale).format(number)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getContrastColor(hexColor: string): string {
  // Remove # if present and ensure we have a valid hex color
  const cleanHex = hexColor.replace('#', '')
  if (cleanHex.length !== 6) return '#000000'
  
  // Use regex to extract RGB components and add proper null checks
  const match = cleanHex.match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match || match.length < 4) return '#000000'
  
  // Safely extract the matched groups with null checks
  const redHex = match[1]
  const greenHex = match[2]
  const blueHex = match[3]
  
  if (!redHex || !greenHex || !blueHex) return '#000000'
  
  const r = parseInt(redHex, 16)
  const g = parseInt(greenHex, 16)
  const b = parseInt(blueHex, 16)
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  
  return brightness > 128 ? '#000000' : '#FFFFFF'
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result || result.length < 4) return null
  
  const redHex = result[1]
  const greenHex = result[2]
  const blueHex = result[3]
  
  if (!redHex || !greenHex || !blueHex) return null
  
  return {
    r: parseInt(redHex, 16),
    g: parseInt(greenHex, 16),
    b: parseInt(blueHex, 16)
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomChoice<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined
  return array[Math.floor(Math.random() * array.length)]
}

export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export function flatten<T>(arrays: T[][]): T[] {
  return arrays.reduce((flat, arr) => flat.concat(arr), [])
}

export function sortBy<T>(
  array: T[],
  key: keyof T | ((item: T) => any),
  order: 'asc' | 'desc' = 'asc'
): T[] {
  const getValue = typeof key === 'function' ? key : (item: T) => item[key]
  
  return [...array].sort((a, b) => {
    const aVal = getValue(a)
    const bVal = getValue(b)
    
    if (order === 'desc') {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
    }
    
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
  })
}

export function filterBy<T>(
  array: T[],
  key: keyof T,
  value: any
): T[] {
  return array.filter(item => item[key] === value)
}

export function findBy<T>(
  array: T[],
  key: keyof T,
  value: any
): T | undefined {
  return array.find(item => item[key] === value)
}

export function updateBy<T>(
  array: T[],
  key: keyof T,
  value: any,
  update: Partial<T>
): T[] {
  return array.map(item => 
    item[key] === value ? { ...item, ...update } : item
  )
}

export function removeBy<T>(
  array: T[],
  key: keyof T,
  value: any
): T[] {
  return array.filter(item => item[key] !== value)
}