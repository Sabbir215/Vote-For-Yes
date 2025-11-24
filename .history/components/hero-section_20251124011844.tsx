'use client'

import { useTranslations } from 'next-intl'
import { Button } from './ui/button'
import { ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const featuredSlogans = [
  "গণভোটে হ্যাঁ যারা, পরিবর্তনের পক্ষে তারা",
  "Vote YES for July Charter",
  "শহীদদের রক্ত বৃথা যেতে দেব না",
  "Build a New Bangladesh",
  "জুলাই বিপ্লব জিন্দাবাদ",
  "Change is necessary, not a choice",
  "নতুন বাংলাদেশ গড়ুন",
  "We won't let martyrs' blood go in vain",
]

export function HeroSection() {
  const t = useTranslations('hero')
  const [currentSlogan, setCurrentSlogan] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % featuredSlogans.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Asset/Yes/Abu Sied.jpg"
          alt="July Revolution Hero"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-sm font-medium">জুলাই বিপ্লব | July Revolution 2024</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Featured Slogan Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="py-8"
          >
            <div className="relative h-24 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlogan}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-white to-red-400 px-4 text-center"
                  style={{
                    textShadow: '0 0 30px rgba(255,255,255,0.3)',
                  }}
                >
                  "{featuredSlogans[currentSlogan]}"
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Progress Indicators */}
            <div className="flex gap-2 justify-center mt-4">
              {featuredSlogans.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentSlogan 
                      ? 'w-8 bg-gradient-to-r from-green-500 to-red-500' 
                      : 'w-2 bg-white/30'
                  }`}
                  animate={{
                    scale: index === currentSlogan ? 1.2 : 1,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link href="/volunteer">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white font-bold text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 group"
              >
                {t('cta')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg px-8 py-6 rounded-full backdrop-blur-md"
              >
                {t('learnMore')}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
          >
            {[
              { label: 'শহীদ | Martyrs', value: '1000+' },
              { label: 'ভলান্টিয়ার | Volunteers', value: '10K+' },
              { label: 'নতুন ভবিষ্যৎ | New Future', value: '১' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
