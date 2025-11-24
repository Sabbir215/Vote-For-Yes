import { useTranslations } from 'next-intl';
import { VolunteerForm } from '@/components/volunteer-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VolunteerPage() {
  const t = useTranslations('volunteer');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="outline" className="mb-8 gap-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-gray-300 dark:border-gray-600">
          <VolunteerForm />
        </div>
      </div>
    </div>
  );
}
