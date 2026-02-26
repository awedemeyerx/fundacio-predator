'use client';

import { useState } from 'react';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';

const content = {
  de: {
    title: 'Jetzt spenden',
    subtitle: 'Jeder Beitrag macht einen Unterschied. 100% deiner Spende fließt direkt in unsere Projekte.',
    selectAmount: 'Betrag wählen',
    customAmount: 'Eigener Betrag',
    projectLabel: 'Für ein bestimmtes Projekt? (optional)',
    general: 'Allgemeine Spende',
    donateButton: 'Jetzt spenden',
    orTransfer: 'Oder per Banküberweisung',
    bankDetails: 'Bankverbindung',
    taxNote: 'Als gemeinnützige Stiftung stellen wir Spendenquittungen aus.',
  },
  en: {
    title: 'Donate now',
    subtitle: 'Every contribution makes a difference. 100% of your donation goes directly to our projects.',
    selectAmount: 'Select amount',
    customAmount: 'Custom amount',
    projectLabel: 'For a specific project? (optional)',
    general: 'General donation',
    donateButton: 'Donate now',
    orTransfer: 'Or by bank transfer',
    bankDetails: 'Bank details',
    taxNote: 'As a charitable foundation, we issue donation receipts.',
  },
  es: {
    title: 'Donar ahora',
    subtitle: 'Cada contribución marca la diferencia. El 100% de tu donación va directamente a nuestros proyectos.',
    selectAmount: 'Seleccionar cantidad',
    customAmount: 'Cantidad personalizada',
    projectLabel: '¿Para un proyecto específico? (opcional)',
    general: 'Donación general',
    donateButton: 'Donar ahora',
    orTransfer: 'O por transferencia bancaria',
    bankDetails: 'Datos bancarios',
    taxNote: 'Como fundación benéfica, emitimos recibos de donación.',
  },
};

export default function SpendenPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as Lang) || 'de';
  const c = content[lang];
  const amounts = siteConfig.content.donate.amounts;
  const projects = siteConfig.content.projects.items;

  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState('general');
  const [loading, setLoading] = useState(false);

  const finalAmount = selectedAmount || parseInt(customAmount) || 0;

  async function handleDonate() {
    if (finalAmount < 1) return;
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          project: selectedProject === 'general' ? null : selectedProject,
          lang,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                {siteConfig.content.trust.badge[lang]}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4">
                {c.title}
              </h1>
              <p className="text-lg text-charcoal-body">{c.subtitle}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-8">
              {/* Amount Selection */}
              <label className="block text-sm font-medium text-charcoal mb-3">
                {c.selectAmount}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-3 rounded-xl text-lg font-medium transition-all ${
                      selectedAmount === amount
                        ? 'bg-amber text-white shadow-md shadow-amber/20'
                        : 'bg-warm-sand text-charcoal hover:bg-amber/10'
                    }`}
                  >
                    {amount} €
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative mb-6">
                <input
                  type="number"
                  min="1"
                  placeholder={c.customAmount}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-muted">
                  €
                </span>
              </div>

              {/* Project Selection */}
              <label className="block text-sm font-medium text-charcoal mb-3">
                {c.projectLabel}
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white mb-8"
              >
                <option value="general">{c.general}</option>
                {projects.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title[lang]}
                  </option>
                ))}
              </select>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                disabled={finalAmount < 1 || loading}
                className="w-full bg-amber text-white font-medium py-4 rounded-full text-lg hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber/20"
              >
                {loading ? '...' : `${c.donateButton} — ${finalAmount} €`}
              </button>

              <p className="text-xs text-charcoal-muted text-center mt-4">
                {c.taxNote}
              </p>
            </div>
          </FadeIn>

          {/* Bank Transfer */}
          <FadeIn delay={0.2}>
            <div className="mt-12 bg-warm-sand/50 rounded-2xl p-8">
              <h2 className="font-serif text-xl font-bold text-charcoal mb-4">
                {c.orTransfer}
              </h2>
              <div className="space-y-2 text-sm text-charcoal-body">
                <p><span className="text-charcoal font-medium">IBAN:</span> ES00 0000 0000 0000 0000 0000</p>
                <p><span className="text-charcoal font-medium">BIC:</span> XXXXXXXX</p>
                <p><span className="text-charcoal font-medium">{lang === 'de' ? 'Empfänger' : lang === 'es' ? 'Beneficiario' : 'Beneficiary'}:</span> Fundació Predator</p>
                <p><span className="text-charcoal font-medium">{lang === 'de' ? 'Verwendungszweck' : lang === 'es' ? 'Concepto' : 'Reference'}:</span> Spende / Donation</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
