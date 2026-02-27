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
  Record<string, { description: string; sections: { heading: string; text: string }[]; cta: string }>
> = {
  educaclowns: {
    de: {
      description:
        'Educaclowns Mallorca ist eine gemeinnützige Organisation, die Ende 2015 auf Mallorca von qualifizierten Künstlerinnen und Künstlern gegründet wurde. Ihr Ziel ist es, darstellende Künste, besonders die Kunst des Clownings, therapeutisch einzusetzen, um die Lebensqualität von Kindern, Jugendlichen und marginalisierten Gruppen zu verbessern und deren soziale Integration zu fördern.',
      sections: [
        {
          heading: 'Was machen sie?',
          text: 'Educaclowns Mallorca arbeitet mit Kindern in Aufnahmezentren, Jugendlichen, älteren Menschen und Menschen mit Zerebralparese sowie international. Sie bieten sozio-pädagogische Programme, Workshops und Aufführungen an. Ein Beispiel ist das Projekt „Sonrisas Ganadoras" mit der Fundació Miquel Jaume-Palma Futsal, das Clowning und Sport zur Förderung von Kindern in Pflegezentren nutzt. Sie erhalten auch Unterstützung für ihre Projekte vom Consell de Mallorca.',
        },
        {
          heading: 'Warum Clowns?',
          text: 'Educaclowns Mallorca setzt auf die Kunst des Clownings, weil sie ein wirkungsvolles Werkzeug ist, um Werte zu vermitteln und zu motivieren. Durch Spiel und andere Elemente des sozialen Clownings können sie aufklären und das Bewusstsein für wichtige Themen stärken. Sie sind davon überzeugt, dass alle Kinder ein Recht auf ein Lächeln haben. Für ältere Menschen in Seniorenheimen gilt ihr Motto: „Lachen kennt kein Alter". Humor und Lachen können Barrieren abbauen und eine positive Verbindung zu den Menschen herstellen, mit denen sie arbeiten.',
        },
        {
          heading: 'Wirkung und Zusammenarbeit',
          text: 'Die Arbeit von Educaclowns Mallorca hat nachweislich positive Auswirkungen. Sozialarbeiter und Pädagogen berichten von sehr zufriedenstellenden Erfahrungen und beobachten positive therapeutische und pädagogische Effekte bei den Kindern und sogar im Team der Betreuer. Educaclowns Mallorca arbeitet mit einer Vielzahl von Organisationen zusammen, darunter das Consell de Mallorca, das Hospital de Son Espases, das Geriátrico del IMAS und ProyectoHombre.',
        },
      ],
      cta: 'Wir unterstützen Educaclowns monatlich durch einen festen Betrag seit 2023. Wir würden die Unterstützung gerne ausbauen, weil wir uns selber ein Bild davon machen konnten, wie wertvoll die Arbeit dieser Organisation ist.',
    },
    en: {
      description:
        'Educaclowns Mallorca is a non-profit organization which was founded by qualified artists in Mallorca at the end of 2015. Its aim is to use the performing arts, especially the art of clowning, therapeutically to improve the quality of life of children, young people and marginalized groups and to promote their social integration.',
      sections: [
        {
          heading: 'What do they do?',
          text: 'Educaclowns Mallorca works with children in reception centers, young people, older people and people with cerebral palsy, as well as internationally. They offer socio-educational programs, workshops and performances. One example is the "Sonrisas Ganadoras" project with the Fundació Miquel Jaume-Palma Futsal, which uses clowning and sport to support children in care centers. They also receive support for their projects from the Consell de Mallorca.',
        },
        {
          heading: 'Why clowns?',
          text: 'Educaclowns Mallorca relies on the art of clowning because it is an effective tool to convey values and motivate. Through play and other elements of social clowning, they can educate and raise awareness of important issues. They are convinced that all children have a right to a smile. For older people in retirement homes, their motto is: "Laughter knows no age". Humor and laughter can break down barriers and create a positive connection with the people they work with.',
        },
        {
          heading: 'Impact and cooperation',
          text: 'The work of Educaclowns Mallorca has demonstrably positive effects. Social workers and educators report very satisfactory experiences and observe positive therapeutic and educational effects in the children and even in the team of caregivers. Educaclowns Mallorca works with a variety of organizations, including the Consell de Mallorca, the Hospital de Son Espases, the Geriátrico del IMAS and ProyectoHombre.',
        },
      ],
      cta: 'We have been supporting Educaclowns with a fixed monthly amount since 2023, and we would like to extend our support because we have seen for ourselves how valuable the work of this organization is.',
    },
    es: {
      description:
        'Educaclowns Mallorca es una organización sin ánimo de lucro fundada a finales de 2015 en Mallorca por artistas cualificados. Su objetivo es utilizar las artes escénicas, especialmente el arte del clown, de forma terapéutica para mejorar la calidad de vida de niños, jóvenes y grupos marginalizados y promover su integración social.',
      sections: [
        {
          heading: '¿Qué hacen?',
          text: 'Educaclowns Mallorca trabaja con niños en centros de acogida, jóvenes, personas mayores y personas con parálisis cerebral, así como a nivel internacional. Ofrecen programas socioeducativos, talleres y espectáculos. Un ejemplo es el proyecto „Sonrisas Ganadoras" con la Fundació Miquel Jaume-Palma Futsal, que utiliza el clown y el deporte para apoyar a niños en centros de acogida. También reciben apoyo del Consell de Mallorca para sus proyectos.',
        },
        {
          heading: '¿Por qué payasos?',
          text: 'Educaclowns Mallorca apuesta por el arte del clown porque es una herramienta eficaz para transmitir valores y motivar. A través del juego y otros elementos del clown social, pueden educar y concienciar sobre temas importantes. Están convencidos de que todos los niños tienen derecho a una sonrisa. Para las personas mayores en residencias, su lema es: „La risa no tiene edad". El humor y la risa pueden derribar barreras y crear una conexión positiva con las personas con las que trabajan.',
        },
        {
          heading: 'Impacto y colaboración',
          text: 'El trabajo de Educaclowns Mallorca tiene efectos positivos demostrados. Trabajadores sociales y educadores informan de experiencias muy satisfactorias y observan efectos terapéuticos y pedagógicos positivos en los niños e incluso en el equipo de cuidadores. Educaclowns Mallorca colabora con diversas organizaciones, entre ellas el Consell de Mallorca, el Hospital de Son Espases, el Geriátrico del IMAS y ProyectoHombre.',
        },
      ],
      cta: 'Apoyamos a Educaclowns con una cantidad fija mensual desde 2023 y nos gustaría ampliar nuestro apoyo porque hemos podido comprobar personalmente lo valiosa que es la labor de esta organización.',
    },
  },
  pollenca: {
    de: {
      description:
        'Gemeinsam mit dem Restaurant R3SPIRA und dem Rathaus von Pollença versorgen wir seit Juni 2021 bedürftige Familien in Pollença mit warmen Mahlzeiten. Was als Corona-Nothilfe begann, ist zu einem nachhaltigen Hilfsprojekt geworden.',
      sections: [
        {
          heading: 'Wie kam es dazu?',
          text: 'Arnd, Gründer der Predator SL und Direktor der Fundació Predator, wollte angesichts der zunehmenden Notlage vieler Menschen durch die Corona-Pandemie zielgerichtet Hilfe anbieten. Im Mai 2021 lernten sich Nico, der Inhaber des Restaurants R3SPIRA, und Arnd kennen — und beschlossen, auf direktem Weg zusammenzuarbeiten.',
        },
        {
          heading: 'Unbürokratische Hilfe mit dem Rathaus',
          text: 'Gemeinsam mit den Sozialarbeiterinnen der Stadt und mit Unterstützung des Bürgermeisters entwickelten sie einen unbürokratischen Weg, um sicherzustellen, dass alle bedürftigen Familien Pollençs von dem Hilfsangebot profitieren können. Seitdem kocht Nico mit seinem Team einmal die Woche ein Drei-Gänge-Menü, das von den berechtigten Familien in Mehrweggefäßen abgeholt wird. Predator zahlt die Lebensmittel und anteilig den Gasverbrauch.',
        },
        {
          heading: 'Wirkung',
          text: 'Als die Krise auf dem Höhepunkt war, haben wir jede Woche Essen für 200 Familien ausgegeben — fast 600 Mahlzeiten. Ein positives Beispiel für eine erfolgreiche Public-Private-Partnership! Vielen Dank an Nico und Familie für die geopferte Freizeit und das große Herzblut, und an das Rathaus von Pollença mit seinen engagierten Sozialarbeiterinnen.',
        },
      ],
      cta: 'Hilf uns, diese Zusammenarbeit weiterzuführen und noch mehr Familien zu erreichen.',
    },
    en: {
      description:
        'Together with restaurant R3SPIRA and the Pollença town hall, we have been providing warm meals to families in need in Pollença since June 2021. What began as COVID emergency aid has become a sustainable community project.',
      sections: [
        {
          heading: 'How it started',
          text: 'Arnd, founder of Predator SL and director of Fundació Predator, wanted to offer targeted help given the increasing hardship many people faced due to the pandemic. In May 2021, Nico, the owner of restaurant R3SPIRA, and Arnd met — and decided to work together directly.',
        },
        {
          heading: 'Unbureaucratic help with the town hall',
          text: 'Together with the city\'s social workers and with the support of the mayor, they developed an unbureaucratic way to ensure that all families in need in Pollença can benefit from the aid. Since then, Nico and his team cook a three-course meal once a week, which eligible families pick up in reusable containers. Predator covers the cost of food and a share of the gas expenses.',
        },
        {
          heading: 'Impact',
          text: 'At the peak of the crisis, we distributed meals to 200 families every week — nearly 600 meals. A positive example of a successful public-private partnership! Many thanks to Nico and his family for sacrificing their free time and putting so much heart into it, and to the Pollença town hall with its dedicated social workers.',
        },
      ],
      cta: 'Help us continue this collaboration and reach even more families.',
    },
    es: {
      description:
        'Junto con el restaurante R3SPIRA y el Ayuntamiento de Pollença, proporcionamos comidas calientes a familias necesitadas en Pollença desde junio de 2021. Lo que comenzó como ayuda de emergencia durante la pandemia se ha convertido en un proyecto comunitario sostenible.',
      sections: [
        {
          heading: 'Cómo empezó',
          text: 'Arnd, fundador de Predator SL y director de la Fundació Predator, quiso ofrecer ayuda dirigida ante la creciente necesidad de muchas personas por la pandemia. En mayo de 2021, Nico, el propietario del restaurante R3SPIRA, y Arnd se conocieron — y decidieron colaborar directamente.',
        },
        {
          heading: 'Ayuda sin burocracia con el Ayuntamiento',
          text: 'Junto con las trabajadoras sociales de la ciudad y con el apoyo del alcalde, desarrollaron un sistema sin burocracia para garantizar que todas las familias necesitadas de Pollença puedan beneficiarse de la ayuda. Desde entonces, Nico y su equipo cocinan un menú de tres platos una vez por semana, que las familias recogen en envases reutilizables. Predator cubre el coste de los alimentos y parte del gasto de gas.',
        },
        {
          heading: 'Impacto',
          text: 'En el punto álgido de la crisis, repartimos comidas a 200 familias cada semana — casi 600 comidas. ¡Un ejemplo positivo de colaboración público-privada exitosa! Muchas gracias a Nico y su familia por sacrificar su tiempo libre, y al Ayuntamiento de Pollença con sus comprometidas trabajadoras sociales.',
        },
      ],
      cta: 'Ayúdanos a continuar esta colaboración y llegar a más familias.',
    },
  },
  'sos-mamas': {
    de: {
      description:
        'S.O.S. Mamas ist eine ehrenamtliche Initiative auf Mallorca, die sich um bedürftige Mütter und Familien kümmert. Die Predator SL — unser Stifter — hat als eines der ersten Projekte direkte, unkomplizierte Hilfe geleistet: ein schönes Beispiel für Hilfe von Menschen für Menschen.',
      sections: [
        {
          heading: 'Was ist passiert?',
          text: 'Die Predator SL hatte ein Haus in Puerto d\'Andratx erworben und baute die Obergeschoss-Wohnungen um. Die Wohnungen waren möbliert gekauft — normalerweise werden die Möbel verkauft oder entrümpelt. Miguel Angel, einer der Projektingenieure, hatte eine bessere Idee: Warum nicht die Möbel spenden?',
        },
        {
          heading: 'Die Idee wurde Wirklichkeit',
          text: 'Nach einer kurzen Recherche kam er in Kontakt mit Ascen Maestre, der Gründerin von S.O.S. Mamas. Sie hatte sofort ein paar Familien im Kopf. An einem Samstag ging es los: Miguel Angel und Pilar, eine der Designerinnen, packten selbst mit an. Um 13:00 Uhr war der Lastwagen voll — und hoffentlich konnte ein paar Familien geholfen werden.',
        },
        {
          heading: 'Moral von der Geschichte',
          text: 'Es muss nicht immer um großen finanziellen Einsatz gehen. Eine gute Idee, kombiniert mit ein bisschen Organisation und Hilfsbereitschaft, hilft Anderen. Auch dafür möchten wir uns von der Fundació Predator stark machen.',
        },
      ],
      cta: 'Mallorca ist nicht nur Luxus. Vielen Menschen geht es wirtschaftlich schlecht — nicht nur wegen der Abhängigkeit vom Tourismus, sondern auch wegen des dünneren sozialen Netzes. Hilf uns, weiter zu helfen.',
    },
    en: {
      description:
        'S.O.S. Mamas is a volunteer initiative in Mallorca that supports mothers and families in need. Predator SL — our founding donor — provided direct, uncomplicated help as one of its first projects: a great example of people helping people.',
      sections: [
        {
          heading: 'What happened?',
          text: 'Predator SL had acquired a building in Puerto d\'Andratx and was renovating the upper-floor apartments. The apartments had been purchased furnished — normally the furniture would be sold or disposed of. Miguel Angel, one of the project engineers, had a better idea: why not donate the furniture?',
        },
        {
          heading: 'The idea became reality',
          text: 'After a brief search, he got in touch with Ascen Maestre, the founder of S.O.S. Mamas. She immediately had a few families in mind. On a Saturday morning, they got started: Miguel Angel and Pilar, one of the designers, rolled up their sleeves and helped personally. By 1:00 PM the truck was full — and hopefully some families could be helped.',
        },
        {
          heading: 'The moral of the story',
          text: 'It doesn\'t always have to be about large financial commitments. A good idea, combined with a little organization and willingness to help, makes a difference. This is exactly the kind of direct action Fundació Predator wants to champion.',
        },
      ],
      cta: 'Mallorca is not all luxury. Many people struggle financially — not just because of dependence on tourism, but also because of a thinner social safety net. Help us keep helping.',
    },
    es: {
      description:
        'S.O.S. Mamas es una iniciativa voluntaria en Mallorca que se ocupa de madres y familias necesitadas. Predator SL — nuestro fundador — realizó una de sus primeras acciones de ayuda directa e informal: un gran ejemplo de ayuda de personas para personas.',
      sections: [
        {
          heading: '¿Qué pasó?',
          text: 'Predator SL había adquirido un edificio en Puerto d\'Andratx y estaba renovando los apartamentos de los pisos superiores. Los apartamentos se habían comprado amueblados — normalmente los muebles se venden o se desechan. Miguel Ángel, uno de los ingenieros del proyecto, tuvo una idea mejor: ¿por qué no donar los muebles?',
        },
        {
          heading: 'La idea se hizo realidad',
          text: 'Tras una breve investigación, contactó con Ascen Maestre, la fundadora de S.O.S. Mamas. Ella inmediatamente pensó en algunas familias. Un sábado por la mañana se pusieron manos a la obra: Miguel Ángel y Pilar, una de las diseñadoras, ayudaron personalmente. A las 13:00 el camión estaba lleno — y con suerte se pudo ayudar a algunas familias.',
        },
        {
          heading: 'La moraleja',
          text: 'No siempre tiene que tratarse de grandes inversiones financieras. Una buena idea, combinada con un poco de organización y voluntad de ayudar, marca la diferencia. Exactamente este tipo de acción directa es lo que la Fundació Predator quiere impulsar.',
        },
      ],
      cta: 'Mallorca no es todo lujo. Muchas personas tienen dificultades económicas — no solo por la dependencia del turismo, sino también por una red social más frágil. Ayúdanos a seguir ayudando.',
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

          {content.sections.map((section, i) => (
            <FadeIn key={section.heading} delay={0.3 + i * 0.1}>
              <div className="mb-8">
                <h2 className="font-serif text-xl font-bold text-charcoal mb-3">
                  {section.heading}
                </h2>
                <p className="text-charcoal-body leading-relaxed">
                  {section.text}
                </p>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.6}>
            <div className="bg-warm-sand/50 rounded-2xl p-8 mb-10">
              <p className="text-charcoal-body leading-relaxed italic">
                {content.cta}
              </p>
            </div>
          </FadeIn>
        </div>

        <DonationCTA lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
