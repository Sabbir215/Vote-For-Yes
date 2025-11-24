import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/features-section";
import { FloatingSlogans } from "@/components/floating-slogans";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { getLocale } from "next-intl/server";

export default async function HomePage() {
  const locale = await getLocale();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingSlogans count={30} />
      <Navbar locale={locale} />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
