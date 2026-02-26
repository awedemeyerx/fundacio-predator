'use client';

import Link from 'next/link';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';
import FadeIn from '@/components/ui/FadeIn';

export default function ProjectsPreview({ lang }: { lang: Lang }) {
  const { projects } = siteConfig.content;

  return (
    <section className="py-20 sm:py-28 bg-warm-sand/50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-forest font-medium mb-4">
              {projects.title[lang]}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal">
              {lang === 'de'
                ? 'Wo deine Spende wirkt'
                : lang === 'es'
                ? 'Donde actúa tu donación'
                : 'Where your donation makes impact'}
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.items.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.15}>
              <Link
                href={langUrl(lang, `/projekte/${project.slug}`)}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-warm-sand to-charcoal/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber/10 group-hover:bg-amber/5 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-forest text-white text-xs uppercase tracking-wider px-3 py-1.5 rounded-full font-medium">
                      {project.title[lang]}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-charcoal mb-2 group-hover:text-amber transition-colors">
                    {project.title[lang]}
                  </h3>
                  <p className="text-charcoal-body text-sm leading-relaxed">
                    {project.excerpt[lang]}
                  </p>
                  <div className="mt-4 flex items-center text-amber text-sm font-medium">
                    {lang === 'de' ? 'Mehr erfahren' : lang === 'es' ? 'Saber más' : 'Learn more'}
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
