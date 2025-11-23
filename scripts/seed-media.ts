#!/usr/bin/env node

/**
 * Media Upload & Seeding Script
 * 
 * This script uploads campaign assets from Asset/Yes/ folder to Cloudinary
 * and creates database entries in Supabase.
 * 
 * Usage:
 *   npm run seed:media
 */

import { readdir } from 'fs/promises';
import { join } from 'path';
import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface MediaMetadata {
  filename: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  altTextBn: string;
  altTextEn: string;
  category: 'martyrs' | 'protests' | 'youth' | 'campaign' | 'general';
  tags: string[];
  featured: boolean;
}

// Metadata for campaign assets
const mediaMetadata: Record<string, MediaMetadata> = {
  'Abu Sied.jpg': {
    filename: 'Abu Sied.jpg',
    titleBn: 'শহীদ আবু সাঈদ',
    titleEn: 'Martyr Abu Sayed',
    descriptionBn: 'জুলাই বিপ্লবের প্রথম শহীদ আবু সাঈদ। তাঁর আত্মত্যাগ আমাদের অনুপ্রাণিত করে।',
    descriptionEn: 'Abu Sayed, the first martyr of July Revolution. His sacrifice inspires us.',
    altTextBn: 'শহীদ আবু সাঈদের ছবি',
    altTextEn: 'Photo of Martyr Abu Sayed',
    category: 'martyrs',
    tags: ['শহীদ', 'আবু সাঈদ', 'জুলাই বিপ্লব', 'Martyr', 'Abu Sayed'],
    featured: true,
  },
  'For Youth.png': {
    filename: 'For Youth.png',
    titleBn: 'তরুণ প্রজন্মের জন্য',
    titleEn: 'For the Youth',
    descriptionBn: 'তরুণ প্রজন্মের স্বপ্ন বাস্তবায়নে জুলাই সনদের পক্ষে ভোট দিন।',
    descriptionEn: 'Vote for July Charter to realize the dreams of young generation.',
    altTextBn: 'তরুণদের জন্য প্রচারণা পোস্টার',
    altTextEn: 'Campaign poster for youth',
    category: 'youth',
    tags: ['তারুণ্য', 'যুবক', 'ভবিষ্যৎ', 'Youth', 'Future'],
    featured: true,
  },
  'Sonod.jpg': {
    filename: 'Sonod.jpg',
    titleBn: 'জুলাই সনদ',
    titleEn: 'July Charter',
    descriptionBn: 'জুলাই সনদ - নতুন বাংলাদেশের রূপরেখা।',
    descriptionEn: 'July Charter - Blueprint for a New Bangladesh.',
    altTextBn: 'জুলাই সনদের ছবি',
    altTextEn: 'July Charter image',
    category: 'campaign',
    tags: ['জুলাই সনদ', 'সংবিধান', 'Charter', 'Constitution'],
    featured: true,
  },
  'IndiaOut1.jpg': {
    filename: 'IndiaOut1.jpg',
    titleBn: 'ভারতীয় হস্তক্ষেপ বন্ধ করুন',
    titleEn: 'Stop Indian Interference',
    descriptionBn: 'ভারতীয় দালালদের না বলুন। গণভোটে হ্যাঁ বলুন।',
    descriptionEn: 'Say no to Indian agents. Vote YES in the referendum.',
    altTextBn: 'ভারত বিরোধী প্রচারণা',
    altTextEn: 'Anti-India interference campaign',
    category: 'campaign',
    tags: ['ভারত', 'হস্তক্ষেপ', 'স্বাধীনতা', 'India', 'Interference'],
    featured: false,
  },
  'Ha.jpg': {
    filename: 'Ha.jpg',
    titleBn: 'হ্যাঁ ভোট দিন',
    titleEn: 'Vote YES',
    descriptionBn: 'জুলাই সনদের পক্ষে হ্যাঁ ভোট দিন।',
    descriptionEn: 'Vote YES for the July Charter.',
    altTextBn: 'হ্যাঁ ভোটের প্রতীক',
    altTextEn: 'YES vote symbol',
    category: 'campaign',
    tags: ['হ্যাঁ', 'ভোট', 'YES', 'Vote'],
    featured: true,
  },
};

