# Blog Post Seeding Guide

## Overview

This guide explains how to automatically generate blog posts from campaign slogans.

## Prerequisites

1. **Database Schema**: Ensure the Supabase database schema has been executed
2. **Slogans File**: `Asset/Vote-Yes.txt` must exist with campaign slogans
3. **Environment Variables**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be set

## Running the Seeder

### Basic Usage

Generate 50 blog posts (default):
```bash
npm run seed:blog
```

### Advanced Options

Generate specific number of posts:
```bash
npm run seed:blog -- --limit=100
```

Reset database and generate fresh posts:
```bash
npm run seed:blog -- --reset --limit=75
```

## What Gets Generated

Each blog post includes:

- **Bilingual Content**: Bengali and English titles/content
- **SEO Optimization**: Meta tags, excerpts, slugs
- **Rich HTML Content**: Formatted with headings, lists, blockquotes
- **Tags**: Relevant tags for categorization
- **Realistic Data**: Random publish dates within last 3 months
- **Engagement Metrics**: Random view/like counts
- **Featured Posts**: First 5 posts marked as featured

## Post Templates

The seeder uses 2 different templates that alternate:

1. **Template 1**: "Why Say Yes?" format
   - Focuses on the importance of the July Charter
   - Includes democratic governance, rights, and development
   - Tags: জুলাই সনদ, পরিবর্তন, গণভোট, নতুন বাংলাদেশ

2. **Template 2**: "Understanding the Charter" format
   - Highlights the July Revolution and martyrs
   - Lists core objectives and how to contribute
   - Tags: জুলাই বিপ্লব, শহীদদের স্বপ্ন, গণতন্ত্র, তারুণ্য

## File Structure

```
scripts/
  └── seed-blog.ts          # Seeding script
lib/
  └── blog-generator.ts     # Template generation logic
app/
  ├── blog/
  │   ├── page.tsx          # Blog listing page
  │   └── [slug]/
  │       └── page.tsx      # Blog detail page
Asset/
  └── Vote-Yes.txt          # Source slogans (448 lines)
```

## Accessing Blog Posts

- **Blog Listing**: http://localhost:3000/blog
- **Blog Post**: http://localhost:3000/blog/[slug]

## Features

### Blog Listing Page
- Featured posts section (first 5)
- Grid layout for all posts
- Bilingual support (Bengali/English)
- View count, like count display
- Tag badges
- Responsive design

### Blog Detail Page
- Full article with rich formatting
- Social sharing (Facebook, Twitter)
- Meta information (date, views, likes)
- CTA to volunteer signup
- SEO-optimized metadata

## Next Steps

1. **Execute Database Schema**: Run the SQL migration in Supabase
2. **Seed Posts**: Run `npm run seed:blog`
3. **Visit Blog**: Go to `/blog` to see posts
4. **Customize**: Edit templates in `lib/blog-generator.ts`

## Troubleshooting

**Error: Cannot find module '@supabase/supabase-js'**
```bash
npm install @supabase/supabase-js
```

**Error: ENOENT: no such file or directory, open 'Asset/Vote-Yes.txt'**
- Ensure you're running from the project root
- Verify the Asset folder exists with Vote-Yes.txt

**No posts appearing on /blog**
- Check if seeding was successful
- Verify posts have `status = 'published'`
- Check Supabase RLS policies allow public reads
