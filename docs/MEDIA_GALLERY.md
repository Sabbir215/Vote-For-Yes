# Media Gallery Guide

## Overview

The media gallery showcases campaign photos and videos with a beautiful, mobile-optimized interface including lightbox view, social sharing, and download capabilities.

## Features

### Gallery Page (`/media`)
- **Category Tabs**: Filter by Martyrs, Protests, Youth, Campaign, General
- **Grid Layout**: Responsive masonry-style grid
- **Hover Effects**: Like, download buttons on hover
- **View/Like Counts**: Real-time engagement metrics
- **Bilingual Support**: Bengali and English content

### Lightbox View
- **Full-Screen Display**: Click any image to view full-size
- **Video Support**: MP4 videos with controls
- **Detailed Info**: Title, description, tags, stats
- **Social Sharing**: Facebook, Twitter sharing
- **Download**: Direct download functionality

### Upload System (Volunteers Only)
- **File Upload**: Images and videos
- **Metadata**: Title, description, category, tags
- **Preview**: Real-time preview before upload
- **Cloudinary Integration**: Automatic optimization

## Media Seeding

### Prerequisites

1. **Cloudinary Account**: Sign up at cloudinary.com
2. **Environment Variables**:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```
3. **Campaign Assets**: Files in `Asset/Yes/` folder

### Running the Seeder

Upload all campaign assets:
```bash
npm run seed:media
```

This will:
1. Upload each file to Cloudinary with optimization
2. Create database records with bilingual metadata
3. Set featured flags and initial engagement metrics
4. Organize by categories

### Supported Formats

- **Images**: JPG, PNG, WEBP
- **Videos**: MP4

## Curated Assets

The seeder includes specific metadata for key campaign images:

1. **Abu Sied.jpg** - Martyr Abu Sayed (Featured)
2. **For Youth.png** - Youth-focused campaign (Featured)
3. **Sonod.jpg** - July Charter document (Featured)
4. **IndiaOut1.jpg** - Anti-interference campaign
5. **Ha.jpg** - YES vote symbol (Featured)

Other files get auto-generated metadata with appropriate categories.

## File Structure

```
app/
  └── media/
      └── page.tsx              # Main gallery page
components/
  ├── media-grid.tsx            # Grid display & lightbox
  └── media-upload.tsx          # Upload form (volunteers)
scripts/
  └── seed-media.ts             # Cloudinary upload script
Asset/
  └── Yes/                      # Campaign assets (23 files)
```

## Usage

### Viewing Gallery
- Visit: http://localhost:3000/media
- Filter by category using tabs
- Click any image to view full-size
- Like, download, or share images

### Upload Media (Future)
- Only for authenticated volunteers
- Fill in title, description, category
- Upload to Cloudinary automatically
- Appears in gallery immediately

## Cloudinary Features

### Automatic Optimizations
- **Responsive**: Multiple sizes for different devices
- **Format**: Auto-converts to WebP where supported
- **Quality**: Intelligent compression
- **Lazy Loading**: Images load as needed

### Transformations
- Max dimensions: 1920x1920
- Quality: Auto
- Format: Auto (WebP, AVIF when supported)
- Video: Original quality preserved

## Database Schema

Media records include:
```typescript
{
  cloudinary_public_id: string;
  url: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  file_size: number;
  title_bn: string;
  title_en: string;
  description_bn: string;
  description_en: string;
  alt_text_bn: string;
  alt_text_en: string;
  tags: string[];
  category: 'martyrs' | 'protests' | 'youth' | 'campaign' | 'general';
  is_featured: boolean;
  view_count: number;
  like_count: number;
}
```

## Social Sharing

Configured platforms:
- **Facebook**: Share with image preview
- **Twitter**: Share with title and image

Custom share text includes campaign hashtags and messaging.

## Performance

- **Lazy Loading**: Images load on scroll
- **Optimized Delivery**: CDN-served from Cloudinary
- **Responsive Images**: Correct size for device
- **Video Streaming**: Adaptive bitrate for videos

## Next Steps

1. **Execute SQL Schema**: Ensure `media` table exists
2. **Configure Cloudinary**: Add API credentials to `.env`
3. **Run Seeder**: `npm run seed:media`
4. **Visit Gallery**: Go to `/media`
5. **Customize**: Edit metadata in `scripts/seed-media.ts`

## Troubleshooting

**Cloudinary Upload Fails**
- Verify API credentials in `.env`
- Check cloud name matches your account
- Ensure files exist in `Asset/Yes/`

**Images Not Showing**
- Check Supabase RLS policies allow public reads
- Verify media records were created
- Check browser console for errors

**Slow Loading**
- Cloudinary transformations are cached
- First load may be slower
- Subsequent loads will be fast
