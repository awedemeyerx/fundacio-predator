'use client';

import Link from 'next/link';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';
import FadeIn from '@/components/ui/FadeIn';

export default function DonationCTA({ lang }: { lang: Lang }) {
  const { donate, trust } = siteConfig.content;

  return (
    <section className="py-20 sm:py-28 bg-warm-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber/[0.02] to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium mb-8">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            {trust.badge[lang]}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6 text-balance">
            {donate.title[lang]}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-charcoal-body mb-10 max-w-xl mx-auto">
            {donate.subtitle[lang]}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          {/* Quick amount buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {donate.amounts.map((amount) => (
              <Link
                key={amount}
                href={langUrl(lang, `/spenden?amount=${amount}`)}
                className="px-6 py-3 border-2 border-charcoal/10 rounded-full text-charcoal font-medium hover:border-amber hover:text-amber transition-colors"
              >
                {amount} €
              </Link>
            ))}
            <Link
              href={langUrl(lang, '/spenden')}
              className="px-6 py-3 border-2 border-dashed border-charcoal/10 rounded-full text-charcoal-muted hover:border-amber hover:text-amber transition-colors"
            >
              {donate.customLabel[lang]}
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Link
            href={langUrl(lang, '/spenden')}
            className="inline-flex items-center justify-center bg-amber text-white font-medium px-10 py-4 rounded-full text-lg hover:bg-amber-600 transition-all hover:shadow-lg hover:shadow-amber/20"
          >
            {siteConfig.content.hero.cta[lang]}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
