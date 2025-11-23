import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { MediaGrid } from '@/components/media-grid';
import { MediaUpload } from '@/components/media-upload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'মিডিয়া গ্যালারি - জুলাই সনদ | Media Gallery',
  description: 'জুলাই বিপ্লবের ছবি, ভিডিও এবং শহীদদের স্মৃতি। July Revolution photos, videos, and martyrs memorial.',
};

export default async function MediaPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'bn';
  const supabase = await createClient();

  const { data: media, error } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error fetching media:', error);
  }

  const categories = [
    { id: 'all', label: locale === 'bn' ? 'সব' : 'All' },
    { id: 'martyrs', label: locale === 'bn' ? 'শহীদদের' : 'Martyrs' },
    { id: 'protests', label: locale === 'bn' ? 'আন্দোলন' : 'Protests' },
    { id: 'youth', label: locale === 'bn' ? 'তারুণ্য' : 'Youth' },
    { id: 'campaign', label: locale === 'bn' ? 'প্রচারণা' : 'Campaign' },
    { id: 'general', label: locale === 'bn' ? 'সাধারণ' : 'General' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            {locale === 'bn' ? 'মিডিয়া গ্যালারি' : 'Media Gallery'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {locale === 'bn'
              ? 'জুলাই বিপ্লবের স্মৃতি, শহীদদের আত্মত্যাগ এবং আমাদের আন্দোলনের মুহূর্তসমূহ'
              : 'Memories of July Revolution, martyrs\' sacrifice, and moments from our movement'}
          </p>
        </div>

        {/* Upload Section (only for logged in volunteers) */}
        {/* <MediaUpload locale={locale} /> */}

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto mb-8">
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <MediaGrid
                media={
                  cat.id === 'all'
                    ? media || []
                    : (media || []).filter((m) => m.category === cat.id)
                }
                locale={locale}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Empty State */}
        {(!media || media.length === 0) && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {locale === 'bn' ? 'কোনো মিডিয়া পাওয়া যায়নি' : 'No media found'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {locale === 'bn'
                ? 'শীঘ্রই ছবি এবং ভিডিও যুক্ত করা হবে'
                : 'Photos and videos will be added soon'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
