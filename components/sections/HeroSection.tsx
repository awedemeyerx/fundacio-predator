'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';

export default function HeroSection({ lang }: { lang: Lang }) {
  const { hero } = siteConfig.content;

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-white">
      {/* Subtle oval gradient — warm glow, not beige */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(232,114,42,0.04) 0%, rgba(45,143,111,0.02) 40%, transparent 70%)',
        }}
      />
      {/* Secondary accent glow */}
      <div
        className="absolute top-[15%] right-[10%] w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(45,143,111,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber to-transparent opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[11px] uppercase tracking-[0.3em] text-forest font-medium mb-8"
          >
            {siteConfig.brand.tagline[lang]}
          </motion.p>

          {/* Headline — larger, more dramatic */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-serif text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold text-charcoal leading-[1.08] text-balance mb-7"
          >
            {hero.headline[lang]}
          </motion.h1>

          {/* Subtitle — lighter weight, more breathing room */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[17px] sm:text-lg text-charcoal-body/80 leading-relaxed max-w-xl mb-11 font-light"
          >
            {hero.subtitle[lang]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={langUrl(lang, '/spenden')}
              className="inline-flex items-center justify-center bg-amber text-white font-medium px-8 py-[14px] rounded-full text-[15px] hover:bg-amber-600 transition-all hover:shadow-lg hover:shadow-amber/20 active:scale-[0.98]"
            >
              {hero.cta[lang]}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={langUrl(lang, '/projekte')}
              className="inline-flex items-center justify-center border border-charcoal/12 text-charcoal/70 font-medium px-8 py-[14px] rounded-full text-[15px] hover:border-charcoal/25 hover:text-charcoal transition-all"
            >
              {hero.secondaryCta[lang]}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
