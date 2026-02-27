import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { text, from, to, field } = await request.json();

  if (!text || !from || !to) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const langNames: Record<string, string> = { en: 'English', de: 'German', es: 'Spanish' };

  const systemPrompt = field === 'content'
    ? `You are a professional translator for a charitable foundation website (Fundació Predator — children's welfare, Mallorca). Translate the following HTML content from ${langNames[from]} to ${langNames[to]}. Preserve ALL HTML tags exactly. Only translate the text content. Keep the same tone — warm, empathetic, professional. Do NOT add any explanation, just output the translated HTML.`
    : `You are a professional translator for a charitable foundation website (Fundació Predator — children's welfare, Mallorca). Translate the following text from ${langNames[from]} to ${langNames[to]}. Keep the same tone — warm, empathetic, professional. Do NOT add any explanation, just output the translated text.`;

  const apiKey = process.env.OPENAI_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_KEY not configured' }, { status: 500 });
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        max_tokens: 4096,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `OpenAI API error ${res.status}`);
    }

    const data = await res.json();
    const translated = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({ translated });
  } catch (err: any) {
    console.error('Translation error:', err);
    return NextResponse.json({ error: err.message || 'Translation failed' }, { status: 500 });
  }
}
