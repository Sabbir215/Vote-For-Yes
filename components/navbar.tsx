'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from './ui/button'
import { LanguageSwitcher } from './language-switcher'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/blog', label: t('blog') },
    { href: '/media', label: t('media') },
    { href: '/forum', label: t('forum') },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              {locale === 'bn' ? 'হ্যাঁ ভোট' : 'YES VOTE'}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />
            <Link href="/volunteer">
              <Button className="hidden md:inline-flex bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700">
                {t('volunteer')}
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/volunteer" className="block px-4 py-2">
              <Button className="w-full bg-gradient-to-r from-green-600 to-red-600">
                {t('volunteer')}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
