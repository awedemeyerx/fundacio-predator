import { Lang } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const text = {
  de: {
    title: 'Datenschutzerklärung',
    // 1. Datenschutz auf einen Blick
    s1_title: '1. Datenschutz auf einen Blick',
    s1_general_title: 'Allgemeine Hinweise',
    s1_general:
      'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer nachfolgenden Datenschutzerklärung.',
    s1_collection_title: 'Datenerfassung auf dieser Website',
    s1_who_title: 'Wer ist verantwortlich für die Datenerfassung auf dieser Website?',
    s1_who:
      'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.',
    s1_how_title: 'Wie erfassen wir Ihre Daten?',
    s1_how:
      'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.',
    s1_purpose_title: 'Wofür nutzen wir Ihre Daten?',
    s1_purpose:
      'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.',
    s1_rights_title: 'Welche Rechte haben Sie bezüglich Ihrer Daten?',
    s1_rights:
      'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.',

    // 2. Hosting
    s2_title: '2. Hosting',
    s2_vercel_title: 'Vercel',
    s2_vercel:
      'Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Wenn Sie unsere Website besuchen, werden Ihre personenbezogenen Daten auf den Servern von Vercel verarbeitet. Hierbei können auch personenbezogene Daten an den Mutterkonzern von Vercel in die USA übermittelt werden. Die Datenübertragung in die USA wird auf die EU-Standardvertragsklauseln gestützt.',
    s2_vercel_details:
      'Details entnehmen Sie der Datenschutzerklärung von Vercel:',
    s2_vercel_link: 'https://vercel.com/legal/privacy-policy',
    s2_vercel_basis:
      'Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.',

    // 3. Allgemeine Hinweise und Pflichtinformationen
    s3_title: '3. Allgemeine Hinweise und Pflichtinformationen',
    s3_privacy_title: 'Datenschutz',
    s3_privacy:
      'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.',
    s3_responsible_title: 'Hinweis zur verantwortlichen Stelle',
    s3_responsible: 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:',
    s3_responsible_address:
      'Fundació Predator\nArnd von Wedemeyer (Presidente)\nC/ Vicari Joaquim Fuster, 31\n07006 Palma (Portixol)\nIlles Balears, España',
    s3_responsible_email: 'E-Mail: info@fundaciopredator.org',
    s3_responsible_note:
      'Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.',
    s3_storage_title: 'Speicherdauer',
    s3_storage:
      'Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.',
    s3_legal_title: 'Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung',
    s3_legal:
      'Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO. Bei Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO besteht unser berechtigtes Interesse in der Bereitstellung und dem Betrieb dieser Website.',
    s3_revocation_title: 'Widerruf Ihrer Einwilligung',
    s3_revocation:
      'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.',
    s3_complaint_title: 'Beschwerderecht bei der zuständigen Aufsichtsbehörde',
    s3_complaint:
      'Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in Spanien ist die Agencia Española de Protección de Datos (AEPD).',
    s3_ssl_title: 'SSL- bzw. TLS-Verschlüsselung',
    s3_ssl:
      'Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.',

    // 4. Datenerfassung auf dieser Website
    s4_title: '4. Datenerfassung auf dieser Website',
    s4_cookies_title: 'Cookies',
    s4_cookies:
      'Unsere Internetseiten verwenden sogenannte „Cookies". Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Wir verwenden ausschließlich ein Cookie, um Ihre Cookie-Einwilligung zu speichern. Dieses Cookie enthält keine personenbezogenen Daten.',
    s4_cookies_basis:
      'Die Speicherung dieses Cookies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung der Cookie-Einwilligung, um rechtliche Anforderungen zu erfüllen.',
    s4_logs_title: 'Server-Log-Dateien',
    s4_logs:
      'Der Provider der Seiten (Vercel) erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:',
    s4_logs_list: [
      'Browsertyp und Browserversion',
      'verwendetes Betriebssystem',
      'Referrer URL',
      'Hostname des zugreifenden Rechners',
      'Uhrzeit der Serveranfrage',
      'IP-Adresse',
    ],
    s4_logs_note:
      'Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.',
    s4_analytics_title: 'Vercel Analytics',
    s4_analytics:
      'Diese Website nutzt Vercel Analytics, einen Analysedienst der Vercel Inc. Vercel Analytics erhebt anonyme Besucherstatistiken ohne den Einsatz von Tracking-Cookies und ohne die Speicherung personenbezogener Daten. Es werden keine individuellen Nutzerprofile erstellt. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der statistischen Analyse des Nutzerverhaltens zu Optimierungszwecken.',
    s4_comments_title: 'Blog-Kommentare',
    s4_comments:
      'Wenn Sie einen Kommentar auf unserem Blog hinterlassen, werden Ihr Name und der Kommentarinhalt in unserer Datenbank (Supabase) gespeichert. Eine E-Mail-Adresse wird nicht erhoben. Die Speicherung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der Bereitstellung einer Kommentarfunktion.',
    s4_comments_supabase:
      'Supabase: Anbieter ist die Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992. Die Daten werden auf Servern in der EU gespeichert. Details entnehmen Sie der Datenschutzerklärung von Supabase:',
    s4_comments_supabase_link: 'https://supabase.com/privacy',
    s4_donations_title: 'Spendenverwaltung',
    s4_donations:
      'Wenn Sie eine Spende tätigen, werden die hierfür notwendigen Daten (Name, E-Mail-Adresse, Betrag) in unserer Datenbank (Supabase) gespeichert, um Spendenquittungen ausstellen zu können. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. c DSGVO (steuerrechtliche Aufbewahrungspflichten).',
    s4_fonts_title: 'Google Fonts (lokal gehostet)',
    s4_fonts:
      'Diese Seite nutzt Google Fonts zur einheitlichen Darstellung von Schriftarten. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet nicht statt.',
  },
  en: {
    title: 'Privacy Policy',
    s1_title: '1. Privacy at a Glance',
    s1_general_title: 'General Information',
    s1_general:
      'The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you. For detailed information on the topic of data protection, please refer to our privacy policy below.',
    s1_collection_title: 'Data Collection on This Website',
    s1_who_title: 'Who is responsible for data collection on this website?',
    s1_who:
      'Data processing on this website is carried out by the website operator. You can find their contact details in the legal notice of this website.',
    s1_how_title: 'How do we collect your data?',
    s1_how:
      'Some data is collected when you provide it to us. This could be data you enter in a contact form, for example. Other data is automatically collected by our IT systems when you visit the website. This is primarily technical data (e.g. internet browser, operating system, or the time of the page request). This data is collected automatically as soon as you enter the website.',
    s1_purpose_title: 'What do we use your data for?',
    s1_purpose:
      'Some of the data is collected to ensure the error-free provision of the website. Other data may be used to analyze your user behavior.',
    s1_rights_title: 'What rights do you have regarding your data?',
    s1_rights:
      'You have the right to receive information about the origin, recipients, and purpose of your stored personal data free of charge at any time. You also have the right to request the correction or deletion of this data. For this and other questions on the topic of data protection, you can contact us at the address given in the legal notice. You also have the right to file a complaint with the competent supervisory authority.',

    s2_title: '2. Hosting',
    s2_vercel_title: 'Vercel',
    s2_vercel:
      'We host our website with Vercel. The provider is Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you visit our website, your personal data is processed on Vercel\'s servers. Personal data may also be transferred to the parent company of Vercel in the USA. The data transfer to the USA is based on the EU Standard Contractual Clauses.',
    s2_vercel_details:
      'For details, please refer to Vercel\'s privacy policy:',
    s2_vercel_link: 'https://vercel.com/legal/privacy-policy',
    s2_vercel_basis:
      'The use of Vercel is based on Art. 6(1)(f) GDPR. We have a legitimate interest in presenting our website as reliably as possible. If consent has been requested, processing is carried out exclusively on the basis of Art. 6(1)(a) GDPR.',

    s3_title: '3. General Information and Mandatory Disclosures',
    s3_privacy_title: 'Data Protection',
    s3_privacy:
      'The operators of this website take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy. When you use this website, various personal data is collected. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this is done. We would like to point out that data transmission over the Internet (e.g. when communicating by email) may have security vulnerabilities. Complete protection of data against access by third parties is not possible.',
    s3_responsible_title: 'Notice Concerning the Responsible Party',
    s3_responsible: 'The responsible party for data processing on this website is:',
    s3_responsible_address:
      'Fundació Predator\nArnd von Wedemeyer (President)\nC/ Vicari Joaquim Fuster, 31\n07006 Palma (Portixol)\nIlles Balears, Spain',
    s3_responsible_email: 'Email: info@fundaciopredator.org',
    s3_responsible_note:
      'The responsible party is the natural or legal person who alone or jointly with others decides on the purposes and means of processing personal data.',
    s3_storage_title: 'Data Retention',
    s3_storage:
      'Unless a more specific storage period has been specified within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke your consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data.',
    s3_legal_title: 'General Information on the Legal Basis of Data Processing',
    s3_legal:
      'If you have consented to data processing, we process your personal data on the basis of Art. 6(1)(a) GDPR or Art. 9(2)(a) GDPR. Where processing is based on Art. 6(1)(f) GDPR, our legitimate interest lies in providing and operating this website.',
    s3_revocation_title: 'Revocation of Your Consent',
    s3_revocation:
      'Many data processing operations are only possible with your express consent. You may revoke consent you have already given at any time. The legality of the data processing carried out prior to the revocation remains unaffected by the revocation.',
    s3_complaint_title: 'Right to Lodge a Complaint with the Supervisory Authority',
    s3_complaint:
      'In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority. The competent supervisory authority in Spain is the Agencia Española de Protección de Datos (AEPD).',
    s3_ssl_title: 'SSL/TLS Encryption',
    s3_ssl:
      'For security reasons and to protect the transmission of confidential content, this site uses SSL/TLS encryption. You can recognize an encrypted connection by the browser address line changing from "http://" to "https://" and by the lock icon in your browser bar.',

    s4_title: '4. Data Collection on This Website',
    s4_cookies_title: 'Cookies',
    s4_cookies:
      'Our website uses so-called "cookies". Cookies are small text files and do not cause any damage to your device. They are stored either temporarily for the duration of a session (session cookies) or permanently (persistent cookies) on your device. We only use a single cookie to store your cookie consent preference. This cookie does not contain any personal data.',
    s4_cookies_basis:
      'This cookie is stored on the basis of Art. 6(1)(f) GDPR. The website operator has a legitimate interest in storing cookie consent to meet legal requirements.',
    s4_logs_title: 'Server Log Files',
    s4_logs:
      'The provider of these pages (Vercel) automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:',
    s4_logs_list: [
      'Browser type and version',
      'Operating system used',
      'Referrer URL',
      'Hostname of the accessing computer',
      'Time of the server request',
      'IP address',
    ],
    s4_logs_note:
      'This data is not merged with other data sources. This data is collected on the basis of Art. 6(1)(f) GDPR.',
    s4_analytics_title: 'Vercel Analytics',
    s4_analytics:
      'This website uses Vercel Analytics, an analytics service provided by Vercel Inc. Vercel Analytics collects anonymous visitor statistics without the use of tracking cookies and without storing personal data. No individual user profiles are created. Usage is based on Art. 6(1)(f) GDPR. Our legitimate interest lies in the statistical analysis of user behavior for optimization purposes.',
    s4_comments_title: 'Blog Comments',
    s4_comments:
      'If you leave a comment on our blog, your name and the comment content are stored in our database (Supabase). No email address is collected. Storage is based on Art. 6(1)(f) GDPR. We have a legitimate interest in providing a comment feature.',
    s4_comments_supabase:
      'Supabase: The provider is Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992. Data is stored on servers in the EU. For details, see Supabase\'s privacy policy:',
    s4_comments_supabase_link: 'https://supabase.com/privacy',
    s4_donations_title: 'Donation Management',
    s4_donations:
      'When you make a donation, the necessary data (name, email address, amount) is stored in our database (Supabase) in order to issue donation receipts. Processing is based on Art. 6(1)(b) GDPR (contract fulfillment) and Art. 6(1)(c) GDPR (tax record-keeping obligations).',
    s4_fonts_title: 'Google Fonts (Locally Hosted)',
    s4_fonts:
      'This site uses Google Fonts for a consistent display of typefaces. The Google Fonts are installed locally. No connection to Google servers is made.',
  },
  es: {
    title: 'Política de Privacidad',
    s1_title: '1. Protección de datos de un vistazo',
    s1_general_title: 'Información general',
    s1_general:
      'La siguiente información ofrece una visión general sencilla de lo que ocurre con sus datos personales cuando visita este sitio web. Los datos personales son todos los datos con los que se le puede identificar personalmente. Para obtener información detallada sobre el tema de la protección de datos, consulte nuestra política de privacidad a continuación.',
    s1_collection_title: 'Recogida de datos en este sitio web',
    s1_who_title: '¿Quién es el responsable de la recogida de datos en este sitio web?',
    s1_who:
      'El tratamiento de datos en este sitio web es realizado por el operador del sitio web. Puede encontrar sus datos de contacto en el aviso legal de este sitio web.',
    s1_how_title: '¿Cómo recogemos sus datos?',
    s1_how:
      'Algunos datos se recogen cuando usted nos los proporciona. Puede tratarse, por ejemplo, de datos que introduce en un formulario de contacto. Otros datos son recogidos automáticamente por nuestros sistemas informáticos cuando visita el sitio web. Se trata principalmente de datos técnicos (por ejemplo, navegador de Internet, sistema operativo u hora de la consulta de la página). Estos datos se recogen automáticamente en cuanto usted accede al sitio web.',
    s1_purpose_title: '¿Para qué utilizamos sus datos?',
    s1_purpose:
      'Una parte de los datos se recoge para garantizar el correcto funcionamiento del sitio web. Otros datos pueden utilizarse para analizar su comportamiento como usuario.',
    s1_rights_title: '¿Qué derechos tiene respecto a sus datos?',
    s1_rights:
      'Usted tiene derecho a recibir información gratuita en cualquier momento sobre el origen, los destinatarios y la finalidad de sus datos personales almacenados. También tiene derecho a solicitar la rectificación o supresión de estos datos. Para ello, así como para otras cuestiones relativas a la protección de datos, puede dirigirse a nosotros en cualquier momento a la dirección indicada en el aviso legal. Asimismo, tiene derecho a presentar una reclamación ante la autoridad de control competente.',

    s2_title: '2. Alojamiento',
    s2_vercel_title: 'Vercel',
    s2_vercel:
      'Alojamos nuestro sitio web en Vercel. El proveedor es Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, EE.UU. Cuando usted visita nuestro sitio web, sus datos personales se procesan en los servidores de Vercel. Los datos personales también pueden transferirse a la empresa matriz de Vercel en EE.UU. La transferencia de datos a EE.UU. se basa en las Cláusulas Contractuales Tipo de la UE.',
    s2_vercel_details:
      'Para más detalles, consulte la política de privacidad de Vercel:',
    s2_vercel_link: 'https://vercel.com/legal/privacy-policy',
    s2_vercel_basis:
      'El uso de Vercel se basa en el Art. 6(1)(f) del RGPD. Tenemos un interés legítimo en presentar nuestro sitio web de la forma más fiable posible. Si se ha solicitado el consentimiento, el tratamiento se realiza exclusivamente sobre la base del Art. 6(1)(a) del RGPD.',

    s3_title: '3. Información general e información obligatoria',
    s3_privacy_title: 'Protección de datos',
    s3_privacy:
      'Los operadores de este sitio web se toman muy en serio la protección de sus datos personales. Tratamos sus datos personales de forma confidencial y de conformidad con las disposiciones legales de protección de datos y esta política de privacidad. Cuando utiliza este sitio web, se recogen diversos datos personales. Esta política de privacidad explica qué datos recogemos y para qué los utilizamos. También explica cómo y con qué finalidad se hace. Señalamos que la transmisión de datos por Internet (por ejemplo, la comunicación por correo electrónico) puede presentar vulnerabilidades de seguridad. No es posible una protección completa de los datos contra el acceso de terceros.',
    s3_responsible_title: 'Información sobre el responsable del tratamiento',
    s3_responsible: 'El responsable del tratamiento de datos en este sitio web es:',
    s3_responsible_address:
      'Fundació Predator\nArnd von Wedemeyer (Presidente)\nC/ Vicari Joaquim Fuster, 31\n07006 Palma (Portixol)\nIlles Balears, España',
    s3_responsible_email: 'Correo electrónico: info@fundaciopredator.org',
    s3_responsible_note:
      'El responsable del tratamiento es la persona física o jurídica que, sola o conjuntamente con otras, decide sobre los fines y medios del tratamiento de datos personales.',
    s3_storage_title: 'Período de conservación',
    s3_storage:
      'A menos que se haya especificado un período de almacenamiento más específico dentro de esta política de privacidad, sus datos personales permanecerán con nosotros hasta que el propósito del procesamiento de datos deje de aplicarse. Si usted hace valer una solicitud legítima de supresión o revoca su consentimiento para el procesamiento de datos, sus datos serán eliminados a menos que tengamos otras razones legalmente permitidas para almacenarlos.',
    s3_legal_title: 'Información general sobre la base jurídica del tratamiento de datos',
    s3_legal:
      'Si usted ha dado su consentimiento para el tratamiento de datos, tratamos sus datos personales sobre la base del Art. 6(1)(a) del RGPD o del Art. 9(2)(a) del RGPD. Cuando el tratamiento se basa en el Art. 6(1)(f) del RGPD, nuestro interés legítimo reside en la provisión y operación de este sitio web.',
    s3_revocation_title: 'Revocación de su consentimiento',
    s3_revocation:
      'Muchas operaciones de tratamiento de datos solo son posibles con su consentimiento expreso. Puede revocar en cualquier momento un consentimiento ya otorgado. La legalidad del tratamiento de datos realizado antes de la revocación no se ve afectada por la misma.',
    s3_complaint_title: 'Derecho a presentar una reclamación ante la autoridad de control',
    s3_complaint:
      'En caso de infracciones del RGPD, los interesados tienen derecho a presentar una reclamación ante una autoridad de control. La autoridad de control competente en España es la Agencia Española de Protección de Datos (AEPD).',
    s3_ssl_title: 'Cifrado SSL/TLS',
    s3_ssl:
      'Por motivos de seguridad y para proteger la transmisión de contenidos confidenciales, este sitio utiliza cifrado SSL/TLS. Puede reconocer una conexión cifrada por el cambio de la barra de direcciones del navegador de "http://" a "https://" y por el icono del candado en la barra de su navegador.',

    s4_title: '4. Recogida de datos en este sitio web',
    s4_cookies_title: 'Cookies',
    s4_cookies:
      'Nuestro sitio web utiliza las llamadas "cookies". Las cookies son pequeños archivos de texto y no causan ningún daño en su dispositivo. Se almacenan temporalmente durante la duración de una sesión (cookies de sesión) o de forma permanente (cookies persistentes) en su dispositivo. Solo utilizamos una única cookie para almacenar su preferencia de consentimiento de cookies. Esta cookie no contiene datos personales.',
    s4_cookies_basis:
      'Esta cookie se almacena sobre la base del Art. 6(1)(f) del RGPD. El operador del sitio web tiene un interés legítimo en almacenar el consentimiento de cookies para cumplir con los requisitos legales.',
    s4_logs_title: 'Archivos de registro del servidor',
    s4_logs:
      'El proveedor de estas páginas (Vercel) recoge y almacena automáticamente información en los llamados archivos de registro del servidor, que su navegador transmite automáticamente. Estos son:',
    s4_logs_list: [
      'Tipo y versión del navegador',
      'Sistema operativo utilizado',
      'URL de referencia',
      'Nombre de host del ordenador que accede',
      'Hora de la solicitud al servidor',
      'Dirección IP',
    ],
    s4_logs_note:
      'Estos datos no se combinan con otras fuentes de datos. La recogida de estos datos se basa en el Art. 6(1)(f) del RGPD.',
    s4_analytics_title: 'Vercel Analytics',
    s4_analytics:
      'Este sitio web utiliza Vercel Analytics, un servicio de análisis proporcionado por Vercel Inc. Vercel Analytics recoge estadísticas anónimas de visitantes sin el uso de cookies de seguimiento y sin almacenar datos personales. No se crean perfiles de usuario individuales. El uso se basa en el Art. 6(1)(f) del RGPD. Nuestro interés legítimo reside en el análisis estadístico del comportamiento de los usuarios con fines de optimización.',
    s4_comments_title: 'Comentarios del blog',
    s4_comments:
      'Si deja un comentario en nuestro blog, su nombre y el contenido del comentario se almacenan en nuestra base de datos (Supabase). No se recoge ninguna dirección de correo electrónico. El almacenamiento se basa en el Art. 6(1)(f) del RGPD. Tenemos un interés legítimo en proporcionar una función de comentarios.',
    s4_comments_supabase:
      'Supabase: El proveedor es Supabase Inc., 970 Toa Payoh North #07-04, Singapur 318992. Los datos se almacenan en servidores de la UE. Para más detalles, consulte la política de privacidad de Supabase:',
    s4_comments_supabase_link: 'https://supabase.com/privacy',
    s4_donations_title: 'Gestión de donaciones',
    s4_donations:
      'Cuando realiza una donación, los datos necesarios (nombre, dirección de correo electrónico, importe) se almacenan en nuestra base de datos (Supabase) para poder emitir recibos de donación. El tratamiento se basa en el Art. 6(1)(b) del RGPD (cumplimiento contractual) y el Art. 6(1)(c) del RGPD (obligaciones de conservación fiscal).',
    s4_fonts_title: 'Google Fonts (alojadas localmente)',
    s4_fonts:
      'Este sitio utiliza Google Fonts para una visualización uniforme de las fuentes tipográficas. Las Google Fonts están instaladas localmente. No se establece ninguna conexión con los servidores de Google.',
  },
};

