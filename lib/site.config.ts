import { Localized } from './types';

export const siteConfig = {
  brand: {
    name: 'Fundació Predator',
    legalName: 'Fundació Predator',
    tagline: {
      de: 'Gemeinnützige Stiftung auf Mallorca',
      en: 'Charitable Foundation in Mallorca',
      es: 'Fundación benéfica en Mallorca',
    } as Localized,
  },

  contact: {
    email: 'info@fundaciopredator.org',
    phone: '',
    address: {
      street: '',
      city: 'Mallorca, Spain',
    },
  },

  seo: {
    de: {
      title: 'Fundació Predator — Gemeinnützige Stiftung Mallorca',
      description:
        '100% deiner Spende kommt an. Die Fundació Predator unterstützt soziale Projekte auf Mallorca: EducaClowns, SOS Mamás und Projektförderung in Pollença.',
    },
    en: {
      title: 'Fundació Predator — Charitable Foundation Mallorca',
      description:
        '100% of your donation reaches the projects. Fundació Predator supports social initiatives in Mallorca: EducaClowns, SOS Mamás and community projects in Pollença.',
    },
    es: {
      title: 'Fundació Predator — Fundación benéfica en Mallorca',
      description:
        'El 100% de tu donación llega a los proyectos. La Fundació Predator apoya iniciativas sociales en Mallorca: EducaClowns, SOS Mamás y proyectos comunitarios en Pollença.',
    },
  } as Record<string, { title: string; description: string }>,

  nav: {
    items: [
      {
        href: '/projekte',
        label: { de: 'Projekte', en: 'Projects', es: 'Proyectos' } as Localized,
      },
      {
        href: '/ueber-uns',
        label: { de: 'Über uns', en: 'About us', es: 'Sobre nosotros' } as Localized,
      },
      {
        href: '/blog',
        label: { de: 'Blog', en: 'Blog', es: 'Blog' } as Localized,
      },
      {
        href: '/spenden',
        label: { de: 'Spenden', en: 'Donate', es: 'Donar' } as Localized,
      },
    ],
  },

  content: {
    hero: {
      headline: {
        de: '100% deiner Spende kommt an',
        en: '100% of your donation reaches the projects',
        es: 'El 100% de tu donación llega a los proyectos',
      } as Localized,
      subtitle: {
        de: 'Die Fundació Predator unterstützt soziale Projekte auf Mallorca — direkt, nachhaltig und transparent.',
        en: 'Fundació Predator supports social projects in Mallorca — directly, sustainably, and transparently.',
        es: 'La Fundació Predator apoya proyectos sociales en Mallorca — de forma directa, sostenible y transparente.',
      } as Localized,
      cta: {
        de: 'Jetzt spenden',
        en: 'Donate now',
        es: 'Donar ahora',
      } as Localized,
      secondaryCta: {
        de: 'Unsere Projekte',
        en: 'Our projects',
        es: 'Nuestros proyectos',
      } as Localized,
    },

    trust: {
      badge: {
        de: '100% gehen an Projekte',
        en: '100% goes to projects',
        es: '100% va a los proyectos',
      } as Localized,
      description: {
        de: 'Alle Verwaltungskosten werden privat getragen. Jeder Cent deiner Spende fließt direkt in unsere Projekte.',
        en: 'All administrative costs are covered privately. Every cent of your donation goes directly to our projects.',
        es: 'Todos los costes administrativos se cubren de forma privada. Cada céntimo de tu donación va directamente a nuestros proyectos.',
      } as Localized,
    },

    projects: {
      title: {
        de: 'Unsere Projekte',
        en: 'Our Projects',
        es: 'Nuestros Proyectos',
      } as Localized,
      items: [
        {
          slug: 'educaclowns',
          title: {
            de: 'EducaClowns',
            en: 'EducaClowns',
            es: 'EducaClowns',
          } as Localized,
          excerpt: {
            de: 'Clown-Therapie für Kinder in Krankenhäusern und sozialen Einrichtungen auf Mallorca.',
            en: 'Clown therapy for children in hospitals and social institutions in Mallorca.',
            es: 'Terapia de clown para niños en hospitales e instituciones sociales de Mallorca.',
          } as Localized,
          image: '/images/educaclowns.jpg',
        },
        {
          slug: 'pollenca',
          title: {
            de: 'Pollença',
            en: 'Pollença',
            es: 'Pollença',
          } as Localized,
          excerpt: {
            de: 'Gemeinschaftsprojekte und soziale Förderung in der Gemeinde Pollença.',
            en: 'Community projects and social support in the municipality of Pollença.',
            es: 'Proyectos comunitarios y apoyo social en el municipio de Pollença.',
          } as Localized,
          image: '/images/pollenca.jpg',
        },
        {
          slug: 'sos-mamas',
          title: {
            de: 'SOS Mamás',
            en: 'SOS Mamás',
            es: 'SOS Mamás',
          } as Localized,
          excerpt: {
            de: 'Unterstützung für alleinerziehende Mütter in schwierigen Lebenssituationen.',
            en: 'Support for single mothers in difficult life situations.',
            es: 'Apoyo para madres solteras en situaciones difíciles.',
          } as Localized,
          image: '/images/sos-mamas.jpg',
        },
      ],
    },

    donate: {
      title: {
        de: 'Jetzt spenden',
        en: 'Donate now',
        es: 'Donar ahora',
      } as Localized,
      subtitle: {
        de: 'Jeder Beitrag macht einen Unterschied.',
        en: 'Every contribution makes a difference.',
        es: 'Cada contribución marca la diferencia.',
      } as Localized,
      amounts: [25, 50, 100, 250],
      customLabel: {
        de: 'Eigener Betrag',
        en: 'Custom amount',
        es: 'Cantidad personalizada',
      } as Localized,
    },

    footer: {
      tagline: {
        de: 'Gemeinnützige Stiftung auf Mallorca',
        en: 'Charitable Foundation in Mallorca',
        es: 'Fundación benéfica en Mallorca',
      } as Localized,
      legal: {
        impressum: {
          label: { de: 'Impressum', en: 'Legal Notice', es: 'Aviso Legal' } as Localized,
          href: '/impressum',
        },
        datenschutz: {
          label: { de: 'Datenschutz', en: 'Privacy Policy', es: 'Política de Privacidad' } as Localized,
          href: '/datenschutz',
        },
      },
    },
  },
} as const;
