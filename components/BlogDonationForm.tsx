'use client';

import { useState } from 'react';
import { Lang } from '@/lib/types';
import { siteConfig } from '@/lib/site.config';

const content = {
  de: {
    heading: 'Hilf uns mit Deiner Spende,',
    heading2: 'gemeinsam tun wir noch mehr Gutes!',
    body: [
      'Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten!',
      'Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute.',
      'Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.',
    ],
    customAmount: 'Eigener Betrag',
    donateButton: 'Jetzt spenden',
  },
  en: {
    heading: 'Help us with your donation,',
    heading2: 'together we do even more good!',
    body: [
      'We promise: not a single cent of your donation goes towards bureaucracy. Neither with us, nor in our projects!',
      'If you are considering a larger donation, we would be happy to set up project sponsorships — for companies and individuals alike.',
      'Your contributions to the Fundació Predator are contributions to a charitable organisation and are tax-deductible in both Germany and Spain.',
    ],
    customAmount: 'Custom amount',
    donateButton: 'Donate now',
  },
  es: {
    heading: 'Ayúdanos con tu donación,',
    heading2: '¡juntos hacemos aún más bien!',
    body: [
      'Prometido: ni un solo céntimo de tu donación se destina a burocracia. Ni con nosotros, ni en nuestros proyectos.',
      'Si estás pensando en una donación mayor, estaremos encantados de establecer patrocinios de proyectos, tanto para empresas como para particulares.',
      'Tus contribuciones a la Fundació Predator son contribuciones a una entidad benéfica y son deducibles fiscalmente tanto en Alemania como en España.',
    ],
    customAmount: 'Cantidad personalizada',
    donateButton: 'Donar ahora',
  },
};

export default function BlogDonationForm({ lang }: { lang: Lang }) {
  const c = content[lang];
  const amounts = siteConfig.content.donate.amounts;

  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
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
          project: 'blog',
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
    <div className="bg-warm-sand/40 rounded-2xl p-8 sm:p-10">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
          {c.heading}<br />{c.heading2}
        </h2>
        <div className="text-[15px] text-charcoal-body/70 mt-4 max-w-lg mx-auto leading-relaxed space-y-3">
          {c.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Amount buttons */}
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
                : 'bg-white text-charcoal hover:bg-amber/10'
            }`}
          >
            {amount} €
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="relative mb-5">
        <input
          type="number"
          min="1"
          placeholder={c.customAmount}
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(null);
          }}
          className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-white"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-muted">€</span>
      </div>

      {/* Donate button */}
      <button
        onClick={handleDonate}
        disabled={finalAmount < 1 || loading}
        className="w-full bg-amber text-white font-medium py-4 rounded-full text-lg hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber/20"
      >
        {loading ? '...' : `${c.donateButton} — ${finalAmount} €`}
      </button>
    </div>
  );
}
