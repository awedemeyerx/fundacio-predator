import { Lang } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';

const content = {
  de: {
    title: 'Über uns',
    subtitle: 'Die Menschen hinter der Fundació Predator',
    story: 'Die Fundació Predator wurde gegründet, um soziale Projekte auf Mallorca nachhaltig zu unterstützen. Unsere Überzeugung: Jeder Euro soll dort ankommen, wo er gebraucht wird. Deshalb tragen wir alle Verwaltungskosten privat — 100% deiner Spende fließt direkt in unsere Projekte.',
    teamTitle: 'Unser Team',
    team: [
      { name: 'Arnd von Wedemeyer', role: 'Gründer & Vorstand' },
      { name: 'Xenia von Wedemeyer', role: 'Vorstand' },
      { name: 'Gabriel von Wedemeyer', role: 'Vorstand' },
    ],
    principlesTitle: 'Unsere Leitlinien',
    principles: [
      { title: 'Ermöglichen', text: 'Wir schaffen Strukturen, die es Menschen ermöglichen, sich selbst zu helfen.' },
      { title: 'Nachhaltig', text: 'Unsere Projekte sind auf langfristige Wirkung ausgerichtet.' },
      { title: 'Direkt', text: '100% der Spenden fließen in Projekte.' },
    ],
  },
  en: {
    title: 'About us',
    subtitle: 'The people behind Fundació Predator',
    story: 'Fundació Predator was founded to sustainably support social projects in Mallorca. Our conviction: every euro should reach where it is needed. That is why we cover all administrative costs privately — 100% of your donation goes directly to our projects.',
    teamTitle: 'Our Team',
    team: [
      { name: 'Arnd von Wedemeyer', role: 'Founder & Board Member' },
      { name: 'Xenia von Wedemeyer', role: 'Board Member' },
      { name: 'Gabriel von Wedemeyer', role: 'Board Member' },
    ],
    principlesTitle: 'Our Principles',
    principles: [
      { title: 'Enable', text: 'We create structures that empower people to help themselves.' },
      { title: 'Sustainable', text: 'Our projects focus on long-term impact.' },
      { title: 'Direct', text: '100% of donations go to projects.' },
    ],
  },
  es: {
    title: 'Sobre nosotros',
    subtitle: 'Las personas detrás de la Fundació Predator',
    story: 'La Fundació Predator fue fundada para apoyar de forma sostenible proyectos sociales en Mallorca. Nuestra convicción: cada euro debe llegar donde se necesita. Por eso cubrimos todos los costes administrativos de forma privada — el 100% de tu donación va directamente a nuestros proyectos.',
    teamTitle: 'Nuestro Equipo',
    team: [
      { name: 'Arnd von Wedemeyer', role: 'Fundador y Miembro de la Junta' },
      { name: 'Xenia von Wedemeyer', role: 'Miembro de la Junta' },
      { name: 'Gabriel von Wedemeyer', role: 'Miembro de la Junta' },
    ],
    principlesTitle: 'Nuestros Principios',
    principles: [
      { title: 'Facilitar', text: 'Creamos estructuras que permiten a las personas ayudarse a sí mismas.' },
      { title: 'Sostenible', text: 'Nuestros proyectos se centran en el impacto a largo plazo.' },
      { title: 'Directo', text: 'El 100% de las donaciones va a proyectos.' },
    ],
  },
};

export default function UeberUnsPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as Lang) || 'de';
  const c = content[lang];

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-forest font-medium mb-4">
              {c.title}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-6">
              {c.subtitle}
            </h1>
            <p className="text-lg text-charcoal-body leading-relaxed max-w-2xl mb-16">
              {c.story}
            </p>
          </FadeIn>

          {/* Team */}
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-8">
              {c.teamTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
              {c.team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-warm-sand" />
                  <h3 className="font-serif text-lg font-bold text-charcoal">
                    {member.name}
                  </h3>
                  <p className="text-sm text-charcoal-muted">{member.role}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Principles */}
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-8">
              {c.principlesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {c.principles.map((p) => (
                <div key={p.title} className="bg-warm-sand/50 rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                    {p.title}
                  </h3>
                  <p className="text-charcoal-body text-sm leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
