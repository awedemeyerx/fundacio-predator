import type { Metadata } from 'next';
import { Lang } from '@/lib/types';
import { getAlternates } from '@/lib/hreflang';
import { siteConfig } from '@/lib/site.config';
import CookieConsent from '@/components/ui/CookieConsent';

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = (params.lang as Lang) || 'de';
  const seo = siteConfig.seo[lang];

  return {
    title: {
      default: seo.title,
      template: `%s | ${siteConfig.brand.name}`,
    },
    description: seo.description,
    alternates: getAlternates(lang, ''),
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: siteConfig.brand.name,
      locale: lang === 'de' ? 'de_DE' : lang === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = (params.lang as Lang) || 'de';
  return (
    <>
      {children}
      <CookieConsent lang={lang} />
    </>
  );
}
