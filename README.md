# Vote For Yes - July Charter Campaign

A modern, bilingual (Bengali/English) web application for the July Charter referendum campaign.

## 🚀 Features

- ✅ Bilingual support (Bengali & English)
- ✅ Modern volunteer registration form with step-by-step process
- ✅ Media gallery for campaign content
- ✅ Blog system for updates and news
- ✅ Responsive design with glassmorphism effects
- ✅ SEO optimized
- ✅ Analytics integration (Google Analytics, Facebook Pixel)

## 📋 Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun
- Supabase account (for database)
- Cloudinary account (for media storage)

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Sabbir215/Vote-For-Yes.git
cd Vote-For-Yes
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your credentials:

#### Required Variables:

**Supabase** (for volunteer form submissions):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

To get these values:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select existing one
3. Go to Settings > API
4. Copy the `URL` and `anon` key

**Cloudinary** (for media uploads):

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Optional Variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=your-fb-pixel-id
```

### 4. Set up Supabase Database

Create the following table in your Supabase project:

```sql
create table volunteer_submissions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  mobile text not null,
  email text,
  facebook_url text,
  twitter_url text,
  instagram_url text,
  volunteer_types text[] not null,
  organization text,
  status text default 'pending'::text
);

-- Enable Row Level Security
alter table volunteer_submissions enable row level security;

-- Create policy to allow inserts
create policy "Allow public inserts"
  on volunteer_submissions
  for insert
  to anon
  with check (true);
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── blog/              # Blog pages
│   ├── media/             # Media gallery
│   ├── volunteer/         # Volunteer registration
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── hero-section.tsx
│   ├── volunteer-form.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client
│   └── validations/      # Form validation schemas
├── messages/             # i18n translations
│   ├── en.json
│   └── bn.json
└── public/               # Static assets
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: Supabase
- **Internationalization**: next-intl
- **Analytics**: Google Analytics, Facebook Pixel

## 🌐 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository to Vercel
3. Add environment variables from your `.env` file in Vercel dashboard
4. Deploy!

**Important**: Don't commit your `.env` file to GitHub. Add it to `.gitignore`.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact the repository owner.
