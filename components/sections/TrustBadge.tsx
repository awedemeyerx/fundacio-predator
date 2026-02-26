'use client';

import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import FadeIn from '@/components/ui/FadeIn';

export default function TrustBadge({ lang }: { lang: Lang }) {
  const { trust } = siteConfig.content;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="relative overflow-hidden bg-gradient-to-r from-gold/[0.06] to-gold/[0.03] border border-gold/15 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* Subtle oval glow */}
            <div
              className="absolute -right-20 -top-20 w-60 h-60 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(201,150,59,0.06) 0%, transparent 60%)' }}
            />

            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
              <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            <div className="relative">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-gold mb-1.5">
                {trust.badge[lang]}
              </h2>
              <p className="text-charcoal-body/70 text-[15px] leading-relaxed max-w-xl">
                {trust.description[lang]}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
