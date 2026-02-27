import { Lang } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const text = {
  de: {
    title: 'Impressum',
    intro: 'Angaben gemäß § 5 TMG / Ley 34/2002 (LSSI-CE):',
    legalForm: 'Rechtsform',
    legalFormText:
      'Die Fundació Predator ist eine gemeinnützige Körperschaft mallorquinischen Rechts, eingetragen im Registro de Fundaciones de las Islas Baleares.',
    directorate: 'Direktorium',
    address: 'Anschrift',
    contact: 'Kontakt',
    cif: 'Steuer-Identifikationsnummer (CIF)',
    responsible: 'Verantwortlich für den Inhalt',
    responsibleText: 'Arnd von Wedemeyer (Presidente)',
    dispute:
      'Streitschlichtung: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
    disputeLink: 'https://ec.europa.eu/consumers/odr/',
    disputeNote:
      'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
  },
  en: {
    title: 'Legal Notice',
    intro: 'Information in accordance with § 5 TMG / Ley 34/2002 (LSSI-CE):',
    legalForm: 'Legal Form',
    legalFormText:
      'The Fundació Predator is a charitable foundation under Mallorcan law, registered with the Registro de Fundaciones de las Islas Baleares (Foundation Registry of the Balearic Islands).',
    directorate: 'Board of Directors',
    address: 'Address',
    contact: 'Contact',
    cif: 'Tax Identification Number (CIF)',
    responsible: 'Responsible for Content',
    responsibleText: 'Arnd von Wedemeyer (President)',
    dispute:
      'Dispute Resolution: The European Commission provides a platform for online dispute resolution (ODR):',
    disputeLink: 'https://ec.europa.eu/consumers/odr/',
    disputeNote:
      'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
  },
  es: {
    title: 'Aviso Legal',
    intro:
      'Información en cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE):',
    legalForm: 'Forma jurídica',
    legalFormText:
      'La Fundació Predator es una fundación sin ánimo de lucro de derecho mallorquín, inscrita en el Registro de Fundaciones de las Islas Baleares.',
    directorate: 'Patronato',
    address: 'Domicilio social',
    contact: 'Contacto',
    cif: 'Número de Identificación Fiscal (CIF)',
    responsible: 'Responsable del contenido',
    responsibleText: 'Arnd von Wedemeyer (Presidente)',
    dispute:
      'Resolución de litigios: La Comisión Europea facilita una plataforma de resolución de litigios en línea (ODR):',
    disputeLink: 'https://ec.europa.eu/consumers/odr/',
    disputeNote:
      'No estamos obligados ni dispuestos a participar en procedimientos de resolución de litigios ante una junta de arbitraje de consumo.',
  },
};

export default function ImpressumPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as Lang) || 'de';
  const t = text[lang];

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6 prose prose-charcoal">
          <h1 className="font-serif">{t.title}</h1>

          <p>{t.intro}</p>

          <h2>Fundació Predator</h2>

          <h3>{t.legalForm}</h3>
          <p>{t.legalFormText}</p>

          <h3>{t.directorate}</h3>
          <ul>
            <li>Arnd von Wedemeyer — Presidente</li>
            <li>Xenia von Wedemeyer — Co-Presidente</li>
            <li>Gabriel Nadal Fortuny — Secretario</li>
          </ul>

          <h3>{t.address}</h3>
          <p>
            C/ Vicari Joaquim Fuster, 31
            <br />
            07006 Palma (Portixol)
            <br />
            Illes Balears, España
          </p>

          <h3>{t.contact}</h3>
          <p>
            E-Mail:{' '}
            <a href="mailto:info@fundaciopredator.org">info@fundaciopredator.org</a>
          </p>

          <h3>{t.cif}</h3>
          <p>G09676479</p>

          <h3>{t.responsible}</h3>
          <p>{t.responsibleText}</p>

          <h3>{lang === 'de' ? 'Streitschlichtung' : lang === 'es' ? 'Resolución de litigios' : 'Dispute Resolution'}</h3>
          <p>
            {t.dispute}
            <br />
            <a
              href={t.disputeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.disputeLink}
            </a>
          </p>
          <p>{t.disputeNote}</p>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
