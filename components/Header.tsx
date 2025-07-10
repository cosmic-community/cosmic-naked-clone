'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'BADASS SKILLS', href: '#services' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'OUR WORK', href: '#portfolio' },
    { name: 'MEDIA', href: '#news' },
    { name: 'FOUNDER U', href: '#contact' },
    { name: "LET'S TALK", href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl font-bold text-secondary">
              N<span className="text-primary">A</span>KED
              <span className="text-primary">.</span>
            </span>
          </Link>

          {/* Contact Info - moved to center area */}
          <div className="hidden xl:flex items-center space-x-8 text-sm text-gray-600 flex-1 justify-center">
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span>949.214.4003</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✉️</span>
              <span>hi@nakeddev.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span>Irvine, CA</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span>Austin, TX</span>
            </div>
          </div>

          {/* Desktop Navigation - more spacing */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-shrink-0">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-900 hover:text-primary transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-gray-900 hover:text-primary hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Contact info in mobile menu */}
            <div className="xl:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 px-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>949.214.4003</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>hi@nakeddev.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Irvine, CA • Austin, TX</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}