'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';

const heroImages = [
  { src: '/images/projects/educaclowns/educaclowns-2.jpg', alt: 'EducaClowns', objectPosition: '50% 25%' },
  { src: '/images/projects/sos-mamas/sos-mamas-1.webp', alt: 'SOS Mamás', objectPosition: '50% 50%' },
  { src: '/images/about/girl-with-heart.webp', alt: 'Fundació Predator', objectPosition: '50% 50%' },
  { src: '/images/projects/pollenca/pollenca-1.webp', alt: 'Pollença', objectPosition: '50% 50%' },
];

function useScrollX() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

export default function HeroSection({ lang }: { lang: Lang }) {
  const { hero } = siteConfig.content;
  const scrollY = useScrollX();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-white">
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

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-8 sm:pb-12">
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

      {/* Photo strip — scrolls left on scroll */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative mt-auto pb-10 sm:pb-16"
      >
        <div
          className="flex gap-4 sm:gap-6 px-6 will-change-transform"
          style={{ transform: `translateX(-${scrollY * 0.4}px)` }}
        >
          {heroImages.map((img) => (
            <div
              key={img.src}
              className="relative flex-shrink-0 w-[260px] sm:w-[320px] lg:w-[380px] aspect-[3/2] rounded-xl overflow-hidden shadow-md shadow-charcoal/5"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                style={{ objectPosition: img.objectPosition }}
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
