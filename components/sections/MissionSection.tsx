'use client';

import { Lang } from '@/lib/types';
import FadeIn from '@/components/ui/FadeIn';

const pillars = {
  de: [
    {
      icon: '🤝',
      title: 'Ermöglichen',
      text: 'Wir schaffen Strukturen, die es Menschen ermöglichen, sich selbst zu helfen.',
    },
    {
      icon: '🌱',
      title: 'Nachhaltig',
      text: 'Unsere Projekte sind auf langfristige Wirkung ausgerichtet, nicht auf kurzfristige Effekte.',
    },
    {
      icon: '🎯',
      title: 'Direkt',
      text: '100% der Spenden fließen in Projekte. Verwaltungskosten tragen wir privat.',
    },
  ],
  en: [
    {
      icon: '🤝',
      title: 'Enable',
      text: 'We create structures that empower people to help themselves.',
    },
    {
      icon: '🌱',
      title: 'Sustainable',
      text: 'Our projects focus on long-term impact, not short-term effects.',
    },
    {
      icon: '🎯',
      title: 'Direct',
      text: '100% of donations go to projects. We cover administrative costs privately.',
    },
  ],
  es: [
    {
      icon: '🤝',
      title: 'Facilitar',
      text: 'Creamos estructuras que permiten a las personas ayudarse a sí mismas.',
    },
    {
      icon: '🌱',
      title: 'Sostenible',
      text: 'Nuestros proyectos se centran en el impacto a largo plazo, no en efectos a corto plazo.',
    },
    {
      icon: '🎯',
      title: 'Directo',
      text: 'El 100% de las donaciones va a proyectos. Los costes administrativos los cubrimos de forma privada.',
    },
  ],
};

const sectionTitle = {
  de: 'Unsere Leitlinien',
  en: 'Our Principles',
  es: 'Nuestros Principios',
};

export default function MissionSection({ lang }: { lang: Lang }) {
  return (
    <section className="py-20 sm:py-28 bg-warm-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-forest font-medium mb-4 text-center">
            {sectionTitle[lang]}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {pillars[lang].map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.15}>
              <div className="text-center p-8">
                <div className="text-4xl mb-5">{pillar.icon}</div>
                <h3 className="font-serif text-xl font-bold text-charcoal mb-3">
                  {pillar.title}
                </h3>
                <p className="text-charcoal-body leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
