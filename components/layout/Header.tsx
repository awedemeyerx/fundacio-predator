'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lang, DEFAULT_LANG } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';

function useRawPath(lang: Lang) {
  const pathname = usePathname();
  let rawPath = pathname;
  if (rawPath.startsWith(`/${lang}/`)) {
    rawPath = rawPath.slice(lang.length + 1);
  } else if (rawPath === `/${lang}`) {
    rawPath = '/';
  } else if (lang === DEFAULT_LANG && !rawPath.startsWith('/en') && !rawPath.startsWith('/es')) {
    // Already a bare path for default language — keep as-is
  }
  return rawPath;
}

const langs: { code: Lang; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

function CompactLangSwitcher({ lang }: { lang: Lang }) {
  const rawPath = useRawPath(lang);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentLang = langs.find((l) => l.code === lang)!;
  const otherLangs = langs.filter((l) => l.code !== lang);

  // Close on outside click (primarily for mobile tap-to-open)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger — current language */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-[12px] font-medium tracking-wider text-charcoal/60 hover:text-charcoal bg-charcoal/[0.04] hover:bg-charcoal/[0.08] rounded-full px-2.5 py-1.5 transition-all select-none"
        aria-label="Switch language"
        aria-expanded={open}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 shrink-0">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        {currentLang.label}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-1.5 bg-white rounded-xl shadow-lg shadow-black/[0.08] border border-black/[0.06] overflow-hidden min-w-[52px] z-50"
          >
            {otherLangs.map(({ code, label }) => (
              <Link
                key={code}
                href={langUrl(code, rawPath)}
                onClick={() => setOpen(false)}
                className="block text-[12px] font-medium tracking-wider text-charcoal/50 hover:text-amber hover:bg-warm-sand/60 px-3 py-2 text-center transition-colors"
              >
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl border-b border-black/[0.04]">
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link href={langUrl(lang, '/')} className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="Fundació Predator"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-serif text-lg text-charcoal">
            Fundació Predator
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {siteConfig.nav.items.map((item) => (
            <Link
              key={item.href}
              href={langUrl(lang, item.href)}
              className="text-[13px] text-charcoal/60 hover:text-charcoal transition-colors tracking-wide"
            >
              {item.label[lang]}
            </Link>
          ))}
          <div className="w-px h-4 bg-charcoal/10" />
          <CompactLangSwitcher lang={lang} />
          <Link
            href={langUrl(lang, '/spenden')}
            className="bg-amber text-white text-[13px] font-medium px-5 py-2 rounded-full hover:bg-amber-600 transition-all hover:shadow-md hover:shadow-amber/15"
          >
            {siteConfig.content.hero.cta[lang]}
          </Link>
        </nav>

        {/* Mobile: Lang + Burger */}
        <div className="md:hidden flex items-center gap-1">
          <CompactLangSwitcher lang={lang} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-10 h-10 flex flex-col justify-center items-center gap-[5px] -mr-2"
            aria-label="Menu"
          >
            <span
              className={`w-5 h-[1.5px] bg-charcoal transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[3.25px]' : ''
              }`}
            />
            <span
              className={`w-5 h-[1.5px] bg-charcoal transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[3.25px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white border-b border-black/[0.04] overflow-hidden"
          >
            <nav className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-5">
              {siteConfig.nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={langUrl(lang, item.href)}
                  onClick={() => setMobileOpen(false)}
                  className="text-[17px] text-charcoal/70 hover:text-amber transition-colors"
                >
                  {item.label[lang]}
                </Link>
              ))}
              <Link
                href={langUrl(lang, '/spenden')}
                onClick={() => setMobileOpen(false)}
                className="bg-amber text-white text-center font-medium px-5 py-3.5 rounded-full hover:bg-amber-600 transition-colors mt-1"
              >
                {siteConfig.content.hero.cta[lang]}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
