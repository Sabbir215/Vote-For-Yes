import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'ব্লগ - জুলাই সনদের পক্ষে | Blog - YES Vote',
  description: 'জুলাই সনদ সম্পর্কে বিস্তারিত জানুন। পড়ুন আমাদের নিবন্ধ এবং মতামত।',
};

export default async function BlogPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'bn';
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching blog posts:', error);
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
            {locale === 'bn' ? 'জুলাই সনদ ব্লগ' : 'July Charter Blog'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {locale === 'bn'
              ? 'জুলাই বিপ্লব, শহীদদের স্বপ্ন এবং নতুন বাংলাদেশ সম্পর্কে পড়ুন'
              : 'Read about the July Revolution, martyrs\' dreams, and the new Bangladesh'}
          </p>
        </div>

        {/* Featured Posts */}
        {posts && posts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'bn' ? 'বিশেষ নিবন্ধ' : 'Featured Articles'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {posts
                .filter((post) => post.featured)
                .slice(0, 2)
                .map((post) => (
                  <Card key={post.id} className="overflow-hidden group hover:shadow-xl transition-all">
                    <div className="aspect-video bg-gradient-to-br from-green-600 to-red-600 relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <Badge className="absolute top-4 left-4 bg-white text-green-700">
                        {locale === 'bn' ? 'বিশেষ' : 'Featured'}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.slice(0, 3).map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {locale === 'bn' ? post.title_bn : post.title_en}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {locale === 'bn' ? post.excerpt_bn : post.excerpt_en}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.published_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.view_count || 0}
                          </span>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="gap-2">
                            {locale === 'bn' ? 'পড়ুন' : 'Read'}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {locale === 'bn' ? 'সকল নিবন্ধ' : 'All Articles'}
          </h2>
          {posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {posts
                .filter((post) => !post.featured)
                .map((post) => (
                  <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-all">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800" />
                    <div className="p-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags?.slice(0, 2).map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {locale === 'bn' ? post.title_bn : post.title_en}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {locale === 'bn' ? post.excerpt_bn : post.excerpt_en}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.published_at)}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {post.view_count || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {post.like_count || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                {locale === 'bn' ? 'কোনো নিবন্ধ পাওয়া যায়নি' : 'No articles found'}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
