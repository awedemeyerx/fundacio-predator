import Link from 'next/link';
import Image from 'next/image';
import { Lang } from '@/lib/types';
import { langUrl } from '@/lib/hreflang';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';
import ProgressBar from '@/components/ui/ProgressBar';
import { getActiveCampaigns, getLocalizedCampaign } from '@/lib/campaigns';

export const revalidate = 300;

const pageContent = {
  de: { title: 'Unsere Kampagnen', subtitle: 'Unterstütze gezielt eines unserer aktuellen Projekte.' },
  en: { title: 'Our Campaigns', subtitle: 'Support one of our current projects directly.' },
  es: { title: 'Nuestras Campañas', subtitle: 'Apoya directamente uno de nuestros proyectos actuales.' },
};

export default async function CampaignsPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang as Lang) || 'de';
  const campaigns = await getActiveCampaigns();
  const c = pageContent[lang];

  return (
    <>
      <Header lang={lang} />
      <main className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.3em] text-forest font-medium mb-4">
              {lang === 'de' ? 'Kampagnen' : lang === 'es' ? 'Campañas' : 'Campaigns'}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4 leading-tight">
              {c.title}
            </h1>
            <p className="text-[17px] text-charcoal-body/70 font-light max-w-xl mb-16">
              {c.subtitle}
            </p>
          </FadeIn>

          {campaigns.length === 0 ? (
            <FadeIn delay={0.1}>
              <div className="text-center py-20 text-charcoal-muted">
                <p>{lang === 'de' ? 'Aktuell keine aktiven Kampagnen.' : lang === 'es' ? 'Actualmente sin campañas activas.' : 'No active campaigns at this time.'}</p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.map((rawCampaign, i) => {
                const campaign = getLocalizedCampaign(rawCampaign, lang);
                return (
                  <FadeIn key={rawCampaign.id} delay={i * 0.08}>
                    <Link href={langUrl(lang, `/kampagne/${rawCampaign.slug}`)} className="group block">
                      {campaign.cover_image_url && (
                        <div className="aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-charcoal/[0.03]">
                          <Image
                            src={campaign.cover_image_url}
                            alt={campaign.name}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      )}
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mt-2 mb-3 group-hover:text-amber transition-colors leading-snug">
                        {campaign.name}
                      </h2>
                      <ProgressBar
                        raisedCents={rawCampaign.raised_cents}
                        targetCents={rawCampaign.target_amount_cents}
                        className="mb-3"
                      />
                      {campaign.description && (
                        <p className="text-[15px] text-charcoal-body/70 leading-relaxed line-clamp-3">
                          {campaign.description}
                        </p>
                      )}
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
