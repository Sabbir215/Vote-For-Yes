'use client'

import { Card } from './ui/card'
import { Shield, Users, BookOpen, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Shield,
      title: 'নতুন সংবিধান',
      titleEn: 'New Constitution',
      description: 'জুলাই সনদের মাধ্যমে নতুন গণতান্ত্রিক সংবিধান',
    },
    {
      icon: Users,
      title: 'জনগণের ক্ষমতা',
      titleEn: 'People\'s Power',
      description: 'সকল নাগরিকের সমান অধিকার ও প্রতিনিধিত্ব',
    },
    {
      icon: BookOpen,
      title: 'স্বচ্ছতা ও জবাবদিহিতা',
      titleEn: 'Transparency & Accountability',
      description: 'দুর্নীতিমুক্ত, স্বচ্ছ ও জবাবদিহিমূলক সরকার',
    },
    {
      icon: Heart,
      title: 'শহীদদের স্মৃতি',
      titleEn: 'Remember the Martyrs',
      description: 'জুলাই বিপ্লবের শহীদদের স্বপ্ন বাস্তবায়ন',
    },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            কেন হ্যাঁ বলবেন?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            জুলাই সনদ আমাদের স্বপ্নের নতুন বাংলাদেশের ভিত্তি
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-shadow duration-300 border-2 hover:border-green-500/50 group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-semibold text-gray-500">
                    {feature.titleEn}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
