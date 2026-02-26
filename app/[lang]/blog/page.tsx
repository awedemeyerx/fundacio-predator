import { Lang } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';

export default function BlogPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as Lang) || 'de';

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-forest font-medium mb-4">
              Blog
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              {lang === 'de' ? 'Neuigkeiten' : lang === 'es' ? 'Noticias' : 'News'}
            </h1>
            <p className="text-lg text-charcoal-body">
              {lang === 'de'
                ? 'Aktuelle Berichte aus unseren Projekten.'
                : lang === 'es'
                ? 'Informes actuales de nuestros proyectos.'
                : 'Latest reports from our projects.'}
            </p>
          </FadeIn>

          {/* Blog posts will be loaded from Supabase later */}
          <div className="mt-16 text-center text-charcoal-muted">
            <p>{lang === 'de' ? 'Bald verfügbar.' : lang === 'es' ? 'Disponible pronto.' : 'Coming soon.'}</p>
          </div>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