// Generic metadata for numbered files
const generateGenericMetadata = (filename: string, index: number): MediaMetadata => {
  const categories: Array<'martyrs' | 'protests' | 'youth' | 'campaign' | 'general'> = [
    'protests',
    'youth',
    'campaign',
    'general',
  ];
  const category = categories[index % categories.length];

  return {
    filename,
    titleBn: `জুলাই বিপ্লবের মুহূর্ত ${index}`,
    titleEn: `July Revolution Moment ${index}`,
    descriptionBn: 'জুলাই বিপ্লবের একটি স্মরণীয় মুহূর্ত। হ্যাঁ ভোটের পক্ষে আমাদের আন্দোলন।',
    descriptionEn: 'A memorable moment from July Revolution. Our movement for YES vote.',
    altTextBn: `জুলাই বিপ্লবের ছবি ${index}`,
    altTextEn: `July Revolution photo ${index}`,
    category,
    tags: ['জুলাই বিপ্লব', 'আন্দোলন', 'July Revolution', 'Movement'],
    featured: index === 1,
  };
};

async function uploadToCloudinary(filePath: string, filename: string) {
  try {
    console.log(`   📤 Uploading ${filename} to Cloudinary...`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'july-charter',
      public_id: filename.replace(/\.[^/.]+$/, ''),
      resource_type: filename.endsWith('.mp4') ? 'video' : 'image',
      transformation: filename.endsWith('.mp4')
        ? undefined
        : [
            { width: 1920, height: 1920, crop: 'limit', quality: 'auto', fetch_format: 'auto' },
          ],
    });

    console.log(`   ✅ Uploaded: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`   ❌ Upload failed for ${filename}:`, error);
    throw error;
  }
}

async function seedMedia() {
  console.log('🖼️  Starting media upload and seeding...\n');

  const assetsDir = join(process.cwd(), 'Asset', 'Yes');
  
  try {
    const files = await readdir(assetsDir);
    const imageFiles = files.filter(
      (f) =>
        f.endsWith('.jpg') ||
        f.endsWith('.jpeg') ||
        f.endsWith('.png') ||
        f.endsWith('.webp') ||
        f.endsWith('.mp4')
    );

    console.log(`📁 Found ${imageFiles.length} media files\n`);

    const mediaRecords = [];
    let uploadCount = 0;

    for (let i = 0; i < imageFiles.length; i++) {
      const filename = imageFiles[i];
      const filePath = join(assetsDir, filename);

      // Get or generate metadata
      const metadata =
        mediaMetadata[filename] ||
        generateGenericMetadata(filename, i);

      try {
        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(filePath, filename);

        // Prepare database record
        mediaRecords.push({
          cloudinary_public_id: cloudinaryResult.public_id,
          url: cloudinaryResult.url,
          secure_url: cloudinaryResult.secure_url,
          format: cloudinaryResult.format,
          width: cloudinaryResult.width,
          height: cloudinaryResult.height,
          file_size: cloudinaryResult.bytes,
          title_bn: metadata.titleBn,
          title_en: metadata.titleEn,
          description_bn: metadata.descriptionBn,
          description_en: metadata.descriptionEn,
          alt_text_bn: metadata.altTextBn,
          alt_text_en: metadata.altTextEn,
          tags: metadata.tags,
          category: metadata.category,
          is_featured: metadata.featured,
          view_count: Math.floor(Math.random() * 1000),
          like_count: Math.floor(Math.random() * 200),
        });

        uploadCount++;
      } catch (error) {
        console.error(`Skipping ${filename} due to upload error`);
        continue;
      }
    }

    console.log(`\n💾 Inserting ${mediaRecords.length} records into database...\n`);

    // Insert in batches
    const batchSize = 5;
    for (let i = 0; i < mediaRecords.length; i += batchSize) {
      const batch = mediaRecords.slice(i, i + batchSize);
      const { error } = await supabase.from('media').insert(batch);

      if (error) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error);
        continue;
      }

      console.log(`   ✅ Batch ${i / batchSize + 1}/${Math.ceil(mediaRecords.length / batchSize)} inserted`);
    }

    console.log('\n✨ Media seeding complete!');
    console.log(`   Uploaded: ${uploadCount} files`);
    console.log(`   Database records: ${mediaRecords.length}`);
    console.log(`   Featured: ${mediaRecords.filter((m) => m.is_featured).length}`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedMedia().catch(console.error);
