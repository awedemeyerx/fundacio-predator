import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Lang } from '@/lib/types';
import { langUrl } from '@/lib/hreflang';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';
import ProgressBar from '@/components/ui/ProgressBar';
import { getCampaignBySlug, getLocalizedCampaign } from '@/lib/campaigns';

export const revalidate = 300;

export default async function CampaignDetailPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = (params.lang as Lang) || 'de';
  const rawCampaign = await getCampaignBySlug(params.slug);

  if (!rawCampaign) return notFound();

  const campaign = getLocalizedCampaign(rawCampaign, lang);

  const donateLabel = lang === 'de' ? 'Für dieses Projekt spenden' : lang === 'es' ? 'Donar a este proyecto' : 'Donate to this project';

  return (
    <>
      <Header lang={lang} />
      <main className="pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="text-sm text-charcoal-muted mb-8">
              <Link href={langUrl(lang, '/')} className="hover:text-amber transition-colors">Home</Link>
              <span className="mx-2 text-charcoal/20">/</span>
              <Link href={langUrl(lang, '/kampagne')} className="hover:text-amber transition-colors">
                {lang === 'de' ? 'Projekte' : lang === 'es' ? 'Proyectos' : 'Projects'}
              </Link>
              <span className="mx-2 text-charcoal/20">/</span>
              <span className="text-charcoal/50">{campaign.name}</span>
            </div>
          </FadeIn>

          {/* Cover Image */}
          {campaign.cover_image_url && (
            <FadeIn>
              <div className="aspect-[2/1] rounded-xl overflow-hidden mb-10">
                <Image
                  src={campaign.cover_image_url}
                  alt={campaign.name}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </FadeIn>
          )}

          {/* Title */}
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight mb-6">
              {campaign.name}
            </h1>
          </FadeIn>

          {/* Progress */}
          <FadeIn delay={0.15}>
            <div className="bg-warm-sand/50 rounded-2xl p-6 mb-8">
              <ProgressBar
                raisedCents={rawCampaign.raised_cents}
                targetCents={rawCampaign.target_amount_cents}
              />
            </div>
          </FadeIn>

          {/* Description */}
          {campaign.description && (
            <FadeIn delay={0.2}>
              <div className="prose prose-lg prose-charcoal max-w-none prose-p:text-charcoal-body/80 prose-p:leading-[1.8] mb-12">
                {campaign.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Donate CTA */}
          <FadeIn delay={0.25}>
            <div className="text-center">
              <Link
                href={langUrl(lang, `/spenden?campaign=${rawCampaign.slug}`)}
                className="inline-flex items-center bg-amber text-white font-medium px-8 py-4 rounded-full text-lg hover:bg-amber-600 transition-all hover:shadow-lg hover:shadow-amber/20"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {donateLabel}
              </Link>
            </div>
          </FadeIn>

          {/* Back */}
          <FadeIn delay={0.3}>
            <div className="mt-16 pt-8 border-t border-charcoal/5">
              <Link
                href={langUrl(lang, '/kampagne')}
                className="inline-flex items-center text-charcoal/50 hover:text-amber transition-colors text-sm"
              >
                <svg className="w-4 h-4 mr-2 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {lang === 'de' ? 'Alle Projekte' : lang === 'es' ? 'Todos los proyectos' : 'All projects'}
              </Link>
            </div>
          </FadeIn>
        </article>
      </main>
      <Footer lang={lang} />
    </>
  );
}
