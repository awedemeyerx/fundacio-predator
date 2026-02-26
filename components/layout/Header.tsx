'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';

function LangSwitcher({ lang }: { lang: Lang }) {
  const langs: { code: Lang; label: string }[] = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <div className="flex items-center gap-1 text-sm">
      {langs.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span className="text-charcoal-muted mx-1">/</span>}
          <Link
            href={langUrl(code, '/')}
            className={`transition-colors ${
              code === lang
                ? 'text-amber font-medium'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  );
}

export default function Header({ lang }: { lang: Lang }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-charcoal/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={langUrl(lang, '/')} className="flex items-center gap-3">
          <span className="font-serif text-xl font-bold text-charcoal tracking-tight">
            Fundació Predator
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.items.map((item) => (
            <Link
              key={item.href}
              href={langUrl(lang, item.href)}
              className="text-sm text-charcoal-body hover:text-amber transition-colors tracking-wide uppercase"
            >
              {item.label[lang]}
            </Link>
          ))}
          <LangSwitcher lang={lang} />
          <Link
            href={langUrl(lang, '/spenden')}
            className="bg-amber text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-amber-600 transition-colors"
          >
            {siteConfig.content.hero.cta[lang]}
          </Link>
        </nav>

        {/* Mobile Burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-charcoal transition-all ${
              mobileOpen ? 'rotate-45 translate-y-1' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-charcoal transition-all ${
              mobileOpen ? '-rotate-45 -translate-y-1' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-warm-white border-b border-charcoal/5 overflow-hidden"
          >
            <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4">
              {siteConfig.nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={langUrl(lang, item.href)}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg text-charcoal-body hover:text-amber transition-colors"
                >
                  {item.label[lang]}
                </Link>
              ))}
              <div className="pt-2 border-t border-charcoal/5">
                <LangSwitcher lang={lang} />
              </div>
              <Link
                href={langUrl(lang, '/spenden')}
                onClick={() => setMobileOpen(false)}
                className="bg-amber text-white text-center font-medium px-5 py-3 rounded-full hover:bg-amber-600 transition-colors mt-2"
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
