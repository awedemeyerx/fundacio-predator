'use client';

import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import FadeIn from '@/components/ui/FadeIn';

export default function TrustBadge({ lang }: { lang: Lang }) {
  const { trust } = siteConfig.content;

  return (
    <section className="py-12 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border border-gold/20 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold mb-2">
                {trust.badge[lang]}
              </h2>
              <p className="text-charcoal-body leading-relaxed max-w-xl">
                {trust.description[lang]}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
