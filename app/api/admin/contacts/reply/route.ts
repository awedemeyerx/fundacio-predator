import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/admin-auth';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { to, subject, message, originalMessage, originalName } = await request.json();

  if (!to || !message) {
    return NextResponse.json({ error: 'Missing to or message' }, { status: 400 });
  }

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
              <p style="margin:0 0 16px;color:#4a4a4a;font-size:15px;line-height:1.6;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </td></tr>
            ${originalMessage ? `<tr><td style="padding:0 24px 24px;">
              <div style="border-top:1px solid #e5e5e5;padding-top:16px;">
                <p style="margin:0 0 8px;color:#8a8a8a;font-size:12px;">Ursprüngliche Nachricht von ${(originalName || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}:</p>
                <p style="margin:0;color:#8a8a8a;font-size:13px;font-style:italic;white-space:pre-wrap;">${originalMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
            </td></tr>` : ''}
            <tr><td style="padding:0 24px 24px;border-top:1px solid #f0f0f0;padding-top:16px;text-align:left;">
              <p style="margin:0 0 4px;color:#1a1a1a;font-size:14px;">Herzliche Grüße,</p>
              <p style="margin:0;color:#8a8a8a;font-size:13px;">Fundació Predator</p>
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

  try {
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
        replyTo: { email: 'info@fundaciopredator.org' },
        subject: subject || `Re: Ihre Nachricht — Fundació Predator`,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Brevo error: ${text}` }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
