import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';
import Link from 'next/link';
import Image from 'next/image';
import { langUrl } from '@/lib/hreflang';

const projectCovers: Record<string, { src: string; objectPosition: string }> = {
  educaclowns: { src: '/images/projects/educaclowns/educaclowns-1.jpg', objectPosition: '50% 25%' },
  'si-mallorca': { src: '/images/projects/si-mallorca/si-mallorca-1.jpg', objectPosition: '50% 50%' },
  pollenca: { src: '/images/projects/pollenca/pollenca-1.webp', objectPosition: '50% 50%' },
  'sos-mamas': { src: '/images/projects/sos-mamas/sos-mamas-1.webp', objectPosition: '50% 50%' },
};

export default function ProjektePage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as Lang) || 'de';
  const { projects } = siteConfig.content;

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-forest font-medium mb-4">
              {projects.title[lang]}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              {lang === 'de'
                ? 'Wo deine Spende wirkt'
                : lang === 'es'
                ? 'Donde actúa tu donación'
                : 'Where your donation makes impact'}
            </h1>
            <p className="text-lg text-charcoal-body max-w-2xl mb-16">
              {lang === 'de'
                ? 'Vier Projekte, ein Ziel: Menschen auf Mallorca nachhaltig unterstützen.'
                : lang === 'es'
                ? 'Cuatro proyectos, un objetivo: apoyar a las personas en Mallorca de forma sostenible.'
                : 'Four projects, one goal: sustainably supporting people in Mallorca.'}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-12">
            {projects.items.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1}>
                <Link
                  href={langUrl(lang, `/projekte/${project.slug}`)}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden relative bg-charcoal/[0.03]">
                    {projectCovers[project.slug] && (
                      <Image
                        src={projectCovers[project.slug].src}
                        alt={project.title[lang]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: projectCovers[project.slug].objectPosition }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div>
                    <span className="inline-block bg-forest/10 text-forest text-xs uppercase tracking-wider px-3 py-1.5 rounded-full font-medium mb-4">
                      {lang === 'de' ? 'Projekt' : lang === 'es' ? 'Proyecto' : 'Project'}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-3 group-hover:text-amber transition-colors">
                      {project.title[lang]}
                    </h2>
                    <p className="text-charcoal-body leading-relaxed mb-4">
                      {project.excerpt[lang]}
                    </p>
                    <span className="inline-flex items-center text-amber font-medium">
                      {lang === 'de' ? 'Mehr erfahren' : lang === 'es' ? 'Saber más' : 'Learn more'}
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
