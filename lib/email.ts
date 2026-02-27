import { Lang } from './types';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface DonationEmailParams {
  email: string;
  name: string;
  amount: number;
  project: string | null;
  lang: Lang;
  sessionId?: string;
}

interface ContactEmailParams {
  name: string;
  email: string;
  message: string;
  page: string;
}

const donationSubject: Record<Lang, string> = {
  de: 'Danke für deine Spende — Fundació Predator',
  en: 'Thank you for your donation — Fundació Predator',
  es: 'Gracias por tu donación — Fundació Predator',
};

function generateDonationEmailHtml(params: DonationEmailParams): string {
  const { name, amount, project, lang, sessionId } = params;
  const BASE_URL = 'https://fundaciopredator.org';
  const dankeUrl = sessionId ? `${BASE_URL}/${lang === 'de' ? '' : `${lang}/`}spenden/danke?session_id=${sessionId}` : null;
  const projectNames: Record<string, string> = {
    educaclowns: 'EducaClowns',
    pollenca: 'Pollença',
    'sos-mamas': 'SOS Mamás',
  };
  const projectLabel = project && project !== 'general' ? projectNames[project] || project : null;

  const texts = {
    de: {
      greeting: `Liebe/r ${name || 'Spender/in'}`,
      thanks: 'Vielen Dank für deine großzügige Spende!',
      amount: `Deine Spende: ${amount} €`,
      project: projectLabel ? `Für das Projekt: ${projectLabel}` : 'Allgemeine Spende',
      promise: '100% deiner Spende fließt direkt in unsere Projekte. Alle Verwaltungskosten werden privat getragen.',
      receipt: 'Du erhältst eine Spendenquittung per E-Mail.',
      ctaButton: 'Daten ergänzen für Spendenquittung',
      ctaHint: 'Möchtest du über unsere Arbeit informiert werden? Ergänze deine Daten auf unserer Webseite.',
      signature: 'Herzliche Grüße',
    },
    en: {
      greeting: `Dear ${name || 'Donor'}`,
      thanks: 'Thank you for your generous donation!',
      amount: `Your donation: €${amount}`,
      project: projectLabel ? `For the project: ${projectLabel}` : 'General donation',
      promise: '100% of your donation goes directly to our projects. All administrative costs are covered privately.',
      receipt: 'You will receive a donation receipt via email.',
      ctaButton: 'Complete details for donation receipt',
      ctaHint: 'Would you like to stay informed about our work? Complete your details on our website.',
      signature: 'Kind regards',
    },
    es: {
      greeting: `Estimado/a ${name || 'Donante'}`,
      thanks: '¡Gracias por tu generosa donación!',
      amount: `Tu donación: ${amount} €`,
      project: projectLabel ? `Para el proyecto: ${projectLabel}` : 'Donación general',
      promise: 'El 100% de tu donación va directamente a nuestros proyectos. Todos los costes administrativos se cubren de forma privada.',
      receipt: 'Recibirás un recibo de donación por correo electrónico.',
      ctaButton: 'Completa tus datos para el recibo de donación',
      ctaHint: '¿Te gustaría estar informado sobre nuestro trabajo? Completa tus datos en nuestra web.',
      signature: 'Cordiales saludos',
    },
  };

  const t = texts[lang];

  const ctaHtml = dankeUrl ? `
              <div style="margin:20px 0;text-align:center;">
                <a href="${dankeUrl}" style="display:inline-block;background:#E8722A;color:#fff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:99px;">${t.ctaButton}</a>
              </div>
              <p style="margin:0;color:#8a8a8a;font-size:13px;text-align:center;">${t.ctaHint}</p>` : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;">
        <tr><td style="text-align:center;padding:0 0 24px;">
          <img src="https://fundaciopredator.org/images/logo.png" width="180" alt="Fundació Predator" style="display:block;margin:0 auto;" />
        </td></tr>
        <tr><td>
          <table width="100%" style="background:#fff;border-radius:16px;border:1px solid #e5e5e5;">
            <tr><td style="padding:32px 24px;text-align:center;border-bottom:1px solid #f0f0f0;">
              <div style="width:56px;height:56px;background:#E8722A;border-radius:50%;margin:0 auto 16px;line-height:56px;color:#fff;font-size:28px;">♥</div>
              <h2 style="margin:0;color:#1a1a1a;font-size:20px;">${t.thanks}</h2>
            </td></tr>
            <tr><td style="padding:24px;">
              <p style="margin:0 0 16px;color:#1a1a1a;font-size:16px;">${t.greeting},</p>
              <table width="100%" style="background:#F5EDE3;border-radius:12px;">
                <tr><td style="padding:20px;">
                  <p style="margin:0 0 8px;color:#1a1a1a;font-size:18px;font-weight:600;">${t.amount}</p>
                  <p style="margin:0;color:#4a4a4a;font-size:14px;">${t.project}</p>
                </td></tr>
              </table>
              <div style="margin:20px 0;padding:16px;background:#C9963B10;border-left:3px solid #C9963B;border-radius:0 8px 8px 0;">
                <p style="margin:0;color:#4a4a4a;font-size:14px;">${t.promise}</p>
              </div>${ctaHtml}
              <p style="margin:16px 0 0;color:#8a8a8a;font-size:13px;">${t.receipt}</p>
            </td></tr>
            <tr><td style="padding:24px;border-top:1px solid #f0f0f0;text-align:center;">
              <p style="margin:0 0 4px;color:#1a1a1a;font-size:15px;">${t.signature},</p>
              <p style="margin:0;color:#8a8a8a;font-size:13px;">Fundació Predator</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0 0 4px;color:#8a8a8a;font-size:11px;">Fundació Predator · CIF: G09676479</p>
          <p style="margin:0 0 4px;color:#8a8a8a;font-size:11px;">C/ Vicari Joaquim Fuster, 31 · 07006 Palma, Illes Balears, España</p>
          <p style="margin:0 0 4px;color:#8a8a8a;font-size:11px;">info@fundaciopredator.org</p>
          <p style="margin:0;color:#8a8a8a;font-size:11px;">
            <a href="https://fundaciopredator.org/impressum" style="color:#8a8a8a;">Impressum</a> · <a href="https://fundaciopredator.org/datenschutz" style="color:#8a8a8a;">Datenschutz</a>
          </p>
          <p style="margin:8px 0 0;color:#b0b0b0;font-size:10px;">© ${new Date().getFullYear()} Fundació Predator</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendBrevoEmail(to: string, subject: string, html: string) {
  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: { name: 'Fundació Predator', email: 'info@fundaciopredator.org' },
      to: [{ email: to }],
      bcc: [{ email: process.env.ADMIN_MAIL || 'info@fundaciopredator.org' }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo API error: ${res.status} ${await res.text()}`);
  }
}

interface AdminInviteParams {
  email: string;
  name: string | null;
  inviteLink: string;
}

export async function sendAdminInvite(params: AdminInviteParams) {
  const { name, inviteLink } = params;
  const greeting = name ? `Hallo ${name}` : 'Hallo';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;">
        <tr><td style="text-align:center;padding:0 0 24px;">
          <img src="https://fundaciopredator.org/images/logo.png" width="180" alt="Fundació Predator" style="display:block;margin:0 auto;" />
        </td></tr>
        <tr><td>
          <table width="100%" style="background:#fff;border-radius:16px;border:1px solid #e5e5e5;">
            <tr><td style="padding:32px 24px;">
              <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;">Einladung zum Admin-Bereich</h2>
              <p style="margin:0 0 16px;color:#4a4a4a;font-size:15px;">${greeting},</p>
              <p style="margin:0 0 24px;color:#4a4a4a;font-size:15px;">du wurdest zum Admin-Bereich der Fundació Predator eingeladen. Klicke auf den Button, um deinen Zugang zu aktivieren und ein Passwort zu setzen.</p>
              <div style="text-align:center;margin:0 0 24px;">
                <a href="${inviteLink}" style="display:inline-block;background:#E8722A;color:#fff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:99px;">Zugang aktivieren</a>
              </div>
              <p style="margin:0;color:#8a8a8a;font-size:13px;">Falls du diese Einladung nicht erwartet hast, kannst du diese E-Mail ignorieren.</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 0 0;text-align:center;">
          <p style="margin:0 0 4px;color:#8a8a8a;font-size:11px;">Fundació Predator · CIF: G09676479</p>
          <p style="margin:0;color:#8a8a8a;font-size:11px;">info@fundaciopredator.org</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await sendBrevoEmail(
    params.email,
    'Einladung zum Admin-Bereich — Fundació Predator',
    html
  );
}

export async function sendDonationConfirmation(params: DonationEmailParams) {
  await sendBrevoEmail(
    params.email,
    donationSubject[params.lang],
    generateDonationEmailHtml(params)
  );
}

export async function sendContactNotification(params: ContactEmailParams) {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#FAFAF7;font-family:-apple-system,BlinkMacSystemFont,sans-serif;">
  <table width="100%" style="padding:40px 20px;background:#FAFAF7;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#fff;border-radius:16px;border:1px solid #e5e5e5;">
        <tr><td style="padding:24px;">
          <h2 style="margin:0 0 16px;color:#1a1a1a;">Neue Kontaktanfrage</h2>
          <p style="margin:0 0 8px;color:#4a4a4a;"><strong>Name:</strong> ${params.name}</p>
          <p style="margin:0 0 8px;color:#4a4a4a;"><strong>E-Mail:</strong> ${params.email}</p>
          <p style="margin:0 0 8px;color:#4a4a4a;"><strong>Seite:</strong> ${params.page}</p>
          <div style="margin:16px 0 0;padding:16px;background:#F5EDE3;border-radius:8px;">
            <p style="margin:0;color:#1a1a1a;white-space:pre-wrap;">${params.message}</p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await sendBrevoEmail(
    process.env.ADMIN_MAIL || 'info@fundaciopredator.org',
    `Kontaktanfrage von ${params.name} — fundaciopredator.org`,
    html
  );
}
