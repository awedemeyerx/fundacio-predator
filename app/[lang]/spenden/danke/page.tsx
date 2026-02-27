'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lang } from '@/lib/types';
import { langUrl } from '@/lib/hreflang';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';

const projectNames: Record<string, string> = {
  educaclowns: 'EducaClowns',
  pollenca: 'Pollença',
  'sos-mamas': 'SOS Mamás',
};

const texts = {
  de: {
    thanks: 'Vielen Dank für deine Spende!',
    amount: 'Deine Spende',
    project: 'Projekt',
    generalDonation: 'Allgemeine Spende',
    formTitle: 'Daten für deine Spendenquittung',
    formHint: 'Mit diesen Angaben können wir dir eine Spendenquittung ausstellen.',
    firstName: 'Vorname',
    lastName: 'Nachname',
    company: 'Firma (optional)',
    taxId: 'Steuernummer / NIF (optional)',
    street: 'Straße + Hausnummer',
    postalCode: 'PLZ',
    city: 'Stadt',
    country: 'Land',
    newsletter: 'Ich möchte über die Arbeit der Fundació informiert bleiben',
    save: 'Speichern',
    saved: 'Gespeichert!',
    home: 'Zurück zur Startseite',
    projects: 'Unsere Projekte',
  },
  en: {
    thanks: 'Thank you for your donation!',
    amount: 'Your donation',
    project: 'Project',
    generalDonation: 'General donation',
    formTitle: 'Details for your donation receipt',
    formHint: 'With this information we can issue a donation receipt for you.',
    firstName: 'First name',
    lastName: 'Last name',
    company: 'Company (optional)',
    taxId: 'Tax ID / NIF (optional)',
    street: 'Street + number',
    postalCode: 'Postal code',
    city: 'City',
    country: 'Country',
    newsletter: 'I would like to stay informed about the work of the Fundació',
    save: 'Save',
    saved: 'Saved!',
    home: 'Back to homepage',
    projects: 'Our projects',
  },
  es: {
    thanks: '¡Gracias por tu donación!',
    amount: 'Tu donación',
    project: 'Proyecto',
    generalDonation: 'Donación general',
    formTitle: 'Datos para tu recibo de donación',
    formHint: 'Con estos datos podemos emitir un recibo de donación.',
    firstName: 'Nombre',
    lastName: 'Apellidos',
    company: 'Empresa (opcional)',
    taxId: 'NIF / CIF (opcional)',
    street: 'Calle + número',
    postalCode: 'Código postal',
    city: 'Ciudad',
    country: 'País',
    newsletter: 'Quiero recibir información sobre el trabajo de la Fundació',
    save: 'Guardar',
    saved: '¡Guardado!',
    home: 'Volver al inicio',
    projects: 'Nuestros proyectos',
  },
};

export default function DankePage({ params }: { params: { lang: string } }) {
  return (
    <Suspense>
      <DankeContent lang={(params.lang as Lang) || 'de'} />
    </Suspense>
  );
}

interface DonorData {
  first_name?: string;
  last_name?: string;
  email?: string;
  company?: string;
  tax_id?: string;
  address_line1?: string;
  address_city?: string;
  address_postal_code?: string;
  address_country?: string;
  newsletter_optin?: boolean;
}

