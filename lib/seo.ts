import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  author?: string;
  tags?: string[];
  locale?: string;
}

export function generateSEO({
  title = 'হ্যাঁ ভোট - জুলাই সনদের পক্ষে | YES Vote for July Charter',
  description = 'জুলাই সনদের পক্ষে হ্যাঁ ভোট দিন। শহীদদের স্বপ্ন বাস্তবায়ন করুন। নতুন বাংলাদেশ গড়ুন। Vote YES for July Charter and honor the martyrs who sacrificed for a New Bangladesh.',
  image = '/og-image.jpg',
  type = 'website',
  publishedTime,
  author,
  tags,
  locale = 'bn_BD',
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vote-yes-bd.vercel.app';
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
      languages: {
        'bn-BD': '/bn',
        'en-US': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: 'হ্যাঁ ভোট - YES Vote',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
      ...(type === 'article' && publishedTime && {
        publishedTime,
        authors: author ? [author] : undefined,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@VoteYesBD',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    keywords: [
      'জুলাই সনদ',
      'হ্যাঁ ভোট',
      'গণঅভ্যুত্থান',
      'নতুন বাংলাদেশ',
      'শহীদ',
      'July Charter',
      'YES Vote',
      'Bangladesh',
      'Charter Referendum',
      'Student Movement',
      'New Bangladesh',
      'Martyrs',
      ...(tags || []),
    ],
  };

  return metadata;
}

export function generateArticleSchema({
  title,
  description,
  image,
  publishedTime,
  modifiedTime,
  author = 'হ্যাঁ ভোট টিম',
  tags = [],
  url,
}: {
  title: string;
  description: string;
  image: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  url: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vote-yes-bd.vercel.app';
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Organization',
      name: author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'হ্যাঁ ভোট - YES Vote',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: tags.join(', '),
  };
}

export function generateEventSchema({
  name,
  description,
  startDate,
  endDate,
  location = 'Bangladesh',
  image,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  image?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vote-yes-bd.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BD',
      },
    },
    image: image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : undefined,
    organizer: {
      '@type': 'Organization',
      name: 'হ্যাঁ ভোট - YES Vote',
      url: baseUrl,
    },
  };
}

export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vote-yes-bd.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'হ্যাঁ ভোট - YES Vote',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      'জুলাই সনদের পক্ষে হ্যাঁ ভোট দিন। শহীদদের স্বপ্ন বাস্তবায়ন করুন। নতুন বাংলাদেশ গড়ুন।',
    sameAs: [
      'https://facebook.com/VoteYesBD',
      'https://twitter.com/VoteYesBD',
      'https://instagram.com/VoteYesBD',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@voteyesbd.org',
    },
  };
}
