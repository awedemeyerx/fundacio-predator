import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const posts = [
  {
    slug_de: 'charity-flohmarkt-santa-ponca-mallorca',
    slug_en: 'charity-fleamarket-santa-ponca-mallorca',
    slug_es: 'mercadillo-solidario-santa-ponca-mallorca',
    title_de: 'Shoppen für den guten Zweck',
    title_en: 'Shopping for a Good Cause',
    title_es: 'Compras por una buena causa',
    excerpt_de: 'Am 8. Juni 2025 veranstalten wir einen Luxus-Flohmarkt im Mallorca Country Club in Santa Ponça. Hochwertige Designerstücke shoppen und dabei Kindern auf Mallorca helfen.',
    excerpt_en: 'On June 8, 2025, we are hosting a luxury flea market at the Mallorca Country Club in Santa Ponça. Shop high-quality designer items and help children in Mallorca.',
    excerpt_es: 'El 8 de junio de 2025 organizamos un mercadillo de lujo en el Mallorca Country Club de Santa Ponça. Compra artículos de diseño y ayuda a los niños de Mallorca.',
    content_de: `<p>Hallo ihr Lieben,</p>
<p>wir von der Fundació Predator haben tolle Neuigkeiten! Am <strong>8. Juni 2025</strong> veranstalten wir einen ganz besonderen Flohmarkt im <strong>Mallorca Country Club in Santa Ponca</strong>. Ab <strong>14:00 Uhr</strong> könnt ihr bei uns nach echten Schätzen suchen: gebrauchte, aber super hochwertige Designerstücke warten auf ein neues Zuhause.</p><p>Das Beste daran? Mindestens 50% der Einnahmen gehen direkt an unsere Stiftung, mit der wir uns für das Wohl von Kindern einsetzen. Der Mallorca Country Club unterstützt uns dabei großzügig und stellt seine schöne Location zur Verfügung – vielen Dank dafür!</p>
<p>Weil uns Familien am Herzen liegen, wird das ein Event für Groß und Klein. Wir freuen uns riesig, dass auch unsere Partner von <strong>SI Mallorca</strong> und <strong>Educaclowns</strong> dabei sein werden. Educaclowns wird uns sogar mit einer tollen Aufführung begeistern! Und die großartige Kindertagesstätte <strong>Tiny Town aus Palma Nova</strong> wird mit vielen tollen Aktivitäten für unsere kleinen Gäste vertreten sein.</p>
<p>Also, merkt euch den <strong>8. Juni 2025 ab 14:00 Uhr</strong> vor (<a href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Luxus-Flohmarkt+mit+der+Fundaci%C3%B3+Predator&amp;dates=20250608T120000Z/20250608T160000Z&amp;location=Mallorca+Country+Club,+Santa+Pon%C3%A7a&amp;details=Exklusiver+Flohmarkt+mit+hochwertiger+Luxus-Designer-Kleidung+zugunsten+der+Fundaci%C3%B3+Predator.+Mit+dabei%3A+SI+Mallorca%2C+Educaclowns+(mit+Auff%C3%BChrung)+und+die+Kindertagesst%C3%A4tte+Tiny+Town+aus+Palma+Nova." target="_blank" rel="noopener noreferrer">zum Kalender hinzufügen</a>). Kommt vorbei, stöbert nach einzigartigen Designer-Schnäppchen, genießt die entspannte Atmosphäre im Mallorca Country Club und tut ganz nebenbei etwas richtig Gutes.</p>
<p>Wir freuen uns auf euch!</p>
<p><h2>Was machen wir anders?</h2><h3>Wir möchten "Hilfe erweitern". Daher adressieren wir in erster Linie ehrenamtliche, meist kleinere Organisationen, die vor Ort Hilfe leisten. Und die wir unterstützen können mit unseren Ressourcen. </h3><p>Besonderen Fokus legen wir auf Effizenz der Hilfemaßnahmen und auf deren Nachhaltigkeit. Wir möchten unseren Stiftern und auch unseren Spendern gegenüber sicherstellen, daß Ihre Hilfe uneingeschränkt ankommt. Und nicht für Verwaltungsaufgaben oder Gehälter verwendet wird. Wir verstehen, daß große Organisationen nicht Alle Tätigkeiten im Ehrenamt erfüllen können, haben uns aber das Ziel gesetzt, einen möglichst hohen Wirkungsgrad des eingesetzten Kapitals gewährleisten zu können. Genauso ist es für uns wichtig, daß wir ein starker Projektpartner sind. Und sehr eng mit den Organisationen, die wir unterstützen, zusammen arbeiten. Auch damit wir völlige Transparenz über die Mittelverwendung haben.</p><h4>Unsere Mission</h4>
<p>Die Ungleichheit in der Welt nimmt mehr und mehr zu. Gleichzeitig gibt es viele engagierte kleine Organisationen, die in ihrer Nachbarschaft oder auch im größeren Maßstab Dinge anpacken. Und helfen. Die möchten wir unterstützen, damit sie noch besser helfen können.</p><h4>Unsere Vision</h4>
<p>Wir glauben daran, dass jeder in der Gesellschaft seinen Anteil dazu beitragen sollte, unsere Welt zu einer besseren Welt zu machen. Jeder, nach seinen Möglichkeiten. Wir können Organisationen Ressourcen anbieten, die sie brauchen, um die fantastische Arbeit, die sie meist schon lange vor Ort durchführen, zu unterstützen.</p><h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<p>Hello lovelies,</p>
<p>We at Fundació Predator have great news! On <g id="gid_0">June 8, 2025</g>, we are organizing a very special flea market at the <g id="gid_1">Mallorca Country Club in Santa Ponca</g>. From <strong>14:00</strong> you can search for real treasures: used, but super high-quality designer pieces are waiting for a new home. </p><p>The best thing about it? At least 50% of the proceeds go directly to our foundation, which is dedicated to the well-being of children. The Mallorca Country Club generously supports us and makes its beautiful location available - thank you very much! </p>
<p>Because families are important to us, this will be an event for young and old. We are delighted that our partners from <strong>SI Mallorca</strong> and <strong>Educaclowns</strong> will also be there. Educaclowns will even wow us with a great performance! And the great daycare center <strong>Tiny Town from Palma Nova</strong> will be there with lots of great activities for our little guests. </p>
<p>So, make a note of <strong>June 8, 2025 from 2:00 pm</strong><a href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Luxus-Flohmarkt+mit+der+Fundaci%C3%B3+Predator&amp;dates=20250608T120000Z/20250608T160000Z&amp;location=Mallorca+Country+Club,+Santa+Pon%C3%A7a&amp;details=Exklusiver+Flohmarkt+mit+hochwertiger+Luxus-Designer-Kleidung+zugunsten+der+Fundaci%C3%B3+Predator.+Mit+dabei%3A+SI+Mallorca%2C+Educaclowns+(mit+Auff%C3%BChrung)+und+die+Kindertagesst%C3%A4tte+Tiny+Town+aus+Palma+Nova." target="_blank" rel="noopener noreferrer">(add to calendar</a>). Come along, browse for unique designer bargains, enjoy the relaxed atmosphere at the Mallorca Country Club and do something really good at the same time.</p>
<p>We look forward to seeing you!</p>
<p><h2>What do we do differently?</h2><h3>We would like to "extend help". Therefore, we primarily address voluntary, mostly smaller organizations that provide assistance on the ground. And which we can support with our resources. </h3><p>We place particular emphasis on the efficiency of the aid measures and their sustainability. We want to ensure our donors that your help will be received in full. And not used for administrative tasks or salaries. We understand that large organizations cannot fulfill all activities on a voluntary basis, but we have set ourselves the goal of being able to ensure the highest possible efficiency of the capital invested. In the same way, it is important for us to be a strong project partner. And work very closely with the organizations we support. Also so that we have complete transparency about the use of funds.</p><h4>Our mission</h4>
<p>Inequality in the world is increasing more and more. At the same time, there are many dedicated small organizations that are tackling things in their neighborhoods or on a larger scale. And help. We would like to support them so that they can help even better.</p><h4>Our vision</h4>
<p>We believe that everyone in society should do their part to make our world a better place. Each, according to his possibilities. We can offer organizations resources they need to support the fantastic work they've mostly been doing on the ground for a long time.</p><h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<p>Hola amores,</p>
<p>¡En la Fundació Predator tenemos grandes noticias! El <strong>8 de junio de 2025</strong> organizamos un mercadillo muy especial en el <strong>Mallorca Country Club de Santa Ponça</strong>. A partir de <strong>las 14:00</strong> podrás buscar verdaderos tesoros: piezas de diseño usadas, pero de súper alta calidad, están esperando un nuevo hogar. </p><p>¿Lo mejor de todo? Al menos el 50% de lo recaudado va directamente a nuestra fundación, dedicada al bienestar de los niños. El Mallorca Country Club nos apoya generosamente y nos proporciona su hermosa ubicación - ¡muchas gracias! </p>
<p>Porque las familias son importantes para nosotros, este será un evento para jóvenes y mayores. Estamos encantados de que nuestros socios de <strong>SI Mallorca</strong> y <strong>Educaclowns</strong> también estén presentes. Educaclowns incluso nos sorprenderá con una gran actuación. Y la gran guardería <strong>Tiny Town de Palma Nova</strong> estará allí con un montón de actividades para nuestros pequeños invitados. </p>
<p>Así pues, tome nota del <strong>8 de junio de 2025 a partir de las 14:00</strong><a href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Luxus-Flohmarkt+mit+der+Fundaci%C3%B3+Predator&amp;dates=20250608T120000Z/20250608T160000Z&amp;location=Mallorca+Country+Club,+Santa+Pon%C3%A7a&amp;details=Exklusiver+Flohmarkt+mit+hochwertiger+Luxus-Designer-Kleidung+zugunsten+der+Fundaci%C3%B3+Predator.+Mit+dabei%3A+SI+Mallorca%2C+Educaclowns+(mit+Auff%C3%BChrung)+und+die+Kindertagesst%C3%A4tte+Tiny+Town+aus+Palma+Nova." target="_blank" rel="noopener noreferrer">(añadir al calendario</a>). Venga, busque gangas de diseño únicas, disfrute del ambiente relajado del Mallorca Country Club y haga algo realmente bueno al mismo tiempo.</p>
<p>¡Le esperamos!</p>
<p><h2>¿Qué hacemos de forma diferente?</h2><h3>Nos gustaría "ampliar la ayuda". Por eso nos dirigimos principalmente a organizaciones voluntarias, en su mayoría pequeñas, que prestan ayuda sobre el terreno. Y que podemos apoyar con nuestros recursos. </h3><p>Prestamos especial atención a la eficacia de las medidas de ayuda y a su sostenibilidad. Queremos garantizar a nuestros donantes que su ayuda es plenamente recibida. Y no se utiliza para tareas administrativas o salarios. Entendemos que las grandes organizaciones no pueden realizar todas las actividades de forma voluntaria, pero nos hemos fijado el objetivo de poder garantizar la mayor eficiencia posible del capital invertido. Para nosotros es igualmente importante ser un socio fuerte en el proyecto. Y trabajamos muy estrechamente con las organizaciones a las que apoyamos. También para que tengamos total transparencia sobre el uso de los fondos.</p><h4>Nuestra misión</h4>
<p>La desigualdad en el mundo aumenta cada vez más. Al mismo tiempo, hay muchas pequeñas organizaciones comprometidas que se ocupan de cosas en su barrio o incluso a mayor escala. Y ayuda. Queremos apoyarles para que puedan ayudar aún mejor.</p><h4>Nuestra visión</h4>
<p>Creemos que cada miembro de la sociedad debe contribuir a hacer de nuestro mundo un lugar mejor. Cada uno lo mejor que pueda. Podemos ofrecer a las organizaciones los recursos que necesitan para respaldar el fantástico trabajo que, en su mayoría, llevan mucho tiempo realizando sobre el terreno.</p><h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/charity-fleamarket-santa-ponca/luxury-fleamarket-instagram-story.jpg',
    published_at: '2025-04-15T17:28:43Z',
  },
  {
    slug_de: 'charity-flohmarkt-anmeldung-verkaeufer',
    slug_en: 'charity-fleamarket-seller-registration',
    slug_es: 'mercadillo-solidario-inscripcion-vendedores',
    title_de: 'Shoppen für den guten Zweck - Anmeldung',
    title_en: 'Shopping for a Good Cause - Registration',
    title_es: 'Compras por una buena causa - Inscripción',
    excerpt_de: 'Ihr möchtet als Aussteller bei unserem Charity-Flohmarkt im Mallorca Country Club dabei sein? Hier findet ihr alle Infos zur Anmeldung.',
    excerpt_en: 'Would you like to be an exhibitor at our charity flea market at the Mallorca Country Club? Here you will find all registration details.',
    excerpt_es: '¿Te gustaría participar como expositor en nuestro mercadillo solidario en el Mallorca Country Club? Aquí encontrarás toda la información para inscribirte.',
    content_de: `<h2>Anmeldung als Anbieter</h2><p>Hallo ihr Lieben,</p>
<p>hier könnt Ihr Euch als Anbieter für unseren Design - Flohmarkt am  <strong>8. Juni 2025</strong> im <strong>Mallorca Country Club in Santa Ponca </strong>anmelden.</p>
<p>Bringt gern Eure Kinder mit, es wird ein Event für die ganze Familie. Und neben dem guten Zweck sollen alle auch Spaß haben! Wenn Ihr tolle Stücke im Schrank habt und sie entbehren könnt, aber keine Zeit für den Verkauf habt, können wir den Verkauf auch für Euch übernehmen. Das könnt Ihr im Formular unten auswählen, wir kommen dann wegen der Abholung der Sachen auf Euch zu.</p><p>Damit das Event auch ein voller Erfolg für die gute Sache wird, bitten wir darum, folgende Punkte zu beachten:</p>
<ul>
<li>nur Angebot von originalen Designer- oder hochwertigen Markenprodukten</li>
<li>die Zahl der Produkte pro Anbieter ist auf 15 limitiert</li>
<li>die Produkte müssen in gutem Zustand sein, frei von Beschädigungen</li>
<li>die Produkte sollten sauber sein</li>
<li>mind. 50% Eurer Einnahmen kommen unserer Stiftung zugute</li>
<li>ihr erhaltet von uns einen Kleiderständer und einen Platz zur Verfügung gestellt</li>
<li>der Flohmarkt dauert von 14:00 - 18:00 Uhr, bitte seid eine Stunde vorher dort und seid an Eurem Stand während des Flohmarkt</li>
</ul>
<p>Wir freuen uns darauf, Euch kennen zu lernen! Und gemeinsam etwas zu bewegen!</p><h2>Was machen wir anders?</h2><h3>Wir möchten "Hilfe erweitern". Daher adressieren wir in erster Linie ehrenamtliche, meist kleinere Organisationen, die vor Ort Hilfe leisten. Und die wir unterstützen können mit unseren Ressourcen. </h3><p>Besonderen Fokus legen wir auf Effizenz der Hilfemaßnahmen und auf deren Nachhaltigkeit. Wir möchten unseren Stiftern und auch unseren Spendern gegenüber sicherstellen, daß Ihre Hilfe uneingeschränkt ankommt. Und nicht für Verwaltungsaufgaben oder Gehälter verwendet wird. Wir verstehen, daß große Organisationen nicht Alle Tätigkeiten im Ehrenamt erfüllen können, haben uns aber das Ziel gesetzt, einen möglichst hohen Wirkungsgrad des eingesetzten Kapitals gewährleisten zu können. Genauso ist es für uns wichtig, daß wir ein starker Projektpartner sind. Und sehr eng mit den Organisationen, die wir unterstützen, zusammen arbeiten. Auch damit wir völlige Transparenz über die Mittelverwendung haben.</p><h4>Unsere Mission</h4>
<p>Die Ungleichheit in der Welt nimmt mehr und mehr zu. Gleichzeitig gibt es viele engagierte kleine Organisationen, die in ihrer Nachbarschaft oder auch im größeren Maßstab Dinge anpacken. Und helfen. Die möchten wir unterstützen, damit sie noch besser helfen können.</p><h4>Unsere Vision</h4>
<p>Wir glauben daran, dass jeder in der Gesellschaft seinen Anteil dazu beitragen sollte, unsere Welt zu einer besseren Welt zu machen. Jeder, nach seinen Möglichkeiten. Wir können Organisationen Ressourcen anbieten, die sie brauchen, um die fantastische Arbeit, die sie meist schon lange vor Ort durchführen, zu unterstützen.</p><h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<h2>Registration as a provider</h2><p>Hello lovelies,</p>
<p>Here you can register as a vendor for our design flea market on <strong>June 8, 2025</strong> at the <strong>Mallorca Country Club in Santa Ponca </strong>.</p>
<p>Bring your children along, it will be an event for the whole family. And in addition to the good cause, everyone should also have fun! If you have great items in your wardrobe and can spare them, but don't have time to sell them, we can also take over the sale for you. You can select this in the form below and we will contact you to collect the items. </p><p>To ensure that the event is a complete success for the good cause, please note the following points:</p>
<ul>
<li>only offer original designer or high-quality branded products</li>
<li>the number of products per supplier is limited to 15</li>
<li>the products must be in good condition, free from damage</li>
<li>the products should be clean</li>
<li>at least 50% of your proceeds will benefit our foundation </li>
<li>you will be provided with a clothes rack and a space</li>
<li>the flea market lasts from 14:00 - 18:00, please be there one hour before and be at your stand during the flea market</li>
</ul>
<p>We look forward to getting to know you! And making a difference together! </p><h2>What do we do differently?</h2><h3>We would like to "extend help". Therefore, we primarily address voluntary, mostly smaller organizations that provide assistance on the ground. And which we can support with our resources. </h3><p>We place particular emphasis on the efficiency of the aid measures and their sustainability. We want to ensure our donors that your help will be received in full. And not used for administrative tasks or salaries. We understand that large organizations cannot fulfill all activities on a voluntary basis, but we have set ourselves the goal of being able to ensure the highest possible efficiency of the capital invested. In the same way, it is important for us to be a strong project partner. And work very closely with the organizations we support. Also so that we have complete transparency about the use of funds.</p><h4>Our mission</h4>
<p>Inequality in the world is increasing more and more. At the same time, there are many dedicated small organizations that are tackling things in their neighborhoods or on a larger scale. And help. We would like to support them so that they can help even better.</p><h4>Our vision</h4>
<p>We believe that everyone in society should do their part to make our world a better place. Each, according to his possibilities. We can offer organizations resources they need to support the fantastic work they've mostly been doing on the ground for a long time.</p><h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<h2>Inscripción como proveedor</h2><p>Hola amores,</p>
<p>Aquí puede registrarse como vendedor para nuestro mercadillo de diseño el <strong>8 de junio de 2025</strong> en el <strong>Mallorca Country Club de Santa Ponca </strong>.</p>
<p>Traiga a sus hijos, será un acontecimiento para toda la familia. Y además de la buena causa, ¡todo el mundo debe divertirse! Si tienes prendas estupendas en tu armario y te sobran, pero no tienes tiempo para venderlas, también podemos organizar la venta por ti. Puedes seleccionarlo en el formulario que aparece a continuación y nos pondremos en contacto contigo para recoger los artículos. </p><p>Para que el acto sea todo un éxito por una buena causa, tenga en cuenta los siguientes puntos:</p>
<ul>
<li>Ofrecer únicamente productos originales de diseño o de marca de alta calidad</li>
<li>el número de productos por proveedor se limita a 15</li>
<li>los productos deben estar en buen estado, libres de daños</li>
<li>los productos deben estar limpios</li>
<li>al menos el 50% de la recaudación se destinará a nuestra fundación </li>
<li>Le proporcionaremos un perchero y un espacio</li>
<li>el mercadillo dura de 14:00 a 18:00, por favor llegue una hora antes y permanezca en su puesto durante el mercadillo</li>
</ul>
<p>Estamos deseando conocerte. Y marcar juntos la diferencia. </p><h2>¿Qué hacemos de forma diferente?</h2><h3>Nos gustaría "ampliar la ayuda". Por eso nos dirigimos principalmente a organizaciones voluntarias, en su mayoría pequeñas, que prestan ayuda sobre el terreno. Y que podemos apoyar con nuestros recursos. </h3><p>Prestamos especial atención a la eficacia de las medidas de ayuda y a su sostenibilidad. Queremos garantizar a nuestros donantes que su ayuda es plenamente recibida. Y no se utiliza para tareas administrativas o salarios. Entendemos que las grandes organizaciones no pueden realizar todas las actividades de forma voluntaria, pero nos hemos fijado el objetivo de poder garantizar la mayor eficiencia posible del capital invertido. Para nosotros es igualmente importante ser un socio fuerte en el proyecto. Y trabajamos muy estrechamente con las organizaciones a las que apoyamos. También para que tengamos total transparencia sobre el uso de los fondos.</p><h4>Nuestra misión</h4>
<p>La desigualdad en el mundo aumenta cada vez más. Al mismo tiempo, hay muchas pequeñas organizaciones comprometidas que se ocupan de cosas en su barrio o incluso a mayor escala. Y ayuda. Queremos apoyarles para que puedan ayudar aún mejor.</p><h4>Nuestra visión</h4>
<p>Creemos que cada miembro de la sociedad debe contribuir a hacer de nuestro mundo un lugar mejor. Cada uno lo mejor que pueda. Podemos ofrecer a las organizaciones los recursos que necesitan para respaldar el fantástico trabajo que, en su mayoría, llevan mucho tiempo realizando sobre el terreno.</p><h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/charity-fleamarket-santa-ponca/charity-fleamarket-event-poster.jpg',
    published_at: '2025-04-15T18:09:04Z',
  },
  {
    slug_de: 'charity-event-glamour-giving-mallorca',
    slug_en: 'charity-event-glamour-giving-mallorca',
    slug_es: 'evento-solidario-glamour-generosidad-mallorca',
    title_de: 'A Day of Glamour and Giving',
    title_en: 'A Day of Glamour and Giving',
    title_es: 'Un día de glamour y generosidad',
    excerpt_de: 'Unser großes Charity-Event im Mallorca Country Club in Santa Ponça. Ab 14 Uhr erwarten euch Designer-Schnäppchen, Attraktionen für Kinder und eine Show von Educaclowns.',
    excerpt_en: 'Our big charity event at the Mallorca Country Club in Santa Ponça. From 2 PM, enjoy designer bargains, activities for children, and a show by Educaclowns.',
    excerpt_es: 'Nuestro gran evento solidario en el Mallorca Country Club de Santa Ponça. Desde las 14h, disfrutad de gangas de diseñador, actividades infantiles y un espectáculo de Educaclowns.',
    content_de: `<p>Ab 14:00 Uhr geht es los im Mallorca Country Club in Santa Ponça. Damit Ihr wisst, was Euch Alles erwartet, haben wir hier eine Zusammenfassung für Euch.</p>

<p>Am Eingang könnt Ihr Wertbons kaufen für 3 € (blau) und 10 € (rot). Ihr könnt bar oder mit Karte zahlen. Dann könnt Ihr Euren Kindern die Bons in die Hand drücken, damit sie sich frei bewegen und die Attraktionen genießen können, während Ihr in Ruhe shoppt und relaxed.</p>
<h3>Alle Kinderaktivitäten - mit Ausnahme der Hüpfburg - finden im 1. Obergeschoss des Clubgebäudes statt.</h3>
<p>Alle Einnahmen kommen zu 100% der Stiftung zugute, die aufgeführten Anbieter haben die Attraktionen zu Gunsten der Stiftung zur Verfügung gestellt.</p>

<h3></h3>
<h3>Kids Party Lab Mallorca</h3>
<p>Lidia de Bruijn verwandelt Kinder‑Events mit kreativen Motto‑Partys, liebevoller Dekoration und professionellen Entertainern in zauberhafte Erlebnisse.<br />10 Minuten Hüpfburg, Glitzertattoos, Malen, ... je <strong>3€</strong></p>
<p>Wir bedanken uns ganz herlich bei dem Team der <strong>Tiny Town Academy Magaluf</strong>, das sich gemeinsam mit dem Team von Lidia um die Betreuung der lieben Kleinen kümmern wird. </p>

<h3>Many´s Ice Cream Eiswagen</h3>
<p>Erfrischendes Eis sorgt für strahlende Kinderaugen und ist der perfekte Genuss an einem warmen Tag. Ob fruchtig, cremig oder klassisch – für jeden Geschmack ist etwas dabei! Die Kugel für <strong>3€</strong></p>

<h3>🧡 FitLine – Energie, die wirkt</h3>
<p>Zellnahrung mit System – für mehr Power im Alltag. Unsere FitLine-Botschafterin teilt heute nicht nur Kostproben, sondern auch jede Menge Tipps für ein vitales Leben.<br />Findet Eure Lieblingssorte für nur <strong>3€</strong></p>

<h3>Mallorca Country Club</h3>
<p>Der exklusive Sport- und Social-Club in Santa Ponsa wurde in Zusammenarbeit mit Wimbledon gegründet und ist der einzige Club Europas mit Tennisplätzen auf drei Belägen (Rasen, Sand, Hartplatz)</p>
<p>Gutschein Tennis oder Padel - Gruppentraining im Mallorca Country Club <strong>10€</strong> (am Eingang erhältlich) Probemitgliedschaft zum Sonderpreis für einen Monat von <strong>350€</strong> (150€ davon als Spende für die Stiftung)</p>

<h3>Deutsche Facharztzentrum Mallorca</h3>
<h3></h3>
<p>Frau Dr. Normann aus dem Deutschen Facharztzentrum Mallorca bringt Euren Kindern bei, wie sie sich oder Anderen in gefährlichen Situationen helfen können.</p>
<p>Jeweils zur vollen Stunde für<strong> 10€</strong></p>
<p>Ausserdem bietet das Deutsche Facharztzentrum 50 Gutscheine für eine <strong>Massage</strong> zum Sonderpreis von <strong>39€</strong> statt 75€ an. Den Termin vereinbart Ihr direkt mit dem deutschen Facharztzentrum, die Gutscheine könnt Ihr bei uns am Eingang kaufen.</p>

<h3></h3>
<h3></h3>
<h3>Jeveau Effect (extra aus Berlin - nur heute bei uns)</h3>
<p>Magisch glatte Beine, definierte Taille und ein Gefühl wie neu geboren: Diese brasilianisch-berlinerische Bodytechnik kombiniert Lymphdrainage mit Faszientraining – und bringt euch sichtbar zum Strahlen. Terminvereinbarung am Eingang.</p>
<ul>
<li>Oberkörper <strong>59€</strong> (20 Minuten)</li>
<li>Unterkörper <strong>59€</strong> (20 Minuten)</li>
<li>Ganzkörper <strong>99€</strong> (40 Minuten)</li>
</ul>

<h3>✨ The Sanctuary Coaching – mit Laura Hieke</h3>
<p>Ob innerer Rückzug oder sanfte Bewegung – Laura begleitet euch mit Meditation, Atmung und „Glow and Flow“-Pilates in eure Mitte zurück. Eine echte Kraftquelle an diesem besonderen Tag.</p>
<p>Pilates Gruppentraining 20 Minuten (jeweils zur halben Stunde) 10€</p>
<p>Sanctuary Coaching 20 Minuten (jeweils zur vollen Stunde) 15€</p>
<p>Wir haben viel mehr Spenden an hochwertiger Designerware bekommen, als wir erwartet haben. Wir möchten uns besonders bei den Designerpartnern bedanken, die uns Ware zur Verfügung gestellt haben, deren Verkaufserlös zu 100% der guten Sache zugute kommt.</p>

<h3><strong>Furry Kalpazidis, Wien</strong></h3>
<h3><strong>Miss Goodlife, Ibiza</strong></h3>
<h3><strong>Thomas Rath, Düsseldorf</strong></h3>

<p>Ebenso haben sich fast alle unserer privaten Aussteller oder Spender bereit erklärt, nicht nur 50%, sondern 100% ihrer Erlöse zugunsten benachteiligter Kinder auf Mallorca zur Verfügung zu stellen.</p><p>Wir freuen uns riesig, dass auch unsere Partner von <strong>SI Mallorca</strong> und <strong>Educaclowns</strong> dabei sein werden. <strong>Educaclowns</strong> wird uns sogar mit einer tollen Aufführung um <strong>17:00 Uhr</strong> an der <strong>Poolterrasse</strong> begeistern! </p>
<p>Wir hoffen, Ihr habt viel Spaß! Und habt auch viel Spaß daran, Gutes zu tun! Wer keine Zeit hat, aber unsere Arbeit gern unterstützen möchte, kann natürlich auch hier direkt <a href="spende">online spenden</a>!</p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4312.711114192825!2d2.5009024125382213!3d39.50957627148146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129789065673b275%3A0xad535d319dba5635!2sMallorca%20Country%20Club%20%7C%20Tennis%20%26%20Padel!5e1!3m2!1sde!2ses!4v1749308878942!5m2!1sde!2ses" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><h2>Was machen wir anders?</h2><h3>Wir möchten "Hilfe erweitern". Daher adressieren wir in erster Linie ehrenamtliche, meist kleinere Organisationen, die vor Ort Hilfe leisten. Und die wir unterstützen können mit unseren Ressourcen. </h3><p>Besonderen Fokus legen wir auf Effizenz der Hilfemaßnahmen und auf deren Nachhaltigkeit. Wir möchten unseren Stiftern und auch unseren Spendern gegenüber sicherstellen, daß Ihre Hilfe uneingeschränkt ankommt. Und nicht für Verwaltungsaufgaben oder Gehälter verwendet wird. Wir verstehen, daß große Organisationen nicht Alle Tätigkeiten im Ehrenamt erfüllen können, haben uns aber das Ziel gesetzt, einen möglichst hohen Wirkungsgrad des eingesetzten Kapitals gewährleisten zu können. Genauso ist es für uns wichtig, daß wir ein starker Projektpartner sind. Und sehr eng mit den Organisationen, die wir unterstützen, zusammen arbeiten. Auch damit wir völlige Transparenz über die Mittelverwendung haben.</p><h4>Unsere Mission</h4>
<p>Die Ungleichheit in der Welt nimmt mehr und mehr zu. Gleichzeitig gibt es viele engagierte kleine Organisationen, die in ihrer Nachbarschaft oder auch im größeren Maßstab Dinge anpacken. Und helfen. Die möchten wir unterstützen, damit sie noch besser helfen können.</p><h4>Unsere Vision</h4>
<p>Wir glauben daran, dass jeder in der Gesellschaft seinen Anteil dazu beitragen sollte, unsere Welt zu einer besseren Welt zu machen. Jeder, nach seinen Möglichkeiten. Wir können Organisationen Ressourcen anbieten, die sie brauchen, um die fantastische Arbeit, die sie meist schon lange vor Ort durchführen, zu unterstützen.</p><h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<p>The event starts at 2:00 pm at the Mallorca Country Club in Santa Ponça. So that you know what to expect, we have a summary for you here. </p>

<p>At the entrance you can buy vouchers for €3 (blue) and €10 (red). You can pay in cash or by card. You can then hand the vouchers to your children so that they can move around freely and enjoy the attractions while you store and relax in peace. </p>
<h3>All children's activities - with the exception of the bouncy castle - take place on the 1st floor of the club building.</h3>
<p>All proceeds go 100% to the foundation, the listed providers have made the attractions available for the benefit of the foundation.</p>

<h3></h3>
<h3>Kids Party Lab Mallorca</h3>
<p>Lidia de Bruijn transforms children's events into magical experiences with creative theme parties, lovely decorations and professional entertainers.<br>10 minutes Bouncy castle, glitter tattoos, painting, ... <strong>3€</strong> each</p>
<p>We would like to thank the team at <strong>Tiny Town Academy Magaluf</strong> who, together with Lidia's team, will be looking after the little ones. </p>

<h3>Many's Ice Cream trolley</h3>
<p>Refreshing ice cream makes children's eyes light up and is the perfect treat on a warm day. Whether fruity, creamy or classic - there's something for every taste! The scoop for <strong>3€</strong> </p>

<h3>🧡 FitLine - energy that works</h3>
<p>Cell nutrition with a system - for more power in everyday life. Our FitLine ambassador is not only sharing samples today, but also lots of tips for a vital life.<br>Find your favorite variety for just <strong>€3</strong> </p>

<h3>Mallorca Country Club</h3>
<p>The exclusive sports and social club in Santa Ponsa was founded in collaboration with Wimbledon and is the only club in Europe with tennis courts on three surfaces (grass, clay, hard court)</p>
<p>Voucher for tennis or padel group training at the Mallorca Country Club <strong>€10</strong> (available at the entrance) Trial membership at a special price of <strong>€350</strong> for one month (€150 of which is donated to the foundation)</p>

<h3>German Specialist Center Mallorca</h3>
<h3></h3>
<p>Dr. Normann from the German Medical Center Mallorca will teach your children how to help themselves or others in dangerous situations.</p>
<p>Every hour on the hour for<strong> 10€</strong></p>
<p>In addition, the Deutsches Facharztzentrum is offering 50 vouchers for a <strong>massage</strong> at the special price of <strong>€39</strong> instead of €75. You can make an appointment directly with the German Medical Center and buy the vouchers from us at the entrance. </p>

<h3></h3>
<h3></h3>
<h3>Jeveau Effect (specially from Berlin - only today with us)</h3>
<p>Magically smooth legs, a defined waist and a reborn feeling: this Brazilian-Berlin body technique combines lymphatic drainage with fascia training - and will make you visibly glow. Make an appointment at the entrance. </p>
<ul>
<li>Upper body <strong>59€</strong> (20 minutes)</li>
<li>Lower body <strong>59€</strong> (20 minutes)</li>
<li>Full body <strong>99€</strong> (40 minutes)</li>
</ul>

<h3>✨ The Sanctuary Coaching - with Laura Hieke</h3>
<p>Whether it's an inner retreat or gentle movement - Laura will guide you back to your center with meditation, breathing and “Glow and Flow” Pilates. A real source of strength on this special day. </p>
<p>Pilates group training 20 minutes (every half hour) 10€</p>
<p>Sanctuary Coaching 20 minutes (every hour on the hour) 15€</p>
<p>We received many more donations of high-quality designer goods than we expected. We would especially like to thank the designer partners who provided us with goods, 100% of the proceeds of which will go to the good cause. </p>

<h3><strong>Furry Kalpazidis, Vienna</strong></h3>
<h3><strong>Miss Goodlife, Ibiza</strong></h3>
<h3><strong>Thomas Rath, Düsseldorf</strong></h3>

<p>Likewise, almost all of our private exhibitors or donors have agreed to donate not just 50% but 100% of their proceeds to disadvantaged children in Mallorca.</p><p>We are delighted that our partners from <strong>SI Mallorca</strong> and <strong>Educaclowns</strong> will also be there. <strong>Educaclowns</strong> will even delight us with a great performance at <strong>17:00</strong> on the <strong>pool terrace</strong>! </p>
<p>We hope you have a lot of fun! And also have fun doing good! If you don't have time but would like to support our work, you can of course also <a href="donate">donate directly online</a> here! </p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4312.711114192825!2d2.5009024125382213!3d39.50957627148146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129789065673b275%3A0xad535d319dba5635!2sMallorca%20Country%20Club%20%7C%20Tennis%20%26%20Padel!5e1!3m2!1sde!2ses!4v1749308878942!5m2!1sde!2ses" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><h2>What do we do differently?</h2><h3>We would like to "extend help". Therefore, we primarily address voluntary, mostly smaller organizations that provide assistance on the ground. And which we can support with our resources. </h3><p>We place particular emphasis on the efficiency of the aid measures and their sustainability. We want to ensure our donors that your help will be received in full. And not used for administrative tasks or salaries. We understand that large organizations cannot fulfill all activities on a voluntary basis, but we have set ourselves the goal of being able to ensure the highest possible efficiency of the capital invested. In the same way, it is important for us to be a strong project partner. And work very closely with the organizations we support. Also so that we have complete transparency about the use of funds.</p><h4>Our mission</h4>
<p>Inequality in the world is increasing more and more. At the same time, there are many dedicated small organizations that are tackling things in their neighborhoods or on a larger scale. And help. We would like to support them so that they can help even better.</p><h4>Our vision</h4>
<p>We believe that everyone in society should do their part to make our world a better place. Each, according to his possibilities. We can offer organizations resources they need to support the fantastic work they've mostly been doing on the ground for a long time.</p><h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<p>El evento comienza a las 14:00 en el Mallorca Country Club de Santa Ponça. Para que sepas qué esperar, aquí tienes un resumen. </p>

<p>En la entrada se pueden comprar bonos de 3 euros (azules) y 10 euros (rojos). Puede pagar en efectivo o con tarjeta. Después podrá entregar los vales a sus hijos para que puedan moverse libremente y disfrutar de las atracciones mientras usted compra y se relaja tranquilamente. </p>
<h3>Todas las actividades infantiles -a excepción del castillo hinchable- tienen lugar en la 1ª planta del edificio del club.</h3>
<p>Toda la recaudación se donará al 100% a la fundación; los proveedores mencionados han puesto las atracciones a disposición de la fundación.</p>

<h3></h3>
<h3>Kids Party Lab Mallorca</h3>
<p>Lidia de Bruijn transforma los eventos infantiles en experiencias mágicas con fiestas temáticas creativas, decoraciones encantadoras y animadores profesionales.<br>10 minutos Castillo hinchable, tatuajes de purpurina, pintura, ... <strong>3€</strong> cada uno</p>
<p>Queremos dar las gracias al equipo de <strong>Tiny Town Academy Magaluf</strong> que, junto con el equipo de Lidia, cuidará de los más pequeños. </p>

<h3>Carro de helados Many's</h3>
<p>Un helado refrescante hace que a los niños se les iluminen los ojos y es el capricho perfecto en un día caluroso. Afrutados, cremosos o clásicos, ¡hay para todos los gustos! La bola por <strong>3</strong> </p>

<h3>🧡 FitLine: energía que funciona</h3>
<p>Nutrición celular sistemática: para más energía en la vida diaria. Nuestro embajador de FitLine no solo comparte muestras hoy, sino también muchos consejos para una vida vital.<br>Encuentra tu variedad favorita por solo <strong>3 €</strong>. </p>

<h3>Mallorca Country Club</h3>
<p>El exclusivo club deportivo y social de Santa Ponsa se fundó en colaboración con Wimbledon y es el único club de Europa con pistas de tenis en tres superficies (hierba, tierra batida y pista dura).</p>
<p>Bono para entrenamiento en grupo de tenis o pádel en el Mallorca Country Club <strong>10 €</strong> (disponible en la entrada) Abono de prueba a un precio especial de <strong>350 €</strong> durante un mes (150 € de los cuales se donan a la fundación)</p>

<h3>Centro Médico Alemán Mallorca</h3>
<h3></h3>
<p>El Dr. Normann, del Centro Médico Alemán de Mallorca, enseñará a sus hijos a ayudarse a sí mismos o a otros en situaciones de peligro.</p>
<p>Cada hora en punto por<strong> 10 euros</strong></p>
<p>Además, el Centro Médico Especializado Alemán ofrece 50 vales para un <strong>masaje</strong> al precio especial de <strong>39 euros</strong> en lugar de 75 euros. Puede concertar una cita directamente con el Centro Médico Especializado Alemán y comprar los vales en la entrada. </p>

<h3></h3>
<h3></h3>
<h3>Efecto Jeveau (especialmente desde Berlín - sólo hoy con nosotros)</h3>
<p>Piernas mágicamente lisas, cintura definida y una sensación de renacimiento: esta técnica corporal brasileña-berlinesa combina el drenaje linfático con el entrenamiento de la fascia - y le hará resplandecer visiblemente. Pida cita en la entrada. </p>
<ul>
<li>Parte superior del cuerpo <strong>59€</strong> (20 minutos)</li>
<li>Parte inferior del cuerpo <strong>59€</strong> (20 minutos)</li>
<li>Cuerpo completo <strong>99€</strong> (40 minutos)</li>
</ul>

<h3>✨ El Santuario Coaching - con Laura Hieke</h3>
<p>Ya sea un retiro interior o un movimiento suave, Laura te guiará de vuelta a tu centro con meditación, respiración y Pilates “Glow and Flow”. Una verdadera fuente de fuerza en este día tan especial. </p>
<p>Entrenamiento en grupo de Pilates 20 minutos (cada media hora) 10</p>
<p>Coaching Santuario 20 minutos (cada hora en punto) 15</p>
<p>Hemos recibido muchas más donaciones de artículos de diseño de alta calidad de las que esperábamos. Queremos dar las gracias especialmente a los diseñadores asociados que nos han proporcionado artículos cuyos beneficios se destinarán en un 100% a esta buena causa. </p>

<h3><strong>Furry Kalpazidis, Viena</strong></h3>
<h3><strong>Miss Goodlife, Ibiza</strong></h3>
<h3><strong>Thomas Rath, Düsseldorf</strong></h3>

<p>Casi todos nuestros expositores o donantes privados también han aceptado donar no sólo el 50%, sino el 100% de sus ingresos en favor de los niños desfavorecidos de Mallorca.</p><p>Estamos encantados de que nuestros socios de <strong>SI Mallorca</strong> y <strong>Educaclowns</strong> también estén allí. ¡ <strong>Educaclowns</strong> incluso nos deleitará con una gran actuación a las <strong>17:00</strong> en la <strong>terraza de la piscina</strong>! </p>
<p>Esperamos que te diviertas mucho. Y que también te diviertas haciendo el bien. Si no tienes tiempo pero quieres apoyar nuestro trabajo, por supuesto también puedes <a href="donar">donar directamente en línea</a> aquí. </p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4312.711114192825!2d2.5009024125382213!3d39.50957627148146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x129789065673b275%3A0xad535d319dba5635!2sMallorca%20Country%20Club%20%7C%20Tennis%20%26%20Padel!5e1!3m2!1sde!2ses!4v1749308878942!5m2!1sde!2ses" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe><h2>¿Qué hacemos de forma diferente?</h2><h3>Nos gustaría "ampliar la ayuda". Por eso nos dirigimos principalmente a organizaciones voluntarias, en su mayoría pequeñas, que prestan ayuda sobre el terreno. Y que podemos apoyar con nuestros recursos. </h3><p>Prestamos especial atención a la eficacia de las medidas de ayuda y a su sostenibilidad. Queremos garantizar a nuestros donantes que su ayuda es plenamente recibida. Y no se utiliza para tareas administrativas o salarios. Entendemos que las grandes organizaciones no pueden realizar todas las actividades de forma voluntaria, pero nos hemos fijado el objetivo de poder garantizar la mayor eficiencia posible del capital invertido. Para nosotros es igualmente importante ser un socio fuerte en el proyecto. Y trabajamos muy estrechamente con las organizaciones a las que apoyamos. También para que tengamos total transparencia sobre el uso de los fondos.</p><h4>Nuestra misión</h4>
<p>La desigualdad en el mundo aumenta cada vez más. Al mismo tiempo, hay muchas pequeñas organizaciones comprometidas que se ocupan de cosas en su barrio o incluso a mayor escala. Y ayuda. Queremos apoyarles para que puedan ayudar aún mejor.</p><h4>Nuestra visión</h4>
<p>Creemos que cada miembro de la sociedad debe contribuir a hacer de nuestro mundo un lugar mejor. Cada uno lo mejor que pueda. Podemos ofrecer a las organizaciones los recursos que necesitan para respaldar el fantástico trabajo que, en su mayoría, llevan mucho tiempo realizando sobre el terreno.</p><h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/day-of-glamour-and-giving/glamour-giving-event-mallorca.jpg',
    published_at: '2025-06-07T11:04:44Z',
  },
  {
    slug_de: 'charity-flohmarkt-ergebnis-9626-euro',
    slug_en: 'charity-fleamarket-result-9626-euros',
    slug_es: 'resultado-mercadillo-solidario-9626-euros',
    title_de: '9.626,- Euro! Vielen Dank!',
    title_en: '9,626 Euros! Thank You So Much!',
    title_es: '9.626 euros! Muchas gracias!',
    excerpt_de: 'Unser Luxus-Flohmarkt für den guten Zweck war ein voller Erfolg! 9.626 Euro für benachteiligte Kinder auf Mallorca, aufgeteilt zwischen Si Mallorca und Educaclowns.',
    excerpt_en: 'Our luxury charity flea market was a huge success! 9,626 euros raised for disadvantaged children in Mallorca, split between Si Mallorca and Educaclowns.',
    excerpt_es: 'Nuestro mercadillo solidario de lujo fue un gran éxito. 9.626 euros recaudados para niños desfavorecidos en Mallorca, repartidos entre Si Mallorca y Educaclowns.',
    content_de: `<p>Unser Luxus Flohmarkt (<a href="/?p=1758">a day of glory and giving</a>) war ein voller Erfolg! Vielen Dank Euch dafür! Wir haben 9.626,- Euro eingenommen, die wir - wie versprochen - am 16.7. an die Organisationen Si Mallorca und Educaclowns jeweils hälftig weiter geben werden.</p>
<p>Die entstandenen Kosten wurden entweder von uns, der Fundació Predator oder unsererem Stifter, der <a href="https://predatorsl.com">Predator SL</a>, übernommen.</p>
<p>An dieser Stelle möchten wir uns noch einmal ganz herzlich für die unglaublich grosszügige Unterstützung von so vielen Beteiligten bedanken!</p><h3>Kids Party Lab Mallorca</h3>

<h3>Tiny Town Academy Magaluf</h3>
<h3></h3>
<h3>Many´s Ice Cream Eiswagen</h3>
<h3></h3>
<h3>🧡 FitLine – Energie, die wirkt</h3>
<h3></h3>
<h3>Mallorca Country Club</h3>
<h3></h3>
<h3>Deutsche Facharztzentrum Mallorca</h3>
<h3></h3>
<h3>Jeveau Effect</h3>
<ul></ul>
<h3>✨ The Sanctuary Coaching – mit Laura Hieke</h3><p>Wir haben viel mehr Spenden an hochwertiger Designerware bekommen, als wir erwartet haben. Wir möchten uns besonders bei den Designerpartnern bedanken, die uns Ware zur Verfügung gestellt haben, deren Verkaufserlös zu 100% der guten Sache zugute kommt.</p>

<h3><strong>Furry Kalpazidis, Wien</strong></h3>
<h3><strong>Miss Goodlife, Ibiza</strong></h3>
<h3><strong>Thomas Rath, Düsseldorf</strong></h3>

<p>Ebenso haben sich fast alle unserer privaten Aussteller oder Spender bereit erklärt, nicht nur 50%, sondern 100% ihrer Erlöse zugunsten benachteiligter Kinder auf Mallorca zur Verfügung zu stellen.</p><p>Und natürlich waren auch unsere Partner von <strong>SI Mallorca</strong> und <strong>Educaclowns</strong> dabei. Die sich mit ihrer Arbeit direkt vor Ort jeden Tag und unermüdlich für das Wohl von Kindern auf Mallorca engagieren.</p>
<p>Das war unser erstes Event. Es war viel Arbeit, wir haben viel gelernt und wir hatten Spass. Den hattet Ihr hoffentlich auch!</p>
<p>Bitte lasst uns aber dabei daran denken, das die Arbeit weiter gehen muss. Und wenn Ihr könnt, helft uns doch bitte mit einer Spende.</p><h2>Was machen wir anders?</h2><h3>Wir möchten "Hilfe erweitern". Daher adressieren wir in erster Linie ehrenamtliche, meist kleinere Organisationen, die vor Ort Hilfe leisten. Und die wir unterstützen können mit unseren Ressourcen. </h3><p>Besonderen Fokus legen wir auf Effizenz der Hilfemaßnahmen und auf deren Nachhaltigkeit. Wir möchten unseren Stiftern und auch unseren Spendern gegenüber sicherstellen, daß Ihre Hilfe uneingeschränkt ankommt. Und nicht für Verwaltungsaufgaben oder Gehälter verwendet wird. Wir verstehen, daß große Organisationen nicht Alle Tätigkeiten im Ehrenamt erfüllen können, haben uns aber das Ziel gesetzt, einen möglichst hohen Wirkungsgrad des eingesetzten Kapitals gewährleisten zu können. Genauso ist es für uns wichtig, daß wir ein starker Projektpartner sind. Und sehr eng mit den Organisationen, die wir unterstützen, zusammen arbeiten. Auch damit wir völlige Transparenz über die Mittelverwendung haben.</p><h4>Unsere Mission</h4>
<p>Die Ungleichheit in der Welt nimmt mehr und mehr zu. Gleichzeitig gibt es viele engagierte kleine Organisationen, die in ihrer Nachbarschaft oder auch im größeren Maßstab Dinge anpacken. Und helfen. Die möchten wir unterstützen, damit sie noch besser helfen können.</p><h4>Unsere Vision</h4>
<p>Wir glauben daran, dass jeder in der Gesellschaft seinen Anteil dazu beitragen sollte, unsere Welt zu einer besseren Welt zu machen. Jeder, nach seinen Möglichkeiten. Wir können Organisationen Ressourcen anbieten, die sie brauchen, um die fantastische Arbeit, die sie meist schon lange vor Ort durchführen, zu unterstützen.</p><h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<p>Our luxury flea market<a href="https://fundaciopredator.org/en/1882/">(a day of glory and giving</a>) was a complete success! Thank you very much for that! We raised 9,626 euros, which we will use - as promised - on 16.7. to the organizations Si Mallorca and Educaclowns.</p>
<p>The costs incurred were covered either by us, the Fundació Predator, or by our donor, <a href="https://predatorsl.com">Predator SL</a>.</p>
<p>We would like to take this opportunity to thank so many people once again for their incredibly generous support!</p><h3>Kids Party Lab Mallorca</h3>

<h3>Tiny Town Academy Magaluf</h3>
<h3></h3>
<h3>Many's Ice Cream trolley</h3>
<h3></h3>
<h3>🧡 FitLine - energy that works</h3>
<h3></h3>
<h3>Mallorca Country Club</h3>
<h3></h3>
<h3>German Specialist Center Mallorca</h3>
<h3></h3>
<h3>Jeveau Effect</h3>
<ul></ul>
<h3>✨ The Sanctuary Coaching - with Laura Hieke</h3><p>We received many more donations of high-quality designer goods than we expected. We would especially like to thank the designer partners who provided us with goods, 100% of the proceeds of which will go to the good cause. </p>

<h3><strong>Furry Kalpazidis, Vienna</strong></h3>
<h3><strong>Miss Goodlife, Ibiza</strong></h3>
<h3><strong>Thomas Rath, Düsseldorf</strong></h3>

<p>Likewise, almost all of our private exhibitors or donors have agreed to donate not just 50% but 100% of their proceeds to disadvantaged children in Mallorca.</p><p>And of course, our partners from <strong>SI Mallorca</strong> and <strong>Educaclowns</strong> were also there. Our partners from SI Mallorca and Educaclowns, who work tirelessly every day for the well-being of children on Mallorca. </p>
<p>This was our first event. It was a lot of work, we learned a lot and we had fun. Hopefully you did too! </p>
<p>But please let us remember that the work must go on. And if you can, please help us with a donation. </p><h2>What do we do differently?</h2><h3>We would like to "extend help". Therefore, we primarily address voluntary, mostly smaller organizations that provide assistance on the ground. And which we can support with our resources. </h3><p>We place particular emphasis on the efficiency of the aid measures and their sustainability. We want to ensure our donors that your help will be received in full. And not used for administrative tasks or salaries. We understand that large organizations cannot fulfill all activities on a voluntary basis, but we have set ourselves the goal of being able to ensure the highest possible efficiency of the capital invested. In the same way, it is important for us to be a strong project partner. And work very closely with the organizations we support. Also so that we have complete transparency about the use of funds.</p><h4>Our mission</h4>
<p>Inequality in the world is increasing more and more. At the same time, there are many dedicated small organizations that are tackling things in their neighborhoods or on a larger scale. And help. We would like to support them so that they can help even better.</p><h4>Our vision</h4>
<p>We believe that everyone in society should do their part to make our world a better place. Each, according to his possibilities. We can offer organizations resources they need to support the fantastic work they've mostly been doing on the ground for a long time.</p><h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<p>Nuestro mercadillo de lujo<a href="https://fundaciopredator.org/es/1879/">(un día de gloria y donaciones</a>) fue todo un éxito. Muchas gracias. Hemos recaudado 9.626 euros, que -como prometimos- utilizaremos el 16 de julio. a las organizaciones Si Mallorca y Educaclowns.</p>
<p>Los gastos incurridos fueron sufragados por nosotros, la Fundació Predator, o por nuestro patrocinador, <a href="https://predatorsl.com">Predator SL</a>.</p>
<p>Queremos aprovechar esta oportunidad para agradecer una vez más a tanta gente su apoyo increíblemente generoso.</p><h3>Kids Party Lab Mallorca</h3>

<h3>Academia Tiny Town Magaluf</h3>
<h3></h3>
<h3>Carro de helados Many's</h3>
<h3></h3>
<h3>🧡 FitLine: energía que funciona</h3>
<h3></h3>
<h3>Mallorca Country Club</h3>
<h3></h3>
<h3>Centro Médico Alemán Mallorca</h3>
<h3></h3>
<h3>Efecto Jeveau</h3>
<ul></ul>
<h3>✨ El Santuario Coaching - con Laura Hieke</h3><p>Hemos recibido muchas más donaciones de artículos de diseño de alta calidad de las que esperábamos. Queremos dar las gracias especialmente a los diseñadores asociados que nos han proporcionado artículos cuyos beneficios se destinarán en un 100% a esta buena causa. </p>

<h3><strong>Furry Kalpazidis, Viena</strong></h3>
<h3><strong>Miss Goodlife, Ibiza</strong></h3>
<h3><strong>Thomas Rath, Düsseldorf</strong></h3>

<p>Casi todos nuestros expositores o donantes privados también han aceptado donar no sólo el 50%, sino el 100% de sus ingresos en favor de los niños desfavorecidos de Mallorca.</p><p>Y, por supuesto, nuestros socios de <strong>SI Mallorca</strong> y <strong>Educaclowns</strong> también estuvieron allí. Nuestros socios de SI Mallorca y Educaclowns, que trabajan incansablemente cada día por el bienestar de los niños de Mallorca. </p>
<p>Este fue nuestro primer evento. Fue mucho trabajo, aprendimos mucho y nos divertimos. Esperamos que ustedes también. </p>
<p>Pero, por favor, recordemos que el trabajo debe continuar. Y si puede, ayúdenos con un donativo. </p><h2>¿Qué hacemos de forma diferente?</h2><h3>Nos gustaría "ampliar la ayuda". Por eso nos dirigimos principalmente a organizaciones voluntarias, en su mayoría pequeñas, que prestan ayuda sobre el terreno. Y que podemos apoyar con nuestros recursos. </h3><p>Prestamos especial atención a la eficacia de las medidas de ayuda y a su sostenibilidad. Queremos garantizar a nuestros donantes que su ayuda es plenamente recibida. Y no se utiliza para tareas administrativas o salarios. Entendemos que las grandes organizaciones no pueden realizar todas las actividades de forma voluntaria, pero nos hemos fijado el objetivo de poder garantizar la mayor eficiencia posible del capital invertido. Para nosotros es igualmente importante ser un socio fuerte en el proyecto. Y trabajamos muy estrechamente con las organizaciones a las que apoyamos. También para que tengamos total transparencia sobre el uso de los fondos.</p><h4>Nuestra misión</h4>
<p>La desigualdad en el mundo aumenta cada vez más. Al mismo tiempo, hay muchas pequeñas organizaciones comprometidas que se ocupan de cosas en su barrio o incluso a mayor escala. Y ayuda. Queremos apoyarles para que puedan ayudar aún mejor.</p><h4>Nuestra visión</h4>
<p>Creemos que cada miembro de la sociedad debe contribuir a hacer de nuestro mundo un lugar mejor. Cada uno lo mejor que pueda. Podemos ofrecer a las organizaciones los recursos que necesitan para respaldar el fantástico trabajo que, en su mayoría, llevan mucho tiempo realizando sobre el terreno.</p><h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/luxus-flohmarkt-ergebnis/charity-flohmarkt-ergebnis-cover.jpg',
    published_at: '2025-07-04T05:53:12Z',
  },
  {
    slug_de: 'ehrenamt-si-mallorca-kinderhilfe',
    slug_en: 'volunteering-si-mallorca-children-aid',
    slug_es: 'voluntariado-si-mallorca-ayuda-infantil',
    title_de: 'Mit Si Mallorca unterwegs',
    title_en: 'On the Road with Si Mallorca',
    title_es: 'De ruta con Si Mallorca',
    excerpt_de: 'Wir haben Si Mallorca bei einer Hilfstour begleitet. Anja verteilt wöchentlich Sachspenden an bedürftige Familien mit Kindern in Palmas ärmsten Vierteln.',
    excerpt_en: 'We accompanied Si Mallorca on a charity tour. Anja distributes donations weekly to families with children in need in Palma\'s poorest neighborhoods.',
    excerpt_es: 'Acompañamos a Si Mallorca en una ruta de ayuda. Anja distribuye donaciones semanalmente a familias necesitadas con niños en los barrios más pobres de Palma.',
    content_de: `<p data-start="914" data-end="1239">mallorca ist für viele ein ort der sonne, des meeres und unbeschwerter tage. doch abseits der postkartenidylle gibt es familien, deren alltag vom gegenteil geprägt ist – fehlende mittel für das nötigste, unsichere lebensumstände und vor allem: kinder, die nicht genug zu essen haben, keine windeln, keine passende kleidung.</p><p>seit vielen jahren kümmert sich <strong data-start="1279" data-end="1294">si mallorca</strong>, gegründet von anja, genau um diese menschen. ehrenamtlich, unermüdlich und mit einem engagement, das weit über das hinausgeht, was man erwarten könnte. jeden tag sorgen sie dafür, dass spenden aus der gemeinschaft – babynahrung, windeln, hygieneartikel, kleidung – dort ankommen, wo sie wirklich gebraucht werden: direkt bei den familien. ohne umwege, ohne bürokratie.</p><p><span>diesmal durften wir anja bei einer ihrer touren begleiten – gemeinsam mit frau dr. sandra norman, kinderärztin im </span><strong data-start="1788" data-end="1823">deutschen facharztzentrum (dfz)</strong><span>, die sich ehrenamtlich angeschlossen hat. unsere erste station war </span><strong data-start="1891" data-end="1905">son gotleu</strong><span>, einer der ärmsten stadtteile mallorcas. zwischen wohnblöcken, spielplätzen und parkbänken haben wir mütter getroffen, die dankbar jede packung milchpulver und jede windel entgegennahmen. wir haben kinder gesehen, die neugierig in die spendenkisten schauten, und lächelnde gesichter, wenn sie etwas fanden, das sie direkt brauchen konnten.</span></p><p><span>später führte uns der weg in eine </span><strong data-start="2289" data-end="2330">obdachlosensiedlung nahe der autobahn</strong><span> – ein ort, den man als urlauber nie zu sehen bekommt. dort leben familien in improvisierten behausungen, umgeben von staub, hitze und notdürftigen konstruktionen. doch auch hier gab es einen moment der hoffnung, als wir gemeinsam pakete entluden und in die hände von eltern legten, die kaum glauben konnten, dass jemand bis zu ihnen gekommen war.</span></p><p data-start="2687" data-end="2895">jeder dieser momente hat uns gezeigt, wie wichtig diese arbeit ist – und wie sehr jede spende zählt. <strong data-start="2788" data-end="2803">si mallorca</strong> finanziert sich ausschließlich aus spenden und jeder euro fließt direkt in hilfe vor ort.</p>
<p data-start="2903" data-end="3048">bitte helft mit, damit auch in den nächsten wochen und monaten kein kind auf mallorca hungern oder frieren muss.<br data-start="3015" data-end="3018" /></p><h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<p data-start="914" data-end="1239">for many, mallorca is a place of sun, sea and carefree days. but away from the postcard idyll, there are families whose everyday life is characterized by the opposite - a lack of resources for the bare necessities, uncertain living conditions and above all: children who don't have enough to eat, no diapers, no suitable clothing. </p><p><strong data-start="1279" data-end="1294">si mallorca</strong>, founded by anja, has been looking after these people for many years. volunteering, tirelessly and with a commitment that goes far beyond what one might expect. every day, they make sure that donations from the community - baby food, diapers, hygiene articles, clothing - get to where they are really needed: directly to the families. without detours, without bureaucracy.</p><p><span>this time we had the pleasure of accompanying anja on one of her tours - together with dr. sandra norman, pediatrician at the </span><strong data-start="1788" data-end="1823">german specialist center (dfz)</strong><span>who joined us on a voluntary basis. our first station was </span><strong data-start="1891" data-end="1905">son gotleu</strong><span>one of the poorest districts of mallorca. between blocks of flats, playgrounds and park benches, we met mothers who gratefully accepted every packet of powdered milk and every diaper. we saw children looking curiously into the donation boxes and smiling faces when they found something they could use straight away. </span></p><p><span>later the path led us to a </span><strong data-start="2289" data-end="2330">homeless settlement near the highway</strong><span> - a place you never get to see as a vacationer. families live there in improvised dwellings, surrounded by dust, heat and makeshift constructions. but even here there was a moment of hope when we unloaded parcels together and placed them in the hands of parents who could hardly believe that someone had made it all the way to them. </span></p><p data-start="2687" data-end="2895">each of these moments has shown us how important this work is - and how much every donation counts. <strong data-start="2788" data-end="2803">si mallorca</strong> is financed exclusively by donations and every euro goes directly to help on the ground.</p>
<p data-start="2903" data-end="3048">please help to ensure that no child has to go hungry or freeze in mallorca in the coming weeks and months.<br data-start="3015" data-end="3018"></p><h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<p data-start="914" data-end="1239">para muchos, mallorca es un lugar de sol, mar y días sin preocupaciones. pero lejos del idilio de postal, hay familias cuyo día a día se caracteriza por todo lo contrario: falta de recursos para lo estrictamente necesario, condiciones de vida inseguras y, sobre todo: niños que no tienen para comer, ni pañales, ni ropa adecuada. </p><p><strong data-start="1279" data-end="1294">si mallorca</strong>, fundada por anja, se ocupa de estas personas desde hace muchos años. De forma voluntaria, incansable y con un compromiso que va mucho más allá de lo que cabría esperar. cada día, se aseguran de que las donaciones de la comunidad -alimentos infantiles, pañales, artículos de higiene, ropa- lleguen a donde realmente se necesitan: directamente a las familias. sin rodeos, sin burocracia.</p><p><span>esta vez tuvimos el placer de acompañar a anja en una de sus visitas - junto con la dr sandra norman, pediatra del </span><strong data-start="1788" data-end="1823">centro especializado alemán (dfz)</strong><span>que se unieron a nosotros de forma voluntaria. nuestra primera estación fue </span><strong data-start="1891" data-end="1905">hijo gotleu</strong><span>entre bloques de pisos, parques infantiles y bancos de parques, conocimos a madres que aceptaban agradecidas cada paquete de leche en polvo y cada pañal. vimos a niños que miraban con curiosidad las cajas de donativos y caras sonrientes cuando encontraban algo que podían utilizar de inmediato. </span></p><p><span>más tarde la carretera nos llevó a un </span><strong data-start="2289" data-end="2330">asentamiento de indigentes cerca de la autopista</strong><span> - un lugar que los veraneantes nunca llegan a ver. las familias viven allí en viviendas improvisadas, rodeadas de polvo, calor y construcciones improvisadas. pero incluso aquí hubo un momento de esperanza cuando descargamos juntos los paquetes y los pusimos en manos de unos padres que apenas podían creer que alguien hubiera llegado tan lejos como ellos. </span></p><p data-start="2687" data-end="2895">cada uno de estos momentos nos ha demostrado lo importante que es este trabajo y lo mucho que cuenta cada donación. <strong data-start="2788" data-end="2803">si mallorca</strong> se financia exclusivamente con donaciones y cada euro se destina directamente a ayudar sobre el terreno.</p>
<p data-start="2903" data-end="3048">por favor, ayude a garantizar que ningún niño tenga que pasar hambre o frío en mallorca en las próximas semanas y meses.<br data-start="3015" data-end="3018"></p><h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/mit-si-mallorca-unterwegs/si-mallorca-tour-cover.jpg',
    published_at: '2025-08-11T09:44:50Z',
  },
  {
    slug_de: 'unternehmenspartnerschaft-berger-consultants',
    slug_en: 'corporate-partnership-berger-consultants',
    slug_es: 'asociacion-empresarial-berger-consultants',
    title_de: 'Gemeinsam Verantwortung übernehmen',
    title_en: 'Taking Responsibility Together',
    title_es: 'Asumir juntos la responsabilidad',
    excerpt_de: 'Unsere erste offizielle Unternehmenspartnerschaft! Berger Consultants unterstützt die Fundació Predator mit einer großzügigen Initialspende für Kinder auf Mallorca.',
    excerpt_en: 'Our very first official corporate partnership! Berger Consultants supports Fundació Predator with a generous initial donation for children in Mallorca.',
    excerpt_es: 'Nuestra primera asociación empresarial oficial! Berger Consultants apoya a la Fundació Predator con una generosa donación inicial para niños en Mallorca.',
    content_de: `<p>Es gibt Begegnungen, die mehr sind als nur ein Zufall. Als Xenia und Christian Berger sich kürzlich auf Mallorca trafen, ging es schnell nicht mehr nur um Smalltalk, sondern um gemeinsame Werte: Den Willen, Dinge zu bewegen und Menschen dabei zu helfen, über sich hinauszuwachsen.</p>
<p>Wir sind überglücklich, heute unsere allererste offizielle Unternehmenspartnerschaft verkünden zu dürfen! 🎉</p>
<p><b>Berger Consultants</b><span> </span>(Christian Berger Executive Search) setzt mit einer großzügigen Initialspende ein starkes Zeichen. Christian zeigt damit, dass soziales Engagement für moderne Unternehmen nicht nur eine Pflichtkür, sondern eine Herzensangelegenheit ist.</p>
<p>Warum passt das so gut? Christian Berger ist seit über 25 Jahren eine feste Größe, wenn es um Führungspositionen in der IT- und Tech-Welt geht. Als ehemaliger VP Sales und General Manager internationaler Konzerne<span> </span><span><response-element></response-element></span><span> </span>weiß er genau:<span> </span><b>Wahres Wachstum entsteht nur durch Investition in Menschen.</b></p>
<p>Sein unternehmerisches Credo lautet "Growth at the Core".<span><response-element></response-element></span><span> </span>In seinem Berufsleben hilft er mittelständischen und großen Unternehmen durch Executive Search und strategisches Coaching, die besten Talente zu finden und High-Performing Teams zu formen.<span><response-element></response-element></span><span> </span>Mit seiner Unterstützung unserer Stiftung weitet er dieses Engagement nun auf die Kleinsten aus: Er hilft uns, Kindern und Familien in Not auf Mallorca eine bessere Zukunft zu ermöglichen.</p>
<p>Vom Identifizieren von Top-Talenten in der Wirtschaft zur Förderung von verborgenen Talenten bei Kindern – danke, Christian, für dieses wunderbare "Match", dein Vertrauen in unsere Arbeit und den Startschuss für unsere Partnerschaft!</p><h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<p>There are encounters that are more than just a coincidence. When Xenia and Christian Berger recently met on Mallorca, it was quickly no longer just about small talk, but about shared values: the desire to make things happen and help people to surpass themselves. </p>
<p>We are overjoyed to announce our very first official corporate partnership today! 🎉</p>
<p><b>Berger Consultants</b><span> </span>(Christian Berger Executive Search) is sending out a strong signal with a generous initial donation. Christian shows that social commitment is not just an obligation for modern companies, but a matter of the heart. </p>
<p>Why is this such a good fit? Christian Berger has been a constant for over 25 years when it comes to management positions in the IT and tech world. As a former VP Sales and General Manager of international corporations <span> </span><span><response-element></response-element></span><span> </span>he knows exactly:<span> </span><b>True growth only comes from investing in people.</b></p>
<p>His entrepreneurial credo is "Growth at the Core".<span><response-element></response-element></span><span> </span>In his professional life, he helps medium-sized and large companies to find the best talent and form high-performing teams through executive search and strategic coaching.<span><response-element></response-element></span><span> </span>With his support for our foundation, he is now extending this commitment to the little ones: He helps us to give children and families in need on Mallorca a better future.</p>
<p>From identifying top talents in business to promoting hidden talents in children - thank you, Christian, for this wonderful "match", your trust in our work and the go-ahead for our partnership!</p><h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<p>Hay encuentros que son algo más que una simple coincidencia. Cuando Xenia y Christian Berger se conocieron recientemente en Mallorca, rápidamente dejaron de ser meras charlas, para convertirse en valores compartidos: el deseo de hacer que las cosas sucedan y ayudar a las personas a superarse. </p>
<p>Estamos encantados de anunciar hoy nuestra primera colaboración oficial con una empresa. 🎉</p>
<p><b>Berger Consultores</b><span> </span>(Christian Berger Executive Search) envía una señal clara con una generosa donación inicial. Christian está demostrando que el compromiso social no es solo un deber de las empresas modernas, sino un asunto del corazón. </p>
<p>¿Por qué encaja tan bien? Christian Berger lleva más de 25 años ocupando puestos directivos en el mundo de la informática y la tecnología. Como antiguo Vicepresidente de Ventas y Director General de empresas internacionales <span> </span><span><response-element></response-element></span><span> </span>lo sabe exactamente:<span> </span><b>El verdadero crecimiento sólo se consigue invirtiendo en las personas.</b></p>
<p>Su credo empresarial es "Crecimiento en el núcleo".<span><response-element></response-element></span><span> </span>En su vida profesional, ayuda a medianas y grandes empresas a encontrar el mejor talento y a formar equipos de alto rendimiento mediante la búsqueda de directivos y el coaching estratégico.<span><response-element></response-element></span><span> </span>Con su apoyo a nuestra fundación, ahora amplía este compromiso a los más pequeños: Nos ayuda a ofrecer un futuro mejor a los niños y familias necesitadas de Mallorca.</p>
<p>Desde la identificación de los mejores talentos en las empresas hasta la promoción de los talentos ocultos en los niños: ¡gracias, Christian, por este maravilloso "match", por tu confianza en nuestro trabajo y por el visto bueno a nuestra asociación!</p><h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/gemeinsam-verantwortung-uebernehmen/unternehmenspartnerschaft-cover.jpg',
    published_at: '2025-11-13T04:36:02Z',
  },
  {
    slug_de: 'kinderarmut-mallorca-realitaet',
    slug_en: 'child-poverty-mallorca-reality',
    slug_es: 'pobreza-infantil-mallorca-realidad',
    title_de: 'So leben Kinder auf Mallorca',
    title_en: 'How Children Live in Mallorca',
    title_es: 'Cómo viven los niños en Mallorca',
    excerpt_de: 'Der Winter auf Mallorca offenbart stille Not: Kinder frieren, Familien fehlt es am Nötigsten. Xenia hat die Realität bei einer Verteilaktion mit Si Mallorca dokumentiert.',
    excerpt_en: 'Winter in Mallorca reveals hidden hardship: children are cold, families lack basic necessities. Xenia documented the reality during a distribution tour with Si Mallorca.',
    excerpt_es: 'El invierno en Mallorca revela una necesidad silenciosa: niños pasan frío, familias carecen de lo básico. Xenia documentó la realidad en una acción de reparto con Si Mallorca.',
    content_de: `<p>Der Winter auf Mallorca offenbart jedes Jahr eine stille Not, die vielen verborgen bleibt: Auf unserer Insel frieren Kinder. In Familien, denen es ohnehin am Nötigsten fehlt – an Lebensmitteln, warmer Kleidung, Babymilch und Windeln – wird die Kälte zur unerträglichen Belastung.</p>
<p>Xenia hat die folgenden Bilder auf einer der Verteilaktionen gemacht. Wir möchten Euch ungeschminkt und echt zeigen, wie die Lebensumstände vieler Familien hier sind. Unvorstellbar, oder? Aber bittere Realität.</p><p>Seit vielen jahren kümmert sich S<strong data-start="1279" data-end="1294">i Mallorca</strong>, gegründet von Anja, genau um diese menschen. Ehrenamtlich, unermüdlich und mit einem Engagement, das weit über das hinausgeht, was man erwarten könnte. Jeden tag arbeitet sie dafür, dass Spenden aus der gemeinschaft – Babynahrung, Windeln, Hygieneartikel, Kleidung – dort ankommen, wo sie wirklich gebraucht werden: direkt bei den Familien. Ohne Umwege, ohne Bürokratie.</p><p>Wir unterstützen Si Mallorca seit etwa zwei Jahren mit einer festen monatlichen Zahlung. Und haben angesichts der Not, die ja unvorstellbar sein sollte auf dieser Insel "der Reichen und Schönen" letzte Woche 5.000,- Euro zusätzliche Hilfe an Si Mallorca überwiesen. Die Spendenbereitschaft hat insgesamt nachgelassen. Aber es gibt nicht weniger Menschen, die darauf angewiesen sind.</p>

<h2>Helft uns helfen!</h2>
<p>Unterstützt die Arbeit von Si Mallorca und anderen ehrenamtlichen Organisationen, deren Arbeit wir begleiten, mit einer Spende. Wir garantieren dafür, dass kein Cent Eurer Spende für Verwaltung oder Bürokratie draufgeht. Sondern wirklich Alles denen zugute kommt, die es nötig haben.</p>

<h2>Jetzt online spenden!</h2>
<p>Spendet jetzt online und helft uns, den Kindern und Familien ein etwas lebenswürdigeres Weihnachten zu bescheren!</p>
^<h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<p>Every year, winter on Mallorca reveals a silent need that remains hidden to many: Children are freezing on our island. In families that already lack the most basic necessities - food, warm clothing, baby milk and diapers - the cold becomes an unbearable burden. </p>
<p>Xenia took the following pictures at one of the distribution events. We want to show you the unvarnished and genuine living conditions of many families here. Unimaginable, isn't it? But a bitter reality. </p><p><strong data-start="1279" data-end="1294">Si Mallorca</strong>, founded by Anja, has been looking after these people for many years. Voluntarily, tirelessly and with a commitment that goes far beyond what one might expect. Every day, she works to ensure that donations from the community - baby food, diapers, hygiene articles, clothing - get to where they are really needed: directly to the families. Without detours, without bureaucracy.</p><p>We have been supporting Si Mallorca for around two years with a fixed monthly payment. And in view of the need, which should be unimaginable on this island "of the rich and beautiful", we transferred an additional 5,000 euros in aid to Si Mallorca last week. The overall willingness to donate has waned. But there are no fewer people who need it. </p>

<h2>Help us help!</h2>
<p>Support the work of Si Mallorca and other voluntary organizations whose work we support with a donation. We guarantee that not a single cent of your donation will go to administration or bureaucracy. Instead, everything really goes to those who need it. </p>

<h2>Donate online now!</h2>
<p>Donate online now and help us to give children and families a Christmas worth living!</p>
^<h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<p>Cada año, el invierno en Mallorca revela una necesidad silenciosa que permanece oculta para muchos: Los niños se mueren de frío en nuestra isla. En familias que ya carecen de lo más básico -alimentos, ropa de abrigo, leche infantil y pañales-, el frío se convierte en una carga insoportable. </p>
<p>Xenia tomó las siguientes fotos en uno de los actos de distribución. Queremos mostrarles las condiciones de vida auténticas de muchas familias de aquí. Inimaginable, ¿verdad? Pero una amarga realidad. </p><p><strong data-start="1279" data-end="1294">Si Mallorca</strong>, fundada por Anja, lleva muchos años ocupándose de estas personas. De forma voluntaria, incansable y con un compromiso que va mucho más allá de lo que cabría esperar. Todos los días trabaja para garantizar que las donaciones de la comunidad -alimentos infantiles, pañales, artículos de aseo, ropa- lleguen a donde realmente se necesitan: directamente a las familias. Sin rodeos, sin burocracia.</p><p>Llevamos unos dos años apoyando a Si Mallorca con un pago fijo mensual. Y en vista de la necesidad, que debe ser inimaginable en esta isla "de ricos y bellos", la semana pasada transferimos a Si Mallorca una ayuda adicional de 5.000 euros. La disposición general a donar ha disminuido. Pero no son menos las personas que dependen de ello. </p>

<h2>¡Ayúdenos a ayudar!</h2>
<p>Apoya con un donativo la labor de Si Mallorca y de otras organizaciones de voluntariado cuyo trabajo apoyamos. Le garantizamos que ni un céntimo de su donación irá a parar a la administración o a la burocracia. Por el contrario, todo se destina realmente a quienes lo necesitan. </p>

<h2>Donaciones en línea</h2>
<p>Haga ahora un donativo en línea y ayúdenos a dar a los niños y a sus familias una Navidad digna de ser vivida.</p>
^<h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/so-leben-kinder-auf-mallorca/kinder-mallorca-lebensumstaende-cover.jpg',
    published_at: '2025-11-19T16:07:28Z',
  },
  {
    slug_de: 'weihnachtsaktion-kinder-mallorca',
    slug_en: 'christmas-campaign-children-mallorca',
    slug_es: 'campana-navidad-ninos-mallorca',
    title_de: 'Lasst uns Weihnachten zu den Kindern bringen!',
    title_en: 'Let\'s Bring Christmas to the Children!',
    title_es: 'Llevemos la Navidad a los niños!',
    excerpt_de: 'Gemeinsam mit den Deutschen Facharzt Zentren stellen wir Weihnachtsbäume mit echten Wunschzetteln bedürftiger Kinder auf. Ein Zettel, ein Wunsch, deine Chance zu helfen.',
    excerpt_en: 'Together with the German Specialist Centers, we are setting up Christmas trees with real wish lists from children in need. One note, one wish, your chance to help.',
    excerpt_es: 'Junto con los centros médicos alemanes, instalamos árboles de Navidad con listas de deseos reales de niños necesitados. Una nota, un deseo, tu oportunidad de ayudar.',
    content_de: `<p><em>🎄 <b>Weihnachten schenken</b></em></p>

Viele Kinder auf unserer Insel erleben die Weihnachtszeit nicht als Zeit der Freude. Einige wachsen in Armut auf und leben in Familien, die sich selbst das Nötigste kaum leisten können. <b>Diese Kinder werden von SI Mallorca betreut</b>, einer Organisation, die wir seit Jahren finanziell unterstützen.

Andere mussten ihr Zuhause verlassen, weil sie dort körperliche oder sexuelle Gewalt erfahren haben und leben nun in Heimen, wo sie Sicherheit, aber oft kein persönliches Weihnachtswunder finden. <b>Diese Kinder werden von Educaclowns begleitet</b>, ebenfalls eine Einrichtung, die wir als Fundació Predator seit vielen Jahren unterstützen.

Gemeinsam mit den Deutschen Facharzt Zentren Mallorca werden wir von der Fundació Predator drei Weihnachtsbäume aufstellen – geschmückt mit echten Wunschzetteln dieser Kinder. Jeder Zettel steht für ein Kind, das sich nichts sehnlicher wünscht, als an Weihnachten gesehen zu werden.

<b>Wie kannst du helfen?</b>

✨  <b>Wunschzettel auswählen</b>

Nimm dir einen Zettel vom Baum oder scanne den QR-Code direkt dort.

💝  <b>Spenden statt einkaufen</b>

Über den QR-Code gelangst du zu unserer Spendenseite.

Wenn du ein <i>ganz bestimmtes</i> Geschenk eines Kindes erfüllen möchtest, <b>trage dort bitte den Namen des Kindes und das gewünschte Geschenk aus dem Wunschzettel in das entsprechende Feld ein</b> und nimm Dir den Wunschzettel danach gerne mit. So kommt deine Spende exakt diesem Wunsch zugute.

Natürlich kannst du auch <b>ohne konkreten Wunschzettel einfach einen Betrag spenden</b> – sowohl über den Baum als auch am Ende dieses Beitrags. Wir verwenden diese Spenden, um weitere Wünsche der Kinder zu erfüllen, Geschenke zu kaufen, liebevoll zu verpacken und persönlich zu übergeben.

🎁  <b>Wir übernehmen den Rest</b>

Wir kümmern uns um den Einkauf, das Verpacken und die Übergabe der Geschenke an die Kinder.

<b>Transparenz, die man sehen kann</b>

Wir begleiten die Geschenkübergabe mit Kameras, damit du miterleben kannst, was deine Spende bewirkt. Die Fotos und das Video werden nach Weihnachten auf unserer Website veröffentlicht – so kannst du sehen, wie viel Freude du geschenkt hast.

<b>Lasst uns gemeinsam Weihnachten auf Mallorca ein bisschen heller machen.</b>

Ein Geschenk ist mehr als ein Gegenstand.

Es ist Liebe, Hoffnung – und das Gefühl, nicht vergessen zu sein.



Danke, dass du ein Teil davon bist.

<b>Fundació Predator</b>



<span>👉</span>  <b>Jetzt Wunsch erfüllen &amp; Freude schenken: Ab in eines der Deutschen Facharzt Zentren oder direkt hier </b><h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<p><em>🎄 <b>Give the gift of Christmas</b></em></p>

Many children on our island do not experience the Christmas season as a time of joy. Some grow up in poverty and live in families that can barely afford even the basic necessities. <b>These children are looked after by SI Mallorca</b>, an organization that we have been supporting financially for years.

Others have had to leave their homes because they have experienced physical or sexual violence there and now live in homes where they find safety but often no personal Christmas miracle. <b>These children are accompanied by Educaclowns</b>, another organization that we at Fundació Predator have been supporting for many years.

Together with the German Specialist Centers Mallorca, we from the Fundació Predator will set up three Christmas trees - decorated with real wish lists from these children. Each note represents a child who wants nothing more than to be seen at Christmas.

<b>How can you help?</b>

✨ S <b>elect wish list</b>

Take a piece of paper from the tree or scan the QR code directly there.

💝 <b>Donate instead of shopping</b>

The QR code will take you to our donation page.

If you would like to fulfill a <i>very specific</i> gift from a child, <b>please enter the name of the child and the desired gift from the wish list in the corresponding field</b> and then take the wish list with you. This way, your donation will go exactly towards this wish.

Of course, you can also <b>simply donate an amount without a specific wish list</b> - both via the tree and at the end of this article. We use these donations to fulfill further wishes of the children, buy presents, wrap them lovingly and hand them over personally.

🎁 <b>We take care of the rest</b>

We take care of the shopping, wrapping and handing over the presents to the children.

<b>Transparency that you can see</b>

We will accompany the gift handover with cameras so that you can see what your donation achieves. The photos and video will be published on our website after Christmas - so you can see how much joy you have given.

<b>Let's make Christmas in Mallorca a little brighter together.</b>

A gift is more than just an object.

It is love, hope - and the feeling of not being forgotten.



Thank you for being a part of it.

<b>Fundació Predator</b>



<span>👉</span> <b>Fulfill your wish now &amp; give joy: Go to one of the German Specialist Centers or directly here </b><h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<p><em>🎄 <b>Regala la Navidad</b></em></p>

Muchos niños de nuestra isla no viven la Navidad como una época de alegría. Algunos crecen en la pobreza y viven en familias que apenas pueden permitirse cubrir las necesidades más básicas. <b>Estos niños son atendidos por SI Mallorca</b>, una organización a la que apoyamos económicamente desde hace años.

Otros han tenido que abandonar sus hogares porque allí han sufrido violencia física o sexual y ahora viven en instituciones donde encuentran seguridad, pero a menudo ningún milagro navideño personal. <b>Estos niños son acompañados por Educaclowns</b>, otra organización que desde la Fundació Predator apoyamos desde hace muchos años.

Junto con los centros especializados alemanes Mallorca, la Fundació Predator instalará tres árboles de Navidad - decorado con hojas de deseos reales de estos niños. Cada nota representa a un niño que lo único que desea es que le vean en Navidad.

<b>¿Cómo puede ayudarnos?</b>

✨ <b>Seleccionar lista de deseos</b>

Coge un trozo de papel del árbol o escanea el código QR directamente allí.

💝 <b>Donar en lugar de comprar</b>

El código QR le llevará a nuestra página de donativos.

Si desea realizar un regalo <i>muy concreto</i> para un niño, <b>introduzca el nombre del niño y el regalo deseado de la lista</b> de deseos <b>en el campo correspondiente</b> y llévese la lista de deseos. De este modo, su donativo se destinará exactamente a ese deseo.

Por supuesto, también puede <b>donar simplemente una cantidad sin una lista de deseos concreta</b>, tanto a través del árbol como al final de este artículo. Con estos donativos cumplimos otros deseos de los niños, compramos regalos, los envolvemos con cariño y los entregamos personalmente.

🎁 <b>Nosotros nos encargamos del resto</b>

Nos encargamos de las compras, el envoltorio y la entrega de los regalos a los niños.

<b>Transparencia a la vista</b>

Acompañaremos la entrega de regalos con cámaras para que puedas ver lo que se consigue con tu donación. Las fotos y el vídeo se publicarán en nuestro sitio web después de Navidad, para que puedas ver la alegría que has dado.

<b>Hagamos juntos que la Navidad en Mallorca sea un poco más brillante.</b>

Un regalo es algo más que un objeto.

Es amor, esperanza y la sensación de no haber sido olvidado.



Gracias por participar.

<b>Fundación Predator</b>



<span>👉</span> <b>Cumple tu deseo ahora y regala alegría: Visita uno de los Centros Alemanes Especializados o directamente aquí </b><h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/lasst-uns-weihnachten-bringen/weihnachten-kinder-mallorca-cover.jpg',
    published_at: '2025-11-27T13:16:50Z',
  },
  {
    slug_de: 'weihnachtswunsch-erfuellen-spende-mallorca',
    slug_en: 'fulfill-christmas-wish-donate-mallorca',
    slug_es: 'cumplir-deseo-navideno-donar-mallorca',
    title_de: 'Erfülle einen Weihnachtswunsch',
    title_en: 'Fulfill a Christmas Wish',
    title_es: 'Cumple un deseo navideño',
    excerpt_de: 'Die Wunschzettel hängen! In den Facharzt Zentren und im Vitamed stehen Weihnachtsbäume mit echten Kinderwünschen. Scanne den QR-Code und mach ein Kind glücklich.',
    excerpt_en: 'The wish tags are up! Christmas trees with real wishes from children stand in the medical centers and Vitamed. Scan the QR code and make a child happy.',
    excerpt_es: 'Las etiquetas de deseos están colgadas. En los centros médicos y Vitamed hay árboles de Navidad con deseos reales de niños. Escanea el código QR y haz feliz a un niño.',
    content_de: `<p><em>🎄 <b>Weihnachten schenken</b></em></p><p>Weihnachten steht vor der Tür, und für uns bei der <b>Fundació Predator</b> hat die schönste Zeit des Jahres gerade einen ganz besonderen Startschuss bekommen.</p>
<p>Vielleicht habt ihr unseren kleinen „Teaser“ vor ein paar Tagen gesehen? Jetzt wurde es konkret: Xenia war in den letzten Tagen auf der Insel unterwegs – im Gepäck dutzende kleine Hoffnungen, verpackt in unsere festlichen Wunschanhänger.</p>
<p>Ihr Ziel waren die <b>Deutschen Facharzt Zentren in Palmanova und Paguera</b> sowie das <b>Vitamed in Palmanova</b>. Dort stehen jetzt wunderschöne Weihnachtsbäume, die nicht einfach nur dekoriert sind – sie tragen Wünsche. Xenia hat persönlich dafür gesorgt, dass unsere Anhänger mit dem Nussknacker und den Ballerinas ihren Platz an den Zweigen finden.</p>
<p><b>Warum uns das so wichtig ist</b> </p>
<p>Jeder dieser Zettel steht symbolisch für ein benachteiligtes Kind, dessen Weihnachtsfest ohne eure Hilfe vielleicht sonst ausfallen würde. Es war ein bewegender Moment, die Bäume fertig geschmückt zu sehen, wohl wissend, dass hinter jedem „Scan Me!“ die Chance steckt, einem Kind eine riesige Freude zu machen.</p>
<p><b>So könnt ihr ab sofort mithelfen:</b></p>
<p>Wenn ihr in den nächsten Tagen einen Termin in den Facharzt Zentren oder im Vitamed habt oder in der Nähe seid:</p>
<ol start="1">
<li>
<p><b>Schaut euch den Baum an:</b> Sucht euch einen Anhänger aus, der euch anspricht.</p>
</li>
<li>
<p><b>Scan &amp; Donate:</b> Auf jedem Anhänger findet ihr einen QR-Code. Einfach mit dem Handy scannen.</p>
</li>
<li>
<p><b>Wunsch erfüllen:</b> Ihr werdet direkt zur Spendenseite geleitet und könnt den Wunsch unkompliziert erfüllen.</p>
</li>
</ol>
<p><b>Ihr seid gerade nicht auf Mallorca?</b> Keine Sorge, ihr müsst nicht extra vorbeikommen, um zum Wunscherfüller zu werden. Wir haben alle Wünsche auch digital gesammelt. Ihr könnt ganz einfach von zu Hause aus über unsere Webseite spenden und so aus der Ferne ein Teil unserer Weihnachtsaktion sein.</p>
<p>
<p>Ein riesiges Dankeschön an die Teams der Arztzentren, die ihre Bäume für diese Aktion zur Verfügung stellen, und an Xenia für den fleißigen Einsatz vor Ort. Jetzt liegt es an uns allen: Lasst uns die Anhänger in erfüllte Träume verwandeln!</p>
<p>Frohe Vorweihnachtszeit, Euer Team der Fundació Predator</p><h2>Hilf uns mit Deiner Spende,</h2>
<h2>gemeinsam tun wir noch mehr Gutes!</h2>
<p>Versprochen: Nicht ein Cent von Deiner Spende wird für Bürokratie draufgehen. Weder bei uns. Noch in unseren Projekten! Wenn Du über eine größere Spende nachdenkst, können wir gerne Patenschaften für Projekte aufbauen. Sowohl für Firmen als auch für Privatleute. Deine Zuwendungen an die Fundació Predator sind Zuwendungen an eine gemeinnützige Körperschaft und steuerlich sowohl in Deutschland wie auch in Spanien wirksam.</p>`,
    content_en: `<p><em>🎄 <b>Give the gift of Christmas</b></em></p><p>Christmas is just around the corner, and for us at the <b>Fundació Predator</b> the most wonderful time of the year has just got a very special kick-off.</p>
<p>Perhaps you saw our little "teaser" a few days ago? Now it has become concrete: Xenia has been traveling on the island in the last few days - with dozens of little hopes in her luggage, packed in our festive wish tags. </p>
<p>Their destination was the <b>German specialist centers in Palmanova and Paguera</b> as well as the <b>Vitamed in Palmanova</b>. There are now beautiful Christmas trees there that are not just decorated - they bear wishes. Xenia personally made sure that our followers with the nutcracker and the ballerinas find their place on the branches.</p>
<p><b>Why this is so important to us</b> </p>
<p>Each of these notes symbolizes a disadvantaged child whose Christmas might otherwise be cancelled without your help. It was a moving moment to see the trees decorated, knowing that behind every "Scan Me!" is the chance to make a child very happy.</p>
<p><b>So you can help now:</b></p>
<p>If you have an appointment at the specialist centers or Vitamed in the next few days or are in the vicinity:</p>
<ol start="1">
<li>
<p><b>Look at the tree:</b> choose a pendant that appeals to you.</p>
</li>
<li>
<p><b>Scan &amp; Donate:</b> You will find a QR code on every pendant. Simply scan it with your cell phone. </p>
</li>
<li>
<p><b>Fulfill your wish:</b> You will be taken directly to the donation page and can easily fulfill the wish.</p>
</li>
</ol>
<p><b>Not on Mallorca at the moment?</b> Don't worry, you don't have to come by to make your wish come true. We have also collected all the wishes digitally. You can easily donate from home via our website and be part of our Christmas campaign from a distance. </p>
<p>
<p>A huge thank you to the teams at the medical centers for making their trees available for this campaign and to Xenia for her hard work on site. Now it's up to all of us: Let's turn the pendants into dreams come true! </p>
<p>Merry Christmas, your team at Fundació Predator</p><h2>Help us with your donation,</h2>
<h2>together we do even more good!</h2>
<p>That's a promise: Not one cent of your donation will be spent on bureaucracy. Neither with us. Still in our projects! If you are thinking about making a larger donation, we are happy to set up sponsorships for projects. Both for companies and for private individuals. Your donations to Fundació Predator are donations to a non-profit corporation and are effective for tax purposes in both Germany and Spain.</p>`,
    content_es: `<p><em>🎄 <b>Regala la Navidad</b></em></p><p>La Navidad está a la vuelta de la esquina, y para nosotros en la <b>Fundación Depredador</b> la época más maravillosa del año acaba de tener un pistoletazo de salida muy especial.</p>
<p>¿Quizás viste nuestro pequeño "teaser" hace unos días? Ahora se ha concretado: Xenia ha estado viajando por la isla en los últimos días, con docenas de pequeñas esperanzas en su equipaje, empaquetadas en nuestras etiquetas de deseos festivos. </p>
<p>Su destino fueron los <b>centros especializados alemanes de Palmanova y Paguera</b>, así como el <b>Vitamed de Palmanova</b>. Ahora hay allí hermosos árboles de Navidad que no sólo están decorados, sino que llevan deseos. Xenia se aseguró personalmente de que nuestros seguidores con el cascanueces y las bailarinas encuentran su lugar en las ramas.</p>
<p><b>Por qué es tan importante para nosotros</b> </p>
<p>Cada una de estas notas simboliza a un niño desfavorecido cuya Navidad podría verse cancelada sin tu ayuda. Fue un momento emocionante ver los árboles decorados, sabiendo que detrás de cada "¡Escánchame!" hay una oportunidad de hacer muy feliz a un niño.</p>
<p><b>Así que ya puedes ayudar:</b></p>
<p>Si tiene cita en los centros especializados o Vitamed en los próximos días o se encuentra en las proximidades:</p>
<ol start="1">
<li>
<p>Echa <b>un vistazo al árbol:</b> elige un colgante que te atraiga.</p>
</li>
<li>
<p><b>Escanear y donar:</b> Encontrará un código QR en cada colgante. Solo tiene que escanearlo con su teléfono móvil. </p>
</li>
<li>
<p><b>Cumpla su deseo:</b> Accederás directamente a la página de donativos y podrás cumplir tu deseo fácilmente.</p>
</li>
</ol>
<p><b>¿No está en Mallorca en este momento?</b> No te preocupes, no hace falta que vengas para convertirte en una persona que concede deseos. También hemos recogido todos los deseos digitalmente. Puedes donar fácilmente desde casa a través de nuestra página web y formar parte de nuestra campaña navideña desde la distancia. </p>
<p>
<p>Muchas gracias a los equipos de los centros médicos por poner sus árboles a disposición de esta campaña y a Xenia por su duro trabajo sobre el terreno. Ahora nos toca a todos nosotros: ¡Convirtamos los colgantes en sueños hechos realidad! </p>
<p>Feliz Navidad, su equipo de la Fundació Predator</p><h2>Ayúdenos con su donación,</h2>
<h2>¡juntos hacemos aún más bien!</h2>
<p>Lo prometemos: Ni un céntimo de su donación se gastará en burocracia. Ni con nosotros. ¡Sigue en nuestros proyectos! Si está pensando en hacer una donación mayor, estaremos encantados de establecer patrocinios para proyectos. Tanto para empresas como para particulares. Sus donaciones a la Fundació Predator son donaciones a una corporación sin ánimo de lucro y son efectivas a efectos fiscales tanto en Alemania como en España.</p>`,
    cover_image_url: 'https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/fundacio-predator/erfuelle-einen-weihnachtswunsch/weihnachtswunsch-aktion-cover.jpg',
    published_at: '2025-12-02T07:33:15Z',
  },
];

export async function POST() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const results = [];

  for (const post of posts) {
    const { data, error } = await supabaseAdmin
      .from('fundacio_blog_posts')
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
