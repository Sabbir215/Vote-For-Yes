'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Share2, Home, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function VolunteerSuccessPage() {
  const t = useTranslations('volunteer.success');

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent(t('shareTitle'));
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent(t('shareTitle'));
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      '_blank',
      'width=600,height=400'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8 md:p-12 text-center shadow-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-green-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8"
          >
            {t('message')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">{t('shareMessage')}</h2>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={shareOnFacebook}
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Button>
                <Button onClick={shareOnTwitter} className="gap-2 bg-sky-500 hover:bg-sky-600">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
              </div>
            </div>

            <Link href="/">
              <Button variant="outline" className="w-full gap-2 mt-6">
                <Home className="w-4 h-4" />
                {t('backHome')}
              </Button>
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
