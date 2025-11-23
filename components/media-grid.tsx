'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Heart, Download, Share2, Eye, Calendar, X, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

interface Media {
  id: string;
  url: string;
  secure_url: string;
  title_bn?: string;
  title_en?: string;
  description_bn?: string;
  description_en?: string;
  alt_text_bn?: string;
  alt_text_en?: string;
  tags?: string[];
  category?: string;
  view_count?: number;
  like_count?: number;
  format?: string;
  created_at: string;
}

interface MediaGridProps {
  media: Media[];
  locale: string;
}

export function MediaGrid({ media, locale }: MediaGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [likedMedia, setLikedMedia] = useState<Set<string>>(new Set());

  const handleLike = (mediaId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMedia((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(mediaId)) {
        newSet.delete(mediaId);
      } else {
        newSet.add(mediaId);
      }
      return newSet;
    });
  };

  const handleDownload = async (media: Media, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(media.secure_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `july-charter-${media.id}.${media.format || 'jpg'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = (media: Media, platform: 'facebook' | 'twitter', e: React.MouseEvent) => {
    e.stopPropagation();
    const title = locale === 'bn' ? media.title_bn : media.title_en;
    const url = window.location.href;

    if (platform === 'facebook') {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        '_blank',
        'width=600,height=400'
      );
    } else {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
          title || 'July Charter Media'
        )}`,
        '_blank',
        'width=600,height=400'
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return locale === 'bn'
      ? date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (!media || media.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {media.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card
              className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setSelectedMedia(item)}
            >
              <div className="relative aspect-square bg-gray-200 dark:bg-gray-800">
                {item.format?.includes('video') || item.url.includes('.mp4') ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.secure_url || item.url}
                    alt={locale === 'bn' ? item.alt_text_bn || '' : item.alt_text_en || ''}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}

                {item.category && (
                  <Badge className="absolute top-2 left-2 bg-black/50 text-white backdrop-blur-sm">
                    {item.category}
                  </Badge>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-white hover:text-red-500 hover:bg-white/20"
                        onClick={(e) => handleLike(item.id, e)}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedMedia.has(item.id) ? 'fill-red-500 text-red-500' : ''
                          }`}
                        />
                        <span className="ml-1">{(item.like_count || 0) + (likedMedia.has(item.id) ? 1 : 0)}</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-white hover:bg-white/20"
                        onClick={(e) => handleDownload(item, e)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <h3 className="font-semibold line-clamp-1 mb-1">
                  {locale === 'bn' ? item.title_bn : item.title_en}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.view_count || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.created_at)}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Media Detail Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden">
          {selectedMedia && (
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image/Video Side */}
              <div className="relative aspect-square md:aspect-auto bg-black">
                {selectedMedia.format?.includes('video') || selectedMedia.url.includes('.mp4') ? (
                  <video
                    src={selectedMedia.secure_url || selectedMedia.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedMedia.secure_url || selectedMedia.url}
                    alt={
                      locale === 'bn' ? selectedMedia.alt_text_bn || '' : selectedMedia.alt_text_en || ''
                    }
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>

              {/* Info Side */}
              <div className="p-6 space-y-4 overflow-y-auto max-h-[80vh]">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {locale === 'bn' ? selectedMedia.title_bn : selectedMedia.title_en}
                    </h2>
                    {selectedMedia.category && (
                      <Badge variant="secondary">{selectedMedia.category}</Badge>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSelectedMedia(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-muted-foreground">
                  {locale === 'bn' ? selectedMedia.description_bn : selectedMedia.description_en}
                </p>

                {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedMedia.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {selectedMedia.view_count || 0} {locale === 'bn' ? 'দেখা হয়েছে' : 'views'}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    {(selectedMedia.like_count || 0) + (likedMedia.has(selectedMedia.id) ? 1 : 0)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedMedia.created_at)}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t">
                  <Button
                    className="w-full gap-2"
                    variant={likedMedia.has(selectedMedia.id) ? 'default' : 'outline'}
                    onClick={(e) => handleLike(selectedMedia.id, e)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedMedia.has(selectedMedia.id) ? 'fill-current' : ''
                      }`}
                    />
                    {likedMedia.has(selectedMedia.id)
                      ? locale === 'bn'
                        ? 'পছন্দ করা হয়েছে'
                        : 'Liked'
                      : locale === 'bn'
                      ? 'পছন্দ করুন'
                      : 'Like'}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="gap-2" onClick={(e) => handleDownload(selectedMedia, e)}>
                      <Download className="w-4 h-4" />
                      {locale === 'bn' ? 'ডাউনলোড' : 'Download'}
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={(e) => handleShare(selectedMedia, 'facebook', e)}
                    >
                      <Facebook className="w-4 h-4" />
                      {locale === 'bn' ? 'শেয়ার' : 'Share'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
