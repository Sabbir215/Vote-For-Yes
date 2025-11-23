import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'হ্যাঁ ভোট - জুলাই সনদের পক্ষে | YES Vote for July Charter',
    short_name: 'হ্যাঁ ভোট',
    description: 'জুলাই সনদের পক্ষে হ্যাঁ ভোট দিন। নতুন বাংলাদেশ গড়ুন। Vote YES for July Charter and build a New Bangladesh.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#16a34a',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['politics', 'news', 'social'],
    lang: 'bn',
    dir: 'ltr',
  };
}
