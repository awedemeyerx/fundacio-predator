'use client';

import Link from 'next/link';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';

export default function Footer({ lang }: { lang: Lang }) {
  const { footer, projects } = siteConfig.content;

  function handleCookieReset() {
    localStorage.removeItem('cookie-consent');
    window.dispatchEvent(new CustomEvent('cookie-reset'));
  }

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl text-white font-bold mb-3">
              Fundació Predator
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {footer.tagline[lang]}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {siteConfig.content.trust.badge[lang]}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
              {projects.title[lang]}
            </h4>
            <ul className="space-y-3">
              {projects.items.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={langUrl(lang, `/projekte/${p.slug}`)}
                    className="text-sm hover:text-amber transition-colors"
                  >
                    {p.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
              {lang === 'de' ? 'Kontakt & Rechtliches' : lang === 'es' ? 'Contacto y Legal' : 'Contact & Legal'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-amber transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <Link
                  href={langUrl(lang, footer.legal.impressum.href)}
                  className="hover:text-amber transition-colors"
                >
                  {footer.legal.impressum.label[lang]}
                </Link>
              </li>
              <li>
                <Link
                  href={langUrl(lang, footer.legal.datenschutz.href)}
                  className="hover:text-amber transition-colors"
                >
                  {footer.legal.datenschutz.label[lang]}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleCookieReset}
                  className="hover:text-amber transition-colors"
                >
                  {footer.legal.cookies.label[lang]}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/30 text-xs">
          &copy; {new Date().getFullYear()} Fundació Predator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
