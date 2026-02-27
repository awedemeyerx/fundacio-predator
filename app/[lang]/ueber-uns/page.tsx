import { Lang } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';
import ContactForm from '@/components/sections/ContactForm';
import Link from 'next/link';
import Image from 'next/image';
import { langUrl } from '@/lib/hreflang';

const content = {
  de: {
    title: 'Über uns',
    subtitle: 'Die Menschen hinter der Fundació Predator',
    intro:
      'Die Fundació Predator ist eine gemeinnützige Stiftung mallorquinischen Rechts, die sich für wohltätige Zwecke auf Mallorca einsetzt.',
    whoTitle: 'Wer wir sind',
    who: 'Die Fundació Predator ist eine gemeinnützige Stiftung mallorquinischen Rechts. Eine gemeinnützige Stiftung ist eine rechtliche Körperschaft, die sich vereinfacht gesagt selbst gehört. Der Stifter stiftet ein Vermögen an die Stiftung, auf das er dann nicht mehr zugreifen kann, weil der Eigentümer an dem Stiftungsvermögen die Stiftung selber ist. Das wiederum wird von den Aufsichtsbehörden streng kontrolliert.',
    historyTitle: 'Unsere Geschichte',
    history:
      'Die Fundació Predator wurde gestiftet von der Predator SL, eine Immobilienfirma, die eigene Häuser und Wohnungen überwiegend im Raum Palma vermietet. Gegründet wurde sie von Arnd v. Wedemeyer, der vorher in Deutschland den Onlineshop notebooksbilliger.de gegründet und geführt hat. Die Unternehmen der Gruppe haben immer wohltätige Arbeit unterstützt. Aber Arnds Ziel war es, fokussierter zu agieren und eine nachhaltige Arbeit im wohltätigen Bereich zu ermöglichen.',
    historyDetail:
      'Im Dezember 2021 wurde die Fundació Predator mit 250.000 Euro Kapital von der Predator SL gestiftet. Das Direktorium besteht aus den Direktoren Arnd v. Wedemeyer, Xenia v. Wedemeyer und Gabriel Nadal-Fortuny.',
    capitalTitle: 'Stiftungskapital: € 250.000',
    capital:
      'Unser Stifter, die Predator SL, hat uns mit 250.000 Euro Stiftungskapital ausgestattet. Von den Erträgen aus der Anlage dieses Kapitals finanzieren wir die Aufwändungen in die sozialen Projekte, die wir unterstützen.',
    capitalNote:
      'Ausgaben für Büro und Personal werden von unserem Stifter übernommen, wir können also garantieren, dass Spenden und Zuwendungen die wir erhalten ohne Umwege und Abzüge zu 100% unseren Projekten zugute kommen.',
    approachTitle: 'Was machen wir anders?',
    approachSubtitle:
      'Wir möchten "Hilfe erweitern". Daher adressieren wir in erster Linie ehrenamtliche, meist kleinere Organisationen, die vor Ort Hilfe leisten. Und die wir unterstützen können mit unseren Ressourcen.',
    approach:
      'Besonderen Fokus legen wir auf Effizienz der Hilfemaßnahmen und auf deren Nachhaltigkeit. Wir möchten unseren Stiftern und auch unseren Spendern gegenüber sicherstellen, dass Ihre Hilfe uneingeschränkt ankommt. Und nicht für Verwaltungsaufgaben oder Gehälter verwendet wird.',
    missionTitle: 'Unsere Mission',
    mission:
      'Die Ungleichheit in der Welt nimmt mehr und mehr zu. Gleichzeitig gibt es viele engagierte kleine Organisationen, die in ihrer Nachbarschaft oder auch im größeren Maßstab Dinge anpacken. Und helfen. Die möchten wir unterstützen, damit sie noch besser helfen können.',
    visionTitle: 'Unsere Vision',
    vision:
      'Wir glauben daran, dass jeder in der Gesellschaft seinen Anteil dazu beitragen sollte, unsere Welt zu einer besseren Welt zu machen. Jeder, nach seinen Möglichkeiten. Wir können Organisationen Ressourcen anbieten, die sie brauchen, um die fantastische Arbeit, die sie meist schon lange vor Ort durchführen, zu unterstützen.',
    mallorcaTitle: 'Hilfe auf Mallorca',
    mallorca:
      'Wir möchten Projekte auf Mallorca unterstützen, weil Mallorca unsere Heimat ist. Und weil wir nur in der Nähe unsere Richtlinien gut und effizient umsetzen können, insbesondere die direkte Betreuung der Projekte vor Ort.',
    helpTitle: 'Wie Du helfen kannst',
    helpVolunteerTitle: 'Freiwilligen-Programm',
    helpVolunteer:
      'Ob Ihr uns dabei helft, Projekte zu finden und zu betreuen, oder in Projekten Arbeitsleistung einbringen möchtet — wir freuen uns über jede Hilfe!',
    helpSponsorTitle: 'Sponsoren-Programm',
    helpSponsor:
      'Wie wäre es, wenn Eure Firma eine Patenschaft für ein Projekt übernimmt? Wir kümmern uns um das Setup und auch um die PR. Damit Eure Hilfe nicht mehr abstrakt und fern ist, sondern ein konkretes Projekt, mit dem Ihr und Eure Kollegen Euch identifizieren könnt.',
    helpDonateTitle: 'Spende an uns',
    helpDonate:
      'Spenden gehen zu 100% in unsere Projekte. Kein Cent geht für Verwaltung, Personal oder andere Kosten drauf. Versprochen! Durch unsere Gemeinnützigkeit erstellen wir gerne Spendenquittungen, die in Spanien und Deutschland steuerlich nutzbar sind.',
    donateCta: 'Jetzt spenden',
    teamTitle: 'Direktorium',
    team: [
      { name: 'Arnd von Wedemeyer', role: 'Presidente' },
      { name: 'Xenia von Wedemeyer', role: 'Co-Presidente' },
      { name: 'Gabriel Nadal Fortuny', role: 'Secretario' },
    ],
  },
  en: {
    title: 'About us',
    subtitle: 'The people behind Fundació Predator',
    intro:
      'Fundació Predator is a non-profit foundation under Mallorcan law that works for charitable purposes in Mallorca.',
    whoTitle: 'Who we are',
    who: 'The Fundació Predator is a non-profit foundation under Mallorcan law. A charitable foundation is a legal entity that, in simple terms, owns itself. The founder donates assets to the foundation, which they can no longer access because the owner of the foundation\'s assets is the foundation itself. This in turn is strictly controlled by regulatory authorities.',
    historyTitle: 'Our History',
    history:
      'Fundació Predator was established by Predator SL, a real estate company that rents out its own houses and apartments mainly in the Palma area. It was founded by Arnd v. Wedemeyer, who previously founded and ran the online shop notebooksbilliger.de in Germany. The group\'s companies have always supported charitable work. But Arnd\'s goal was to act more focused and enable sustainable charitable work.',
    historyDetail:
      'In December 2021, Fundació Predator was established with €250,000 in capital from Predator SL. The board of directors consists of Arnd v. Wedemeyer, Xenia v. Wedemeyer and Gabriel Nadal-Fortuny.',
    capitalTitle: 'Foundation Capital: € 250,000',
    capital:
      'Our founder, Predator SL, has endowed us with €250,000 in foundation capital. We finance the expenditures on the social projects we support from the returns on this capital.',
    capitalNote:
      'Office and staff expenses are covered by our founder, so we can guarantee that 100% of donations and contributions we receive go directly to our projects, without detours or deductions.',
    approachTitle: 'What do we do differently?',
    approachSubtitle:
      'We want to "extend help". Therefore, we primarily address voluntary, mostly smaller organizations that provide assistance on the ground. And which we can support with our resources.',
    approach:
      'We place particular emphasis on the efficiency of the aid measures and their sustainability. We want to ensure our donors that their help will be received in full. And not used for administrative tasks or salaries.',
    missionTitle: 'Our Mission',
    mission:
      'Inequality in the world is increasing more and more. At the same time, there are many dedicated small organizations that are tackling things in their neighborhoods or on a larger scale. And help. We would like to support them so that they can help even better.',
    visionTitle: 'Our Vision',
    vision:
      'We believe that everyone in society should do their part to make our world a better place. Each, according to their possibilities. We can offer organizations resources they need to support the fantastic work they\'ve mostly been doing on the ground for a long time.',
    mallorcaTitle: 'Help in Mallorca',
    mallorca:
      'We want to support projects in Mallorca because Mallorca is our home. And because we can only implement our guidelines well and efficiently nearby, especially the direct supervision of projects on the ground.',
    helpTitle: 'How you can help',
    helpVolunteerTitle: 'Volunteer Program',
    helpVolunteer:
      'Whether you help us find and supervise projects, or want to contribute your skills to projects — we welcome any help!',
    helpSponsorTitle: 'Sponsorship Program',
    helpSponsor:
      'How about your company sponsoring a project? We take care of the setup and PR. So your help is no longer abstract and distant, but a concrete project that you and your colleagues can identify with.',
    helpDonateTitle: 'Donate to us',
    helpDonate:
      'Donations go 100% to our projects. Not a cent goes to administration, staff or other costs. Promised! Through our non-profit status, we are happy to issue donation receipts that can be used for tax purposes in both Spain and Germany.',
    donateCta: 'Donate now',
    teamTitle: 'Board of Directors',
    team: [
      { name: 'Arnd von Wedemeyer', role: 'President' },
      { name: 'Xenia von Wedemeyer', role: 'Co-President' },
      { name: 'Gabriel Nadal Fortuny', role: 'Secretary' },
    ],
  },
  es: {
    title: 'Sobre nosotros',
    subtitle: 'Las personas detrás de la Fundació Predator',
    intro:
      'La Fundació Predator es una fundación sin ánimo de lucro de derecho mallorquín que trabaja con fines benéficos en Mallorca.',
    whoTitle: 'Quiénes somos',
    who: 'La Fundació Predator es una fundación sin ánimo de lucro de derecho mallorquín. Una fundación benéfica es una entidad jurídica que, simplificando, se pertenece a sí misma. El fundador dona un patrimonio a la fundación, al que ya no puede acceder porque el propietario del patrimonio de la fundación es la propia fundación. Esto a su vez es estrictamente controlado por las autoridades reguladoras.',
    historyTitle: 'Nuestra historia',
    history:
      'La Fundació Predator fue creada por Predator SL, una empresa inmobiliaria que alquila viviendas propias principalmente en la zona de Palma. Fue fundada por Arnd v. Wedemeyer, quien anteriormente fundó y dirigió la tienda online notebooksbilliger.de en Alemania. Las empresas del grupo siempre han apoyado el trabajo benéfico. Pero el objetivo de Arnd era actuar de forma más enfocada y posibilitar un trabajo benéfico sostenible.',
    historyDetail:
      'En diciembre de 2021, la Fundació Predator fue dotada con un capital de 250.000 euros por Predator SL. El patronato está formado por Arnd v. Wedemeyer, Xenia v. Wedemeyer y Gabriel Nadal-Fortuny.',
    capitalTitle: 'Capital fundacional: € 250.000',
    capital:
      'Nuestro fundador, Predator SL, nos ha dotado con 250.000 euros de capital fundacional. Financiamos los gastos de los proyectos sociales que apoyamos con los rendimientos de este capital.',
    capitalNote:
      'Los gastos de oficina y personal son asumidos por nuestro fundador, por lo que podemos garantizar que el 100% de las donaciones y aportaciones que recibimos van directamente a nuestros proyectos, sin intermediarios ni deducciones.',
    approachTitle: '¿Qué hacemos diferente?',
    approachSubtitle:
      'Queremos "ampliar la ayuda". Por ello, nos dirigimos principalmente a organizaciones voluntarias, generalmente más pequeñas, que proporcionan ayuda sobre el terreno. Y a las que podemos apoyar con nuestros recursos.',
    approach:
      'Ponemos especial énfasis en la eficiencia de las medidas de ayuda y en su sostenibilidad. Queremos garantizar a nuestros donantes que su ayuda llega íntegramente. Y que no se utiliza para tareas administrativas o salarios.',
    missionTitle: 'Nuestra misión',
    mission:
      'La desigualdad en el mundo aumenta cada vez más. Al mismo tiempo, hay muchas organizaciones pequeñas comprometidas que abordan problemas en su vecindario o a mayor escala. Y ayudan. Queremos apoyarlas para que puedan ayudar aún mejor.',
    visionTitle: 'Nuestra visión',
    vision:
      'Creemos que todos en la sociedad deberían contribuir a hacer de nuestro mundo un lugar mejor. Cada uno, según sus posibilidades. Podemos ofrecer a las organizaciones los recursos que necesitan para apoyar el fantástico trabajo que llevan realizando sobre el terreno desde hace mucho tiempo.',
    mallorcaTitle: 'Ayuda en Mallorca',
    mallorca:
      'Queremos apoyar proyectos en Mallorca porque Mallorca es nuestro hogar. Y porque solo cerca podemos implementar nuestras directrices de forma eficiente, especialmente la supervisión directa de los proyectos sobre el terreno.',
    helpTitle: 'Cómo puedes ayudar',
    helpVolunteerTitle: 'Programa de voluntariado',
    helpVolunteer:
      'Ya sea ayudándonos a encontrar y supervisar proyectos, o aportando tu trabajo en los proyectos — ¡toda ayuda es bienvenida!',
    helpSponsorTitle: 'Programa de patrocinio',
    helpSponsor:
      '¿Qué tal si tu empresa apadrina un proyecto? Nos encargamos de la organización y la comunicación. Para que tu ayuda deje de ser abstracta y lejana, y se convierta en un proyecto concreto con el que tú y tus compañeros podáis identificaros.',
    helpDonateTitle: 'Dona',
    helpDonate:
      'Las donaciones van al 100% a nuestros proyectos. Ni un céntimo se destina a administración, personal u otros gastos. ¡Prometido! Gracias a nuestra condición de entidad sin ánimo de lucro, emitimos recibos de donación válidos fiscalmente tanto en España como en Alemania.',
    donateCta: 'Donar ahora',
    teamTitle: 'Patronato',
    team: [
      { name: 'Arnd von Wedemeyer', role: 'Presidente' },
      { name: 'Xenia von Wedemeyer', role: 'Co-Presidente' },
      { name: 'Gabriel Nadal Fortuny', role: 'Secretario' },
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
            <p className="text-lg text-charcoal-body leading-relaxed max-w-2xl mb-10">
              {c.intro}
            </p>
          </FadeIn>

          {/* Hero image */}
          <FadeIn delay={0.05}>
            <div className="aspect-[2.5/1] relative rounded-2xl overflow-hidden mb-16">
              <Image
                src="/images/about/charity-hero.png"
                alt="Fundació Predator"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
            </div>
          </FadeIn>

          {/* Who we are */}
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">
              {c.whoTitle}
            </h2>
            <p className="text-charcoal-body leading-relaxed mb-6">{c.who}</p>
          </FadeIn>

          {/* History */}
          <FadeIn delay={0.15}>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">
              {c.historyTitle}
            </h2>
            <p className="text-charcoal-body leading-relaxed mb-4">{c.history}</p>
            <p className="text-charcoal-body leading-relaxed mb-12">{c.historyDetail}</p>
          </FadeIn>

          {/* Team */}
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-8">
              {c.teamTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
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

          {/* Capital */}
          <FadeIn delay={0.25}>
            <div className="bg-warm-sand/50 rounded-2xl p-8 mb-12">
              <h2 className="font-serif text-xl font-bold text-charcoal mb-4">
                {c.capitalTitle}
              </h2>
              <p className="text-charcoal-body leading-relaxed mb-3">{c.capital}</p>
              <p className="text-charcoal-body leading-relaxed">{c.capitalNote}</p>
            </div>
          </FadeIn>

          {/* Approach */}
          <FadeIn delay={0.3}>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">
              {c.approachTitle}
            </h2>
            <p className="text-lg text-charcoal-body leading-relaxed italic mb-4">
              {c.approachSubtitle}
            </p>
            <p className="text-charcoal-body leading-relaxed mb-12">{c.approach}</p>
          </FadeIn>

          {/* Mission & Vision */}
          <FadeIn delay={0.35}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-warm-sand/50 rounded-2xl p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                  {c.missionTitle}
                </h3>
                <p className="text-charcoal-body text-sm leading-relaxed">
                  {c.mission}
                </p>
              </div>
              <div className="bg-warm-sand/50 rounded-2xl p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                  {c.visionTitle}
                </h3>
                <p className="text-charcoal-body text-sm leading-relaxed">
                  {c.vision}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Mallorca */}
          <FadeIn delay={0.4}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h2 className="font-serif text-2xl font-bold text-charcoal mb-4">
                  {c.mallorcaTitle}
                </h2>
                <p className="text-charcoal-body leading-relaxed">{c.mallorca}</p>
              </div>
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/girl-with-heart.webp"
                  alt="Fundació Predator — Mallorca"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 448px"
                />
              </div>
            </div>
          </FadeIn>

          {/* How to help */}
          <FadeIn delay={0.45}>
            <h2 className="font-serif text-2xl font-bold text-charcoal mb-8">
              {c.helpTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="bg-warm-sand/50 rounded-2xl p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                  {c.helpVolunteerTitle}
                </h3>
                <p className="text-charcoal-body text-sm leading-relaxed">
                  {c.helpVolunteer}
                </p>
              </div>
              <div className="bg-warm-sand/50 rounded-2xl p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                  {c.helpSponsorTitle}
                </h3>
                <p className="text-charcoal-body text-sm leading-relaxed">
                  {c.helpSponsor}
                </p>
              </div>
              <div className="bg-warm-sand/50 rounded-2xl p-6">
                <h3 className="font-serif text-lg font-bold text-charcoal mb-2">
                  {c.helpDonateTitle}
                </h3>
                <p className="text-charcoal-body text-sm leading-relaxed mb-4">
                  {c.helpDonate}
                </p>
                <Link
                  href={langUrl(lang, '/spenden')}
                  className="inline-block bg-amber text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-600 transition-colors"
                >
                  {c.donateCta}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <ContactForm lang={lang} page="ueber-uns" />
      <Footer lang={lang} />
    </>
  );
}
