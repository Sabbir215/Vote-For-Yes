'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slogans = [
  "দেশ আর এভাবে চলতে পারে না, পরিবর্তনের জন্যে হ্যাঁ বলুন",
  "গণভোটে হ্যাঁ যারা, পরিবর্তনের পক্ষে তারা",
  "তারুণ্যের প্রথম ভোট গণভোটের পক্ষে হোক",
  "Change is necessary, not a choice. Say Yes to the July Charter",
  "পরিবর্তন অপরিহার্য, কোনও মর্জি নয়। জুলাই সনদকে হ্যাঁ বলুন",
  "ভবিষ্যৎকে সুরক্ষিত করতে বলুন—হ্যাঁ",
  "গণতন্ত্রকে শক্তিশালী করতে দিন—হ্যাঁ ভোট দিন",
  "ন্যায় ও নীতির পথে এগোতে বলুন—হ্যাঁ",
  "স্বচ্ছ রাজনীতির জন্য সাহসী হোন—হ্যাঁ বলুন",
  "দায়বদ্ধতার নতুন যুগ শুরু করতে—হ্যাঁ ভোট দিন",
  "অন্যায়ের বিরুদ্ধে দাঁড়াতে—হ্যাঁ বলুন",
  "সঠিক সিদ্ধান্তের পথে হাঁটতে—হ্যাঁ",
  "আগামী প্রজন্মের ভবিষ্যৎ রক্ষা করতে—হ্যাঁ ভোট দিন",
  "দেশকে এগিয়ে নিতে—হ্যাঁ বলুন",
  "বিভেদের রাজনীতি ছাড়তে—হ্যাঁ বলুন",
  "উন্নতির দরজা খুলতে—হ্যাঁ ভোট দিন",
  "শান্তি ও স্থিতিশীলতার জন্য—হ্যাঁ",
  "সত্যের পক্ষে দাঁড়াতে—হ্যাঁ বলুন",
  "নতুন সম্ভাবনার পথ খুলতে—হ্যাঁ",
  "দায়িত্বশীল সিদ্ধান্তের জন্য বলুন—হ্যাঁ",
  "সচেতন নাগরিক হিসেবে বলুন—হ্যাঁ",
  "Vote YES for July Charter",
  "Build a New Bangladesh",
  "জুলাই সনদে হ্যাঁ",
  "নতুন বাংলাদেশ গড়ুন",
]

interface FloatingSloganProps {
  count?: number
  className?: string
}

interface SloganData {
  text: string
  id: string
  randomX: number
  randomY: number
  randomDuration: number
  randomDelay: number
  randomRotate: number
  randomOpacity: number
}

export function FloatingSlogans({ count = 30, className = '' }: FloatingSloganProps) {
  const [displaySlogans, setDisplaySlogans] = useState<SloganData[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Generate random positions and slogans
    const randomSlogans = Array.from({ length: count }, (_, i) => ({
      text: slogans[Math.floor(Math.random() * slogans.length)],
      id: `slogan-${i}`,
      randomX: Math.random() * 100,
      randomY: Math.random() * 100,
      randomDuration: 15 + Math.random() * 20,
      randomDelay: Math.random() * 5,
      randomRotate: (Math.random() - 0.5) * 15,
      randomOpacity: 0.05 + Math.random() * 0.1,
    }))
    setDisplaySlogans(randomSlogans)
  }, [count])

  if (!mounted) return null

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      <AnimatePresence>
        {displaySlogans.map((slogan) => (
          <motion.div
            key={slogan.id}
            initial={{
              x: `${slogan.randomX}vw`,
              y: `${slogan.randomY}vh`,
              opacity: 0,
              rotate: slogan.randomRotate,
            }}
            animate={{
              x: [`${slogan.randomX}vw`, `${(slogan.randomX + 20) % 100}vw`],
              y: [`${slogan.randomY}vh`, `${(slogan.randomY - 30 + 100) % 100}vh`],
              opacity: [0, slogan.randomOpacity, slogan.randomOpacity, 0],
              rotate: [slogan.randomRotate, slogan.randomRotate + 5],
            }}
            transition={{
              duration: slogan.randomDuration,
              delay: slogan.randomDelay,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear',
            }}
            className="absolute whitespace-nowrap text-sm md:text-base lg:text-lg font-bold text-gray-900 dark:text-gray-100 select-none"
            style={{
              textShadow: '0 0 10px rgba(255,255,255,0.3)',
            }}
          >
            {slogan.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
