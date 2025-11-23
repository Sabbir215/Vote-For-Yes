import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { CTASection } from '@/components/cta-section';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FloatingSlogans } from '@/components/floating-slogans';
import { getLocale } from 'next-intl/server';

export default async function HomePage() {
  const locale = await getLocale();
  
  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingSlogans />
      <Navbar locale={locale} />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