export default function DatenschutzPage({ params }: { params: { lang: string } }) {
  const lang = (params.lang as Lang) || 'de';
  const t = text[lang];

  return (
    <>
      <Header lang={lang} />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6 prose prose-charcoal">
          <h1 className="font-serif">{t.title}</h1>

          {/* Section 1 */}
          <h2>{t.s1_title}</h2>
          <h3>{t.s1_general_title}</h3>
          <p>{t.s1_general}</p>

          <h3>{t.s1_collection_title}</h3>
          <h4>{t.s1_who_title}</h4>
          <p>{t.s1_who}</p>
          <h4>{t.s1_how_title}</h4>
          <p>{t.s1_how}</p>
          <h4>{t.s1_purpose_title}</h4>
          <p>{t.s1_purpose}</p>
          <h4>{t.s1_rights_title}</h4>
          <p>{t.s1_rights}</p>

          {/* Section 2 */}
          <h2>{t.s2_title}</h2>
          <h3>{t.s2_vercel_title}</h3>
          <p>{t.s2_vercel}</p>
          <p>
            {t.s2_vercel_details}
            <br />
            <a href={t.s2_vercel_link} target="_blank" rel="noopener noreferrer">
              {t.s2_vercel_link}
            </a>
          </p>
          <p>{t.s2_vercel_basis}</p>

          {/* Section 3 */}
          <h2>{t.s3_title}</h2>
          <h3>{t.s3_privacy_title}</h3>
          <p>{t.s3_privacy}</p>

          <h3>{t.s3_responsible_title}</h3>
          <p>{t.s3_responsible}</p>
          <p className="whitespace-pre-line">{t.s3_responsible_address}</p>
          <p>{t.s3_responsible_email}</p>
          <p>{t.s3_responsible_note}</p>

          <h3>{t.s3_storage_title}</h3>
          <p>{t.s3_storage}</p>

          <h3>{t.s3_legal_title}</h3>
          <p>{t.s3_legal}</p>

          <h3>{t.s3_revocation_title}</h3>
          <p>{t.s3_revocation}</p>

          <h3>{t.s3_complaint_title}</h3>
          <p>{t.s3_complaint}</p>

          <h3>{t.s3_ssl_title}</h3>
          <p>{t.s3_ssl}</p>

          {/* Section 4 */}
          <h2>{t.s4_title}</h2>

          <h3>{t.s4_cookies_title}</h3>
          <p>{t.s4_cookies}</p>
          <p>{t.s4_cookies_basis}</p>

          <h3>{t.s4_logs_title}</h3>
          <p>{t.s4_logs}</p>
          <ul>
            {t.s4_logs_list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{t.s4_logs_note}</p>

          <h3>{t.s4_analytics_title}</h3>
          <p>{t.s4_analytics}</p>

          <h3>{t.s4_comments_title}</h3>
          <p>{t.s4_comments}</p>
          <p>
            {t.s4_comments_supabase}
            <br />
            <a href={t.s4_comments_supabase_link} target="_blank" rel="noopener noreferrer">
              {t.s4_comments_supabase_link}
            </a>
          </p>

          <h3>{t.s4_donations_title}</h3>
          <p>{t.s4_donations}</p>

          <h3>{t.s4_fonts_title}</h3>
          <p>{t.s4_fonts}</p>
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
