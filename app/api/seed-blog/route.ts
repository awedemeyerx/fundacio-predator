import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const posts = [
  {
    slug_de: 'erfuelle-einen-weihnachtswunsch',
    slug_en: 'fulfill-a-christmas-wish',
    slug_es: 'cumple-un-deseo-navideno',
    title_de: 'Erfülle einen Weihnachtswunsch',
    title_en: 'Fulfill a Christmas Wish',
    title_es: 'Cumple un deseo navideño',
    excerpt_de: 'Jetzt hängen die Zettel! Lass Kinderaugen leuchten und erfülle einen Wunsch, der sonst unerfüllt bliebe.',
    excerpt_en: 'The wish tags are up! Make children\'s eyes light up and fulfill a wish that would otherwise go unfulfilled.',
    excerpt_es: 'Ya están colgados los papeles. Haz que brillen los ojos de los niños y cumple un deseo que de otro modo quedaría sin cumplir.',
    content_de: 'Weihnachten steht vor der Tür, und für uns bei der Fundació Predator hat die schönste Zeit des Jahres gerade einen ganz besonderen Startschuss bekommen.\n\nVielleicht habt ihr unseren kleinen „Teaser" vor ein paar Tagen gesehen? Jetzt wurde es konkret: Xenia war in den letzten Tagen auf der Insel unterwegs – im Gepäck dutzende kleine Hoffnungen, verpackt in unsere festlichen Wunschhänger.\n\nIhr Ziel waren die Deutschen Facharzt Zentren in Palmanova und Paguera sowie das Vitamed in Palmanova. Dort stehen jetzt wunderschöne Weihnachtsbäume, die nicht einfach nur dekoriert sind – sie tragen Wünsche. Xenia hat persönlich dafür gesorgt, dass unsere Anhänger mit dem Nussknacker und den Ballerinas ihren Platz an den Zweigen finden.\n\n**Warum uns das so wichtig ist**\n\nJeder dieser Zettel steht symbolisch für ein benachteiligtes Kind, dessen Weihnachtsfest ohne eure Hilfe vielleicht sonst ausfallen würde. Es war ein bewegender Moment, die Bäume fertig geschmückt zu sehen, wohl wissend, dass hinter jedem „Scan Me!" die Chance steckt, einem Kind eine riesige Freude zu machen.\n\n**So könnt ihr ab sofort mithelfen:**\n\nWenn ihr in den nächsten Tagen einen Termin in den Facharzt Zentren oder im Vitamed habt oder in der Nähe seid:\n\n1. Schaut euch den Baum an: Sucht euch einen Anhänger aus, der euch anspricht.\n2. Scan & Donate: Auf jedem Anhänger findet ihr einen QR-Code. Einfach mit dem Handy scannen.\n3. Wunsch erfüllen: Ihr werdet direkt zur Spendenseite geleitet und könnt den Wunsch unkompliziert erfüllen.\n\nIhr seid gerade nicht auf Mallorca? Keine Sorge, ihr müsst nicht extra vorbeikommen, um zum Wunscherfüller zu werden. Wir haben alle Wünsche auch digital gesammelt.\n\nEin riesiges Dankeschön an die Teams der Arztzentren, die ihre Bäume für diese Aktion zur Verfügung stellen, und an Xenia für den fleißigen Einsatz vor Ort. Jetzt liegt es an uns allen: Lasst uns die Anhänger in erfüllte Träume verwandeln!\n\nFrohe Vorweihnachtszeit,\nEuer Team der Fundació Predator',
    content_en: null,
    content_es: null,
    cover_image_url: 'https://fundaciopredator.org/wp-content/uploads/2025/12/fundacio-predator-12.jpg',
    published_at: '2025-12-02T08:33:15Z',
  },
  {
    slug_de: 'lasst-uns-weihnachten-zu-den-kindern-bringen',
    slug_en: 'lets-bring-christmas-to-the-children',
    slug_es: 'llevemos-la-navidad-a-los-ninos',
    title_de: 'Lasst uns Weihnachten zu den Kindern bringen!',
    title_en: 'Let\'s bring Christmas to the children!',
    title_es: '¡Llevemos la Navidad a los niños!',
    excerpt_de: 'Ein Zettel. Ein Wunsch. Deine Chance, ein Leben zu berühren. Mach mit bei unserem Weihnachtsprojekt auf Mallorca.',
    excerpt_en: 'A note. A wish. Your chance to touch a life. Join our Christmas project in Mallorca.',
    excerpt_es: 'Una nota. Un deseo. Tu oportunidad de tocar una vida. Únete a nuestro proyecto navideño en Mallorca.',
    content_de: 'Viele Kinder auf unserer Insel erleben die Weihnachtszeit nicht als Zeit der Freude. Einige wachsen in Armut auf und leben in Familien, die sich selbst das Nötigste kaum leisten können. Diese Kinder werden von SI Mallorca betreut, einer Organisation, die wir seit Jahren finanziell unterstützen.\n\nAndere mussten ihr Zuhause verlassen, weil sie dort körperliche oder sexuelle Gewalt erfahren haben und leben nun in Heimen, wo sie Sicherheit, aber oft kein persönliches Weihnachtswunder finden. Diese Kinder werden von Educaclowns begleitet, ebenfalls eine Einrichtung, die wir als Fundació Predator seit vielen Jahren unterstützen.\n\nGemeinsam mit den Deutschen Facharzt Zentren Mallorca werden wir von der Fundació Predator drei Weihnachtsbäume aufstellen – geschmückt mit echten Wunschzetteln dieser Kinder.\n\n**Wie kannst du helfen?**\n\nWunschzettel auswählen: Nimm dir einen Zettel vom Baum oder scanne den QR-Code direkt dort.\n\nSpenden statt einkaufen: Über den QR-Code gelangst du zu unserer Spendenseite.\n\nWir übernehmen den Rest: Wir kümmern uns um den Einkauf, das Verpacken und die Übergabe der Geschenke an die Kinder.\n\n**Transparenz, die man sehen kann**\n\nWir begleiten die Geschenkübergabe mit Kameras, damit du miterleben kannst, was deine Spende bewirkt.\n\nLasst uns gemeinsam Weihnachten auf Mallorca ein bisschen heller machen.\n\nEin Geschenk ist mehr als ein Gegenstand. Es ist Liebe, Hoffnung – und das Gefühl, nicht vergessen zu sein.\n\nDanke, dass du ein Teil davon bist.\nFundació Predator',
    content_en: null,
    content_es: null,
    cover_image_url: 'https://fundaciopredator.org/wp-content/uploads/2025/11/model-187.jpg',
    published_at: '2025-11-27T14:16:50Z',
  },
  {
    slug_de: 'so-leben-kinder-auf-mallorca',
    slug_en: 'how-children-live-in-mallorca',
    slug_es: 'asi-viven-los-ninos-en-mallorca',
    title_de: 'So leben Kinder auf Mallorca',
    title_en: 'How children live in Mallorca',
    title_es: 'Así viven los niños en Mallorca',
    excerpt_de: 'Kinder leben auf Mallorca in unfassbaren Zuständen. Xenia war mit Si Mallorca unterwegs und hat Fotos gemacht, damit Ihr sehen könnt, wie die Realität hier wirklich aussieht.',
    excerpt_en: 'Children live in unimaginable conditions in Mallorca. Xenia was out with Si Mallorca and took photos so you can see what reality really looks like here.',
    excerpt_es: 'Los niños viven en condiciones inimaginables en Mallorca. Xenia estuvo con Si Mallorca y tomó fotos para que podáis ver cómo es la realidad aquí.',
    content_de: 'Der Winter auf Mallorca offenbart jedes Jahr eine stille Not, die vielen verborgen bleibt: Auf unserer Insel frieren Kinder. In Familien, denen es ohnehin am Nötigsten fehlt – an Lebensmitteln, warmer Kleidung, Babymilch und Windeln – wird die Kälte zur unerträglichen Belastung.\n\nXenia hat die folgenden Bilder auf einer der Verteilaktionen gemacht. Wir möchten Euch ungeschminkt und echt zeigen, wie die Lebensumstände vieler Familien hier sind.\n\nSeit vielen Jahren kümmert sich Si Mallorca, gegründet von Anja, genau um diese Menschen. Ehrenamtlich, unermüdlich und mit einem Engagement, das weit über das hinausgeht, was man erwarten könnte.\n\nWir unterstützen Si Mallorca seit etwa zwei Jahren mit einer festen monatlichen Zahlung. Und haben angesichts der Not letzte Woche 5.000,- Euro zusätzliche Hilfe an Si Mallorca überwiesen.\n\n**Helft uns helfen!**\n\nUnterstützt die Arbeit von Si Mallorca und anderen ehrenamtlichen Organisationen mit einer Spende. Wir garantieren dafür, dass kein Cent Eurer Spende für Verwaltung oder Bürokratie draufgeht.',
    content_en: null,
    content_es: null,
    cover_image_url: 'https://fundaciopredator.org/wp-content/uploads/2025/11/fundacio-predator-hilft-1.jpg',
    published_at: '2025-11-19T17:07:28Z',
  },
  {
    slug_de: 'gemeinsam-verantwortung-uebernehmen',
    slug_en: 'taking-responsibility-together',
    slug_es: 'asumiendo-responsabilidad-juntos',
    title_de: 'Gemeinsam Verantwortung übernehmen',
    title_en: 'Taking responsibility together',
    title_es: 'Asumiendo responsabilidad juntos',
    excerpt_de: 'Wir sind überglücklich, heute unsere allererste offizielle Unternehmenspartnerschaft verkünden zu dürfen!',
    excerpt_en: 'We are overjoyed to announce our very first official corporate partnership today!',
    excerpt_es: '¡Estamos encantados de anunciar hoy nuestra primera asociación empresarial oficial!',
    content_de: 'Es gibt Begegnungen, die mehr sind als nur ein Zufall. Als Xenia und Christian Berger sich kürzlich auf Mallorca trafen, ging es schnell nicht mehr nur um Smalltalk, sondern um gemeinsame Werte.\n\nWir sind überglücklich, heute unsere allererste offizielle Unternehmenspartnerschaft verkünden zu dürfen!\n\nBerger Consultants setzt mit einer großzügigen Initialspende ein starkes Zeichen. Christian zeigt damit, dass soziales Engagement für moderne Unternehmen eine Herzensangelegenheit ist.\n\nChristian Berger ist seit über 25 Jahren eine feste Größe, wenn es um Führungspositionen in der IT- und Tech-Welt geht. Sein unternehmerisches Credo lautet „Growth at the Core".\n\nVom Identifizieren von Top-Talenten in der Wirtschaft zur Förderung von verborgenen Talenten bei Kindern – danke, Christian!',
    content_en: null,
    content_es: null,
    cover_image_url: 'https://fundaciopredator.org/wp-content/uploads/2025/11/fundacio-predator-hilft-9.jpg',
    published_at: '2025-11-13T05:36:02Z',
  },
  {
    slug_de: 'mit-si-mallorca-unterwegs',
    slug_en: 'out-with-si-mallorca',
    slug_es: 'de-ruta-con-si-mallorca',
    title_de: 'Mit Si Mallorca unterwegs',
    title_en: 'Out with Si Mallorca',
    title_es: 'De ruta con Si Mallorca',
    excerpt_de: 'Wir haben Si Mallorca begleitet. Anja verteilt wöchentlich Sachspenden an bedürftige Familien mit Kindern.',
    excerpt_en: 'We accompanied Si Mallorca. Anja distributes donations weekly to families with children in need.',
    excerpt_es: 'Acompañamos a Si Mallorca. Anja distribuye donaciones semanalmente a familias necesitadas con niños.',
    content_de: 'Mallorca ist für viele ein Ort der Sonne, des Meeres und unbeschwerter Tage. Doch abseits der Postkartenidylle gibt es Familien, deren Alltag vom Gegenteil geprägt ist.\n\nSeit vielen Jahren kümmert sich Si Mallorca, gegründet von Anja, genau um diese Menschen. Ehrenamtlich, unermüdlich und mit einem Engagement, das weit über das hinausgeht, was man erwarten könnte.\n\nDiesmal durften wir Anja bei einer ihrer Touren begleiten – gemeinsam mit Frau Dr. Sandra Norman, Kinderärztin im Deutschen Facharztzentrum, die sich ehrenamtlich angeschlossen hat.\n\nUnsere erste Station war Son Gotleu, einer der ärmsten Stadtteile Mallorcas. Zwischen Wohnblöcken, Spielplätzen und Parkbänken haben wir Mütter getroffen, die dankbar jede Packung Milchpulver und jede Windel entgegennahmen.\n\nSpäter führte uns der Weg in eine Obdachlosensiedlung nahe der Autobahn – ein Ort, den man als Urlauber nie zu sehen bekommt.\n\nJeder dieser Momente hat uns gezeigt, wie wichtig diese Arbeit ist – und wie sehr jede Spende zählt.',
    content_en: null,
    content_es: null,
    cover_image_url: 'https://fundaciopredator.org/wp-content/uploads/2025/08/simallorca_compressed-09.jpg',
    published_at: '2025-08-11T10:44:50Z',
  },
  {
    slug_de: 'luxus-flohmarkt-ergebnis',
    slug_en: 'luxury-flea-market-result',
    slug_es: 'resultado-mercadillo-de-lujo',
    title_de: '9.626,- Euro! Vielen Dank!',
    title_en: '€9,626! Thank you so much!',
    title_es: '¡9.626 euros! ¡Muchas gracias!',
    excerpt_de: 'Unser Luxus Flohmarkt für die gute Sache war ein voller Erfolg! Wir haben 9.626,- Euro eingenommen.',
    excerpt_en: 'Our luxury flea market for a good cause was a huge success! We raised €9,626.',
    excerpt_es: 'Nuestro mercadillo de lujo benéfico fue un éxito total. Recaudamos 9.626 euros.',
    content_de: '**9.626,- Euro! Was für eine Hilfe!**\n\nUnser Luxus Flohmarkt (a day of glamour and giving) war ein voller Erfolg! Vielen Dank Euch dafür! Wir haben 9.626,- Euro eingenommen, die wir – wie versprochen – an die Organisationen Si Mallorca und Educaclowns jeweils hälftig weitergeben werden.\n\nDie entstandenen Kosten wurden entweder von uns, der Fundació Predator oder unserem Stifter, der Predator SL, übernommen.\n\nWir haben viel mehr Spenden an hochwertiger Designerware bekommen, als wir erwartet haben. Ebenso haben sich fast alle unserer privaten Aussteller bereit erklärt, nicht nur 50%, sondern 100% ihrer Erlöse zugunsten benachteiligter Kinder zur Verfügung zu stellen.\n\nDas war unser erstes Event. Es war viel Arbeit, wir haben viel gelernt und wir hatten Spaß. Den hattet Ihr hoffentlich auch!\n\nBitte helft uns mit einer Spende, damit die Arbeit weitergehen kann.',
    content_en: null,
    content_es: null,
    cover_image_url: 'https://fundaciopredator.org/wp-content/uploads/2025/07/1.jpg',
    published_at: '2025-07-04T05:53:12Z',
  },
  {
    slug_de: 'a-day-of-glamour-and-giving',
    slug_en: 'a-day-of-glamour-and-giving',
    slug_es: 'un-dia-de-glamour-y-solidaridad',
    title_de: 'A Day of Glamour and Giving',
    title_en: 'A Day of Glamour and Giving',
    title_es: 'Un día de glamour y solidaridad',
    excerpt_de: 'Jetzt geht es endlich los! Unser großes Event, der „Day of Glamour and Giving" in Santa Ponça.',
    excerpt_en: 'It\'s finally happening! Our big event, the "Day of Glamour and Giving" in Santa Ponça.',
    excerpt_es: '¡Por fin llega! Nuestro gran evento, el "Day of Glamour and Giving" en Santa Ponça.',
    content_de: 'Ab 14:00 Uhr geht es los im Mallorca Country Club in Santa Ponça. Damit Ihr wisst, was Euch alles erwartet, haben wir hier eine Zusammenfassung für Euch.\n\nAm Eingang könnt Ihr Wertbons kaufen für 3 € (blau) und 10 € (rot). Dann könnt Ihr Euren Kindern die Bons in die Hand drücken, damit sie sich frei bewegen und die Attraktionen genießen können.\n\nAlle Einnahmen kommen zu 100% der Stiftung zugute.\n\nWir freuen uns riesig, dass auch unsere Partner von SI Mallorca und Educaclowns dabei sein werden. Educaclowns wird uns sogar mit einer tollen Aufführung um 17:00 Uhr an der Poolterrasse begeistern!\n\nWir glauben daran, dass jeder in der Gesellschaft seinen Anteil dazu beitragen sollte, unsere Welt zu einer besseren Welt zu machen.',
    content_en: null,
    content_es: null,
    cover_image_url: 'https://fundaciopredator.org/wp-content/uploads/2025/06/C5B29F9E-103A-412C-BDA9-D162CF7B12B3-1.jpg',
    published_at: '2025-06-07T12:04:44Z',
  },
  {
    slug_de: 'shoppen-fuer-den-guten-zweck',
    slug_en: 'shopping-for-a-good-cause',
    slug_es: 'compras-solidarias',
    title_de: 'Shoppen für den guten Zweck',
    title_en: 'Shopping for a good cause',
    title_es: 'Compras solidarias',
    excerpt_de: 'A Day of Glamour and Giving ... was mag das wohl sein? Lest mehr und verpasst unser Event des Jahres nicht!',
    excerpt_en: 'A Day of Glamour and Giving... what could that be? Read more and don\'t miss our event of the year!',
    excerpt_es: 'A Day of Glamour and Giving... ¿qué será? Lee más y no te pierdas nuestro evento del año.',
    content_de: 'Hallo ihr Lieben, wir von der Fundació Predator haben tolle Neuigkeiten! Am 8. Juni 2025 veranstalten wir einen ganz besonderen Flohmarkt im Mallorca Country Club in Santa Ponca.\n\nAb 14:00 Uhr könnt ihr bei uns nach echten Schätzen suchen: gebrauchte, aber super hochwertige Designerstücke warten auf ein neues Zuhause.\n\nDas Beste daran? Mindestens 50% der Einnahmen gehen direkt an unsere Stiftung, mit der wir uns für das Wohl von Kindern einsetzen.\n\nWeil uns Familien am Herzen liegen, wird das ein Event für Groß und Klein. Wir freuen uns riesig, dass auch unsere Partner von SI Mallorca und Educaclowns dabei sein werden.\n\nAlso, merkt euch den 8. Juni 2025 ab 14:00 Uhr vor. Kommt vorbei, stöbert nach einzigartigen Designer-Schnäppchen und tut ganz nebenbei etwas richtig Gutes.\n\nWir freuen uns auf euch!',
    content_en: null,
    content_es: null,
    cover_image_url: 'https://fundaciopredator.org/wp-content/uploads/2025/04/Luxury-Instagram-Story.jpg',
    published_at: '2025-04-15T18:28:43Z',
  },
];

export async function POST() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const results = [];

  for (const post of posts) {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .upsert(post, { onConflict: 'slug_de' })
      .select();

    if (error) {
      results.push({ slug: post.slug_de, error: error.message });
    } else {
      results.push({ slug: post.slug_de, success: true });
    }
  }

  return NextResponse.json({ results, total: posts.length });
}