function DankeContent({ lang }: { lang: Lang }) {
  const t = texts[lang];
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [amountCents, setAmountCents] = useState(0);
  const [currency, setCurrency] = useState('eur');
  const [project, setProject] = useState<string | null>(null);
  const [donor, setDonor] = useState<DonorData>({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [taxId, setTaxId] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!sessionId) { setLoading(false); return; }
    fetch(`/api/donation/${sessionId}`)
      .then(r => r.json())
      .then(data => {
        if (data.donation) {
          setAmountCents(data.donation.amount_cents);
          setCurrency(data.donation.currency);
          setProject(data.donation.project);
        }
        if (data.donor) {
          setDonor(data.donor);
          setFirstName(data.donor.first_name || '');
          setLastName(data.donor.last_name || '');
          setCompany(data.donor.company || '');
          setTaxId(data.donor.tax_id || '');
          setStreet(data.donor.address_line1 || '');
          setPostalCode(data.donor.address_postal_code || '');
          setCity(data.donor.address_city || '');
          setCountry(data.donor.address_country || '');
          setNewsletter(data.donor.newsletter_optin || false);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId) return;
    setSaving(true);
    try {
      await fetch(`/api/donation/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          company: company || null,
          tax_id: taxId || null,
          address_line1: street,
          address_city: city,
          address_postal_code: postalCode,
          address_country: country,
          newsletter_optin: newsletter,
        }),
      });
      setSaved(true);
    } catch {
      // silent
    }
    setSaving(false);
  }

  const amountFormatted = (amountCents / 100).toLocaleString(lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-ES' : 'en-US', {
    minimumFractionDigits: 2,
  });
  const projectLabel = project && project !== 'general' ? projectNames[project] || project : null;

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-charcoal-muted">Loading...</div>
          ) : (
            <>
              {/* Thank You Header */}
              <FadeIn>
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mb-4">
                    {t.thanks}
                  </h1>

                  {amountCents > 0 && (
                    <div className="inline-flex flex-col items-center bg-warm-sand rounded-2xl px-8 py-5 mt-2">
                      <span className="text-sm text-charcoal-muted">{t.amount}</span>
                      <span className="text-2xl font-bold text-charcoal">{amountFormatted} {currency.toUpperCase()}</span>
                      {projectLabel && (
                        <span className="text-sm text-charcoal-body mt-1">{t.project}: {projectLabel}</span>
                      )}
                      {!projectLabel && (
                        <span className="text-sm text-charcoal-muted mt-1">{t.generalDonation}</span>
                      )}
                    </div>
                  )}
                </div>
              </FadeIn>

              {/* Data Form */}
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-8">
                  <h2 className="font-serif text-xl font-bold text-charcoal mb-2">{t.formTitle}</h2>
                  <p className="text-sm text-charcoal-muted mb-6">{t.formHint}</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">{t.firstName}</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={e => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">{t.lastName}</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={e => setLastName(e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">{t.company}</label>
                        <input
                          type="text"
                          value={company}
                          onChange={e => setCompany(e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">{t.taxId}</label>
                        <input
                          type="text"
                          value={taxId}
                          onChange={e => setTaxId(e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-1">{t.street}</label>
                      <input
                        type="text"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">{t.postalCode}</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={e => setPostalCode(e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-1">{t.city}</label>
                        <input
                          type="text"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium text-charcoal mb-1">{t.country}</label>
                        <input
                          type="text"
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 py-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={e => setNewsletter(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-charcoal/20 text-amber focus:ring-amber/30"
                      />
                      <span className="text-sm text-charcoal-body">{t.newsletter}</span>
                    </label>

                    <button
                      type="submit"
                      disabled={saving || saved}
                      className="w-full bg-amber text-white font-medium py-3 rounded-full text-base hover:bg-amber-600 transition-all disabled:opacity-50"
                    >
                      {saved ? t.saved : saving ? '...' : t.save}
                    </button>
                  </form>
                </div>
              </FadeIn>

              {/* Links */}
              <FadeIn delay={0.2}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                  <Link
                    href={langUrl(lang, '/')}
                    className="text-sm text-charcoal-body hover:text-amber transition-colors"
                  >
                    {t.home}
                  </Link>
                  <span className="hidden sm:inline text-charcoal/20">·</span>
                  <Link
                    href={langUrl(lang, '/kampagne')}
                    className="text-sm text-charcoal-body hover:text-amber transition-colors"
                  >
                    {t.projects}
                  </Link>
                </div>
              </FadeIn>
            </>
          )}
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
