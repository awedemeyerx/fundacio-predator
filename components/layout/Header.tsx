'use client';

import { useState } from 'react';
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

const langs: { code: Lang; label: string; flag: string }[] = [
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

function LangSwitcher({ lang }: { lang: Lang }) {
  const rawPath = useRawPath(lang);

  return (
    <div className="flex items-center gap-1 text-xs tracking-wide">
      {langs.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="text-charcoal/20 mx-0.5">·</span>}
          <Link
            href={langUrl(code, rawPath)}
            className={`px-1 py-0.5 transition-colors ${
              code === lang
                ? 'text-charcoal font-medium'
                : 'text-charcoal/40 hover:text-charcoal/70'
            }`}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  );
}

function MobileLangSwitcher({ lang }: { lang: Lang }) {
  const rawPath = useRawPath(lang);

  return (
    <div className="flex items-center gap-0.5">
      {langs.map(({ code, flag }) => (
        <Link
          key={code}
          href={langUrl(code, rawPath)}
          className={`text-base leading-none p-1 transition-opacity ${
            code === lang ? 'opacity-100' : 'opacity-40 hover:opacity-70'
          }`}
        >
          {flag}
        </Link>
      ))}
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
          <LangSwitcher lang={lang} />
          <Link
            href={langUrl(lang, '/spenden')}
            className="bg-amber text-white text-[13px] font-medium px-5 py-2 rounded-full hover:bg-amber-600 transition-all hover:shadow-md hover:shadow-amber/15"
          >
            {siteConfig.content.hero.cta[lang]}
          </Link>
        </nav>

        {/* Mobile: Lang Flags + Burger */}
        <div className="md:hidden flex items-center gap-1">
          <MobileLangSwitcher lang={lang} />
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
