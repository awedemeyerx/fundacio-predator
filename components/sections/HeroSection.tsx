'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';

export default function HeroSection({ lang }: { lang: Lang }) {
  const { hero } = siteConfig.content;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background — warm gradient with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-sand via-warm-white to-warm-white" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1a1a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber via-gold to-forest" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.25em] text-amber font-medium mb-6"
          >
            {siteConfig.brand.tagline[lang]}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight text-balance mb-8"
          >
            {hero.headline[lang]}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-charcoal-body leading-relaxed max-w-2xl mb-10"
          >
            {hero.subtitle[lang]}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={langUrl(lang, '/spenden')}
              className="inline-flex items-center justify-center bg-amber text-white font-medium px-8 py-4 rounded-full text-lg hover:bg-amber-600 transition-all hover:shadow-lg hover:shadow-amber/20"
            >
              {hero.cta[lang]}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={langUrl(lang, '/projekte')}
              className="inline-flex items-center justify-center border-2 border-charcoal/15 text-charcoal font-medium px-8 py-4 rounded-full text-lg hover:border-charcoal/30 transition-all"
            >
              {hero.secondaryCta[lang]}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm-white to-transparent" />
    </section>
  );
}
