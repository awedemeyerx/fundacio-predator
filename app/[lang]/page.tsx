import Link from 'next/link';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TrustBadge from '@/components/sections/TrustBadge';
import ProjectsPreview from '@/components/sections/ProjectsPreview';
import DonationCTA from '@/components/sections/DonationCTA';
import MissionSection from '@/components/sections/MissionSection';

export default function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang as Lang) || 'de';

  return (
    <>
      <Header lang={lang} />
      <main>
        <HeroSection lang={lang} />
        <TrustBadge lang={lang} />
        <MissionSection lang={lang} />
        <ProjectsPreview lang={lang} />
        <DonationCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
