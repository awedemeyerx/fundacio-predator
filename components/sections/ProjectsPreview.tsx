'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import { langUrl } from '@/lib/hreflang';
import FadeIn from '@/components/ui/FadeIn';

const projectCovers: Record<string, string> = {
  educaclowns: '/images/projects/educaclowns/educaclowns-1.jpg',
  pollenca: '/images/projects/pollenca/pollenca-1.webp',
  'sos-mamas': '/images/projects/sos-mamas/sos-mamas-1.webp',
};

export default function ProjectsPreview({ lang }: { lang: Lang }) {
  const { projects } = siteConfig.content;

  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Subtle oval background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(45,143,111,0.025) 0%, transparent 60%)' }}
      />
      <div className="relative max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.3em] text-forest font-medium mb-4">
              {projects.title[lang]}
            </p>
            <h2 className="font-serif text-3xl sm:text-[2.5rem] font-bold text-charcoal leading-tight">
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
                <div className="aspect-[4/3] relative overflow-hidden bg-charcoal/[0.03]">
                  {projectCovers[project.slug] && (
                    <Image
                      src={projectCovers[project.slug]}
                      alt={project.title[lang]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
