# Deployment Guide: হ্যাঁ ভোট - YES Vote

Complete step-by-step guide to deploy the Vote Yes Bangladesh platform to production.

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup) (recommended for Next.js)
- [Supabase Account](https://supabase.com)
- [Cloudinary Account](https://cloudinary.com)
- [Google Analytics Account](https://analytics.google.com)
- [OneSignal Account](https://onesignal.com) (for push notifications)

## 🗄️ Database Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: vote-yes-bd
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to Bangladesh (Singapore recommended)
4. Wait for project to be created (~2 minutes)

### 2. Execute Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `/supabase/migrations/20250123_initial_schema.sql`
4. Paste into the SQL editor
5. Click "Run" or press `Ctrl+Enter`
6. Verify success:
   - Navigate to **Table Editor**
   - You should see 9 tables: `profiles`, `volunteer_submissions`, `blog_posts`, `threads`, `comments`, `media`, `connections`, `messages`, `likes`

### 3. Get Supabase Credentials

1. Go to **Project Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://xxx.supabase.co`
   - **Anon/Public Key**: `eyJhbGciOiJIUzI1...`

## ☁️ Cloudinary Setup

### 1. Create Cloudinary Account

1. Sign up at [Cloudinary](https://cloudinary.com/users/register/free)
2. Complete email verification

### 2. Get Cloudinary Credentials

1. Go to Dashboard
2. Copy the following values:
   - **Cloud Name**: `your-cloud-name`
   - **API Key**: `123456789012345`
   - **API Secret**: `xxxxx-xxxxxxxxxx`

### 3. Create Upload Preset (Optional)

1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Click "Add upload preset"
4. Set name: `july-charter`
5. Set folder: `july-charter`
6. Save

## 📊 Analytics & Tracking Setup

### 1. Google Analytics 4

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property: "Vote Yes BD"
3. Choose "Web" platform
4. Get your **Measurement ID**: `G-XXXXXXXXXX`

### 2. Facebook Pixel (Optional)

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Create new Pixel
3. Get your **Pixel ID**

### 3. OneSignal Push Notifications (Optional)

1. Sign up at [OneSignal](https://onesignal.com)
2. Create new app: "Vote Yes BD"
3. Choose "Web Push"
4. Get **App ID** and **Safari Web ID**

## 🚀 Vercel Deployment

### 1. Prepare Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Vote Yes BD platform"

# Create GitHub repository
# Push to GitHub
git remote add origin https://github.com/yourusername/vote-yes-bd.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./vote-yes-app` (if not in root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add Environment Variables (see below)
6. Click "Deploy"

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd vote-yes-app
vercel

# Follow prompts:
# - Link to existing project? N
# - Project name: vote-yes-bd
# - Directory: ./
# - Framework: Next.js

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... (repeat for all env vars)

# Deploy to production
vercel --prod
```

### 3. Environment Variables

Add these to Vercel:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxx-xxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://vote-yes-bd.vercel.app

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=your-fb-pixel-id

# Push Notifications
NEXT_PUBLIC_ONESIGNAL_APP_ID=your-onesignal-app-id
NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID=web.onesignal.auto.xxxxx

# SEO
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Email (Optional)
RESEND_API_KEY=re_xxxxx
```

## 🌱 Seed Database Content

After deployment, seed the database with initial content:

### 1. Seed Blog Posts

```bash
# Locally
cd vote-yes-app
npm run seed:blog

# Verify in Supabase
# Go to Table Editor → blog_posts
# Should see 50+ posts
```

### 2. Seed Media Gallery

```bash
# Upload campaign assets to Cloudinary
npm run seed:media

# Verify in Cloudinary Dashboard
# Check "july-charter" folder

# Verify in Supabase
# Go to Table Editor → media
# Should see 23 media items
```

## 🔍 SEO Configuration

### 1. Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://vote-yes-bd.vercel.app`
3. Verify ownership (Vercel DNS verification recommended)
4. Submit sitemap: `https://vote-yes-bd.vercel.app/sitemap.xml`

### 2. Verify Meta Tags

Check these URLs in production:
- https://vote-yes-bd.vercel.app (homepage)
- https://vote-yes-bd.vercel.app/blog
- https://vote-yes-bd.vercel.app/media
- https://vote-yes-bd.vercel.app/volunteer

Use [Open Graph Debugger](https://developers.facebook.com/tools/debug/) to verify:
- Open Graph tags
- Twitter Cards
- Schema.org markup

## 🎨 Custom Domain (Optional)

### 1. Buy Domain

Recommended domain names:
- `voteyesbd.org`
- `julycharter.bd`
- `hayavote.com`

### 2. Configure in Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records (Vercel will provide instructions)
4. Enable automatic HTTPS

### 3. Update Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://voteyesbd.org
```

Redeploy to apply changes.

## ✅ Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test volunteer form submission
- [ ] Check blog posts display correctly
- [ ] Verify media gallery loads images from Cloudinary
- [ ] Test language switching (Bengali/English)
- [ ] Verify mobile responsiveness
- [ ] Check Google Analytics tracking
- [ ] Test social sharing buttons
- [ ] Verify sitemap.xml and robots.txt accessible
- [ ] Check Core Web Vitals in PageSpeed Insights
- [ ] Test PWA installation on mobile
- [ ] Verify OneSignal push notification subscription

## 📱 PWA Icons

Create these icon sizes and add to `/public`:

- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `favicon.ico`
- `apple-touch-icon.png` (180x180)

Use the "হ" symbol or Bangladesh flag colors.

## 🔧 Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Database Connection Issues

- Verify Supabase URL and anon key are correct
- Check Supabase project status (not paused)
- Verify RLS policies are enabled

### Cloudinary Images Not Loading

- Check Cloudinary credentials
- Verify images uploaded successfully
- Check browser console for CORS errors
- Ensure Cloudinary folder name matches script

### Analytics Not Tracking

- Verify GA Measurement ID format: `G-XXXXXXXXXX`
- Check browser console for errors
- Use Google Analytics DebugView
- Allow 24-48 hours for data to appear

## 📊 Performance Optimization

### 1. Enable Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to layout:

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Enable Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

### 3. Optimize Images

- All images served via Cloudinary CDN
- Automatic format conversion (WebP)
- Responsive image sizing
- Lazy loading enabled

## 🔐 Security

### 1. Environment Variables

- Never commit `.env` files to Git
- Use Vercel Environment Variables dashboard
- Rotate Supabase anon key if exposed

### 2. Supabase RLS

- All tables have Row Level Security enabled
- Test policies thoroughly before production
- Monitor Supabase logs for unauthorized access

### 3. Rate Limiting

Consider adding rate limiting for:
- Volunteer form submissions
- Blog post views
- Media downloads

## 📞 Support

For deployment issues:
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
- Cloudinary Support: https://support.cloudinary.com

## 🎉 Launch Checklist

- [ ] All environment variables configured
- [ ] Database schema executed successfully
- [ ] Blog posts seeded (50+)
- [ ] Media gallery seeded (23 assets)
- [ ] Volunteer form tested end-to-end
- [ ] Social sharing tested on Facebook/Twitter
- [ ] Mobile performance verified (Lighthouse score >90)
- [ ] SEO meta tags verified
- [ ] Analytics tracking confirmed
- [ ] Custom domain configured (if applicable)
- [ ] Team trained on content management
- [ ] Backup plan established

---

**Deployment Timeline**: 2-3 hours  
**Difficulty**: Moderate  
**Team Size**: 1-2 people

Good luck with the launch! 🇧🇩 হ্যাঁ ভোট! ✊
