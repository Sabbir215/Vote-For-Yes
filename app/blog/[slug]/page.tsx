import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, Heart, Share2, Facebook, Twitter, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title_bn} - জুলাই সনদ ব্লগ`,
    description: post.excerpt_bn,
    openGraph: {
      title: post.title_bn,
      description: post.excerpt_bn,
      type: 'article',
      publishedTime: post.published_at,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'bn';
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    notFound();
  }

  // Increment view count
  await supabase
    .from('blog_posts')
    .update({ view_count: (post.view_count || 0) + 1 })
    .eq('id', post.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return locale === 'bn'
      ? date.toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = locale === 'bn' ? post.title_bn : post.title_en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            {locale === 'bn' ? 'ব্লগে ফিরে যান' : 'Back to Blog'}
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            {/* Hero Image */}
            <div className="aspect-video bg-gradient-to-br from-green-600 to-red-600 relative">
              <div className="absolute inset-0 bg-black/20" />
              {post.featured && (
                <Badge className="absolute top-4 left-4 bg-white text-green-700">
                  {locale === 'bn' ? 'বিশেষ' : 'Featured'}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {locale === 'bn' ? post.title_bn : post.title_en}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.published_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {post.view_count || 0} {locale === 'bn' ? 'দেখা হয়েছে' : 'views'}
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {post.like_count || 0}
                </span>
              </div>

              {/* Article Content */}
              <div
                className="prose prose-lg dark:prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{
                  __html: locale === 'bn' ? post.content_bn : post.content_en,
                }}
              />

              {/* Share Section */}
              <div className="pt-8 border-t">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    {locale === 'bn' ? 'শেয়ার করুন' : 'Share this article'}
                  </h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              window.location.href
                            )}`,
                            '_blank',
                            'width=600,height=400'
                          );
                        }
                      }}
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              window.location.href
                            )}&text=${encodeURIComponent(shareTitle)}`,
                            '_blank',
                            'width=600,height=400'
                          );
                        }
                      }}
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="mt-8 p-8 bg-gradient-to-r from-green-600 to-red-600 text-white">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">
                {locale === 'bn'
                  ? 'জুলাই সনদের পক্ষে আপনার সমর্থন দিন'
                  : 'Support the July Charter'}
              </h2>
              <p className="text-white/90">
                {locale === 'bn'
                  ? 'আমাদের স্বেচ্ছাসেবক দলে যোগ দিয়ে পরিবর্তনের অংশীদার হন'
                  : 'Join our volunteer team and be part of the change'}
              </p>
              <Link href="/volunteer">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  {locale === 'bn' ? 'স্বেচ্ছাসেবক হন' : 'Become a Volunteer'}
                </Button>
              </Link>
            </div>
          </Card>
        </article>
      </div>
    </div>
  );
}
