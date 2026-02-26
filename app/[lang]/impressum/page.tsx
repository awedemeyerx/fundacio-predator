import { Lang } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ImpressumPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as Lang) || 'de';

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6 prose prose-charcoal">
          <h1 className="font-serif">{lang === 'de' ? 'Impressum' : lang === 'es' ? 'Aviso Legal' : 'Legal Notice'}</h1>
          <h2>Fundació Predator</h2>
          <p>
            Mallorca, Spain<br />
            E-Mail: info@fundaciopredator.org
          </p>
          <p className="text-charcoal-muted text-sm">
            {lang === 'de'
              ? 'Inhalt wird von der bestehenden Seite übernommen.'
              : lang === 'es'
              ? 'El contenido se migrará del sitio existente.'
              : 'Content will be migrated from the existing site.'}
          </p>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
