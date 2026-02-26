import { notFound } from 'next/navigation';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';
import Link from 'next/link';
import { langUrl } from '@/lib/hreflang';
import DonationCTA from '@/components/sections/DonationCTA';

const projectContent: Record<
  string,
  Record<string, { description: string; details: string[] }>
> = {
  educaclowns: {
    de: {
      description:
        'EducaClowns bringt professionelle Clown-Therapie zu Kindern in Krankenhäusern und sozialen Einrichtungen auf Mallorca. Durch Humor und Spiel werden Ängste abgebaut und Heilungsprozesse unterstützt.',
      details: [
        'Regelmäßige Besuche in Krankenhäusern auf Mallorca',
        'Professionell ausgebildete Clown-Therapeuten',
        'Programme für Kinder in schwierigen sozialen Situationen',
        'Workshops und Fortbildungen für Pflegepersonal',
      ],
    },
    en: {
      description:
        'EducaClowns brings professional clown therapy to children in hospitals and social institutions in Mallorca. Through humor and play, fears are reduced and healing processes supported.',
      details: [
        'Regular visits to hospitals in Mallorca',
        'Professionally trained clown therapists',
        'Programs for children in difficult social situations',
        'Workshops and training for care staff',
      ],
    },
    es: {
      description:
        'EducaClowns lleva la terapia de clown profesional a niños en hospitales e instituciones sociales de Mallorca. A través del humor y el juego, se reducen los miedos y se apoyan los procesos de curación.',
      details: [
        'Visitas regulares a hospitales de Mallorca',
        'Terapeutas de clown profesionales',
        'Programas para niños en situaciones sociales difíciles',
        'Talleres y formación para personal sanitario',
      ],
    },
  },
  pollenca: {
    de: {
      description:
        'In Pollença unterstützt die Fundació Predator verschiedene Gemeinschaftsprojekte, die das soziale Gefüge der Gemeinde stärken und lokale Initiativen fördern.',
      details: [
        'Unterstützung lokaler Bildungsinitiativen',
        'Förderung von Gemeinschaftsprojekten',
        'Kulturelle und soziale Veranstaltungen',
        'Nachhaltige Entwicklung der Gemeinde',
      ],
    },
    en: {
      description:
        'In Pollença, Fundació Predator supports various community projects that strengthen the social fabric and promote local initiatives.',
      details: [
        'Support for local educational initiatives',
        'Promotion of community projects',
        'Cultural and social events',
        'Sustainable community development',
      ],
    },
    es: {
      description:
        'En Pollença, la Fundació Predator apoya varios proyectos comunitarios que fortalecen el tejido social y promueven iniciativas locales.',
      details: [
        'Apoyo a iniciativas educativas locales',
        'Promoción de proyectos comunitarios',
        'Eventos culturales y sociales',
        'Desarrollo sostenible de la comunidad',
      ],
    },
  },
  'sos-mamas': {
    de: {
      description:
        'SOS Mamás bietet alleinerziehenden Müttern in schwierigen Lebenssituationen auf Mallorca praktische Hilfe, emotionale Unterstützung und den Weg zurück in ein selbstbestimmtes Leben.',
      details: [
        'Praktische Alltagshilfe und Beratung',
        'Emotionale Begleitung und psychologische Unterstützung',
        'Hilfe bei der Arbeitssuche und Weiterbildung',
        'Aufbau eines unterstützenden Netzwerks',
      ],
    },
    en: {
      description:
        'SOS Mamás provides single mothers in difficult life situations in Mallorca with practical help, emotional support, and a path back to independent living.',
      details: [
        'Practical daily assistance and counseling',
        'Emotional support and psychological guidance',
        'Help with job searching and further education',
        'Building a supportive network',
      ],
    },
    es: {
      description:
        'SOS Mamás ofrece a madres solteras en situaciones difíciles en Mallorca ayuda práctica, apoyo emocional y el camino de vuelta a una vida independiente.',
      details: [
        'Ayuda práctica diaria y asesoramiento',
        'Acompañamiento emocional y apoyo psicológico',
        'Ayuda en la búsqueda de empleo y formación',
        'Construcción de una red de apoyo',
      ],
    },
  },
};

export async function generateStaticParams() {
  return ['educaclowns', 'pollenca', 'sos-mamas'].flatMap((slug) =>
    ['de', 'en', 'es'].map((lang) => ({ lang, slug }))
  );
}

export default function ProjectPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = (params.lang as Lang) || 'de';
  const project = siteConfig.content.projects.items.find(
    (p) => p.slug === params.slug
  );
  const content = projectContent[params.slug]?.[lang];

  if (!project || !content) return notFound();

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="text-sm text-charcoal-muted mb-8">
              <Link href={langUrl(lang, '/')} className="hover:text-amber transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href={langUrl(lang, '/projekte')} className="hover:text-amber transition-colors">
                {siteConfig.content.projects.title[lang]}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-charcoal">{project.title[lang]}</span>
            </div>
          </FadeIn>

          {/* Hero Image placeholder */}
          <FadeIn>
            <div className="aspect-[21/9] bg-gradient-to-br from-warm-sand to-charcoal/5 rounded-2xl mb-10 overflow-hidden">
              <div className="w-full h-full bg-amber/5" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <span className="inline-block bg-forest/10 text-forest text-xs uppercase tracking-wider px-3 py-1.5 rounded-full font-medium mb-4">
              {lang === 'de' ? 'Projekt' : lang === 'es' ? 'Proyecto' : 'Project'}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              {project.title[lang]}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg text-charcoal-body leading-relaxed mb-10">
              {content.description}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-warm-sand/50 rounded-2xl p-8 mb-10">
              <h2 className="font-serif text-xl font-bold text-charcoal mb-4">
                {lang === 'de' ? 'Was wir tun' : lang === 'es' ? 'Qué hacemos' : 'What we do'}
              </h2>
              <ul className="space-y-3">
                {content.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3 text-charcoal-body">
                    <svg className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <DonationCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
