import { createClient } from '@/lib/supabase/client';

interface BlogPostTemplate {
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  excerpt: string;
  tags: string[];
}

export async function generateBlogPostFromSlogan(
  slogan: string,
  index: number
): Promise<BlogPostTemplate | null> {
  // Clean the slogan
  const cleanSlogan = slogan.replace(/,\s*✓?\s*$/g, '').trim();
  
  if (!cleanSlogan || cleanSlogan.length < 10) return null;

  // Detect language
  const isBengali = /[\u0980-\u09FF]/.test(cleanSlogan);
  
  // Generate title and content based on slogan
  const templates = [
    {
      titleBn: (s: string) => `কেন ${s}?`,
      titleEn: (s: string) => `Why Say Yes to Change?`,
      contentBn: (s: string) => `
<h2>${s}</h2>

<p>জুলাই বিপ্লব আমাদের দিয়েছে নতুন সম্ভাবনার স্বপ্ন। হাজারো শহীদের রক্তে রচিত এই বিপ্লব শুধু একটি ঘটনা নয়, এটি একটি জাগরণ। আমাদের তরুণ প্রজন্ম দেখিয়ে দিয়েছে যে পরিবর্তন সম্ভব, যদি আমরা ঐক্যবদ্ধভাবে দাঁড়াই।</p>

<h3>জুলাই সনদ কেন প্রয়োজন?</h3>

<p>জুলাই সনদ হলো সেই রূপরেখা যা আমাদের নিয়ে যাবে একটি নতুন বাংলাদেশের দিকে। এটি শুধু একটি দলিল নয়, এটি আমাদের সম্মিলিত স্বপ্নের প্রতিফলন। এই সনদে রয়েছে:</p>

<ul>
  <li><strong>গণতান্ত্রিক শাসনব্যবস্থা:</strong> যেখানে জনগণের মতামতই হবে সর্বোচ্চ</li>
  <li><strong>দুর্নীতিমুক্ত প্রশাসন:</strong> স্বচ্ছতা ও জবাবদিহিতা নিশ্চিত করা</li>
  <li><strong>মানবাধিকার সুরক্ষা:</strong> প্রতিটি নাগরিকের অধিকার নিশ্চিত করা</li>
  <li><strong>শিক্ষা ও স্বাস্থ্যসেবা:</strong> সবার জন্য মানসম্পন্ন সেবা</li>
</ul>

<h3>আপনার ভোট কেন গুরুত্বপূর্ণ?</h3>

<p>প্রতিটি ভোটই গুরুত্বপূর্ণ। আপনার 'হ্যাঁ' ভোট মানে হলো:</p>

<blockquote>
  <p>শহীদদের স্বপ্ন বাস্তবায়নে আপনার অঙ্গীকার। নতুন প্রজন্মের জন্য একটি সুন্দর ভবিষ্যৎ গড়ার প্রতিশ্রুতি। দেশের উন্নয়ন ও অগ্রগতির পক্ষে আপনার সমর্থন।</p>
</blockquote>

<p>আসুন, আমরা সবাই একসাথে বলি <strong>'হ্যাঁ'</strong>। জুলাই সনদের পক্ষে ভোট দিয়ে আমরা গড়ব নতুন বাংলাদেশ।</p>
      `,
      contentEn: (s: string) => `
<h2>Vote YES for a New Bangladesh</h2>

<p>The July Revolution gave us a dream of new possibilities. This revolution, written in the blood of thousands of martyrs, is not just an event—it's an awakening. Our young generation has shown that change is possible if we stand united.</p>

<h3>Why Do We Need the July Charter?</h3>

<p>The July Charter is the blueprint that will lead us to a new Bangladesh. It's not just a document—it's a reflection of our collective dream. This charter includes:</p>

<ul>
  <li><strong>Democratic Governance:</strong> Where people's opinion is supreme</li>
  <li><strong>Corruption-Free Administration:</strong> Ensuring transparency and accountability</li>
  <li><strong>Human Rights Protection:</strong> Guaranteeing rights for every citizen</li>
  <li><strong>Education & Healthcare:</strong> Quality services for all</li>
</ul>

<h3>Why Is Your Vote Important?</h3>

<p>Every vote counts. Your 'YES' vote means:</p>

<blockquote>
  <p>Your commitment to realizing the martyrs' dream. A promise to build a beautiful future for the new generation. Your support for the country's development and progress.</p>
</blockquote>

<p>Let's all say <strong>'YES'</strong> together. By voting for the July Charter, we will build a new Bangladesh.</p>
      `,
      tags: ['জুলাই সনদ', 'পরিবর্তন', 'গণভোট', 'নতুন বাংলাদেশ'],
    },
    {
      titleBn: (s: string) => `${s.split(',')[0]} - জানুন কেন`,
      titleEn: (s: string) => `Understanding the July Charter`,
      contentBn: (s: string) => `
<h2>${s}</h2>

<p>২০২৪ সালের জুলাই মাস বাংলাদেশের ইতিহাসে একটি গুরুত্বপূর্ণ অধ্যায় রচনা করেছে। ছাত্র-জনতার ঐতিহাসিক আন্দোলন আমাদের দেখিয়েছে যে জনগণের শক্তিই সবচেয়ে বড় শক্তি।</p>

<h3>শহীদদের স্বপ্ন</h3>

<p>আবু সাঈদসহ হাজারো শহীদ তাঁদের জীবন দিয়ে গেছেন একটি স্বপ্নের জন্য—একটি সুন্দর, গণতান্ত্রিক, ন্যায়ভিত্তিক বাংলাদেশ। তাঁদের আত্মত্যাগ যেন বৃথা না যায়, সেজন্য আমাদের এগিয়ে যেতে হবে।</p>

<h3>জুলাই সনদের মূল লক্ষ্য</h3>

<ul>
  <li>একটি আধুনিক, প্রগতিশীল সংবিধান প্রণয়ন</li>
  <li>বৈষম্যমুক্ত সমাজ প্রতিষ্ঠা</li>
  <li>যুব সমাজের ক্ষমতায়ন</li>
  <li>প্রযুক্তি ও উদ্ভাবনে বিনিয়োগ বৃদ্ধি</li>
  <li>পরিবেশ সংরক্ষণ ও টেকসই উন্নয়ন</li>
</ul>

<p>এই লক্ষ্যগুলো অর্জনের জন্য আমাদের সবার সহযোগিতা প্রয়োজন। আপনার একটি 'হ্যাঁ' ভোট পারে এই স্বপ্নকে বাস্তবে রূপ দিতে।</p>

<h3>আপনি কীভাবে অবদান রাখতে পারেন?</h3>

<ol>
  <li>গণভোটে অবশ্যই অংশগ্রহণ করুন</li>
  <li>আপনার পরিবার ও বন্ধুদের সচেতন করুন</li>
  <li>সোশ্যাল মিডিয়ায় সঠিক তথ্য শেয়ার করুন</li>
  <li>ভলান্টিয়ার হিসেবে যুক্ত হন</li>
</ol>

<p><strong>মনে রাখবেন:</strong> এটি শুধু একটি ভোট নয়, এটি আমাদের ভবিষ্যৎ নির্ধারণের সুযোগ।</p>
      `,
      contentEn: (s: string) => `
<h2>The Historic July Movement</h2>

<p>July 2024 marked an important chapter in Bangladesh's history. The historic student-led movement showed us that people's power is the greatest power.</p>

<h3>The Martyrs' Dream</h3>

<p>Abu Sayed and thousands of martyrs gave their lives for a dream—a beautiful, democratic, and just Bangladesh. We must move forward to ensure their sacrifice was not in vain.</p>

<h3>Core Objectives of the July Charter</h3>

<ul>
  <li>Drafting a modern, progressive constitution</li>
  <li>Establishing an equitable society</li>
  <li>Empowering the youth</li>
  <li>Increasing investment in technology and innovation</li>
  <li>Environmental protection and sustainable development</li>
</ul>

<p>Achieving these goals requires everyone's cooperation. Your single 'YES' vote can turn this dream into reality.</p>

<h3>How You Can Contribute?</h3>

<ol>
  <li>Definitely participate in the referendum</li>
  <li>Raise awareness among family and friends</li>
  <li>Share accurate information on social media</li>
  <li>Join as a volunteer</li>
</ol>

<p><strong>Remember:</strong> This is not just a vote, it's an opportunity to determine our future.</p>
      `,
      tags: ['জুলাই বিপ্লব', 'শহীদদের স্বপ্ন', 'গণতন্ত্র', 'তারুণ্য'],
    },
  ];

  const template = templates[index % templates.length];
  
  return {
    titleBn: isBengali ? template.titleBn(cleanSlogan) : cleanSlogan,
    titleEn: !isBengali ? cleanSlogan : template.titleEn(cleanSlogan),
    contentBn: isBengali ? template.contentBn(cleanSlogan) : template.contentBn('Vote YES for Change'),
    contentEn: template.contentEn(cleanSlogan),
    excerpt: cleanSlogan.substring(0, 150),
    tags: template.tags,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100);
}

export async function seedBlogPosts(slogans: string[], limit = 50) {
  const supabase = createClient();
  const posts = [];

  // Get random slogans
  const selectedSlogans = slogans
    .filter(s => s.trim().length > 10)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);

  for (let i = 0; i < selectedSlogans.length; i++) {
    const template = await generateBlogPostFromSlogan(selectedSlogans[i], i);
    if (!template) continue;

    const slug = slugify(`${template.titleEn}-${i}`);
    
    // Random date in the past 3 months
    const daysAgo = Math.floor(Math.random() * 90);
    const publishedAt = new Date();
    publishedAt.setDate(publishedAt.getDate() - daysAgo);

    posts.push({
      title_bn: template.titleBn,
      title_en: template.titleEn,
      slug,
      excerpt_bn: template.excerpt,
      excerpt_en: template.excerpt,
      content_bn: template.contentBn,
      content_en: template.contentEn,
      tags: template.tags,
      status: 'published',
      published_at: publishedAt.toISOString(),
      featured: i < 5, // First 5 are featured
      author_id: null, // Will be set to admin ID later
    });
  }

  return posts;
}
