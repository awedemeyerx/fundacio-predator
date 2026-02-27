import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title_de, content_de, excerpt_de, selected_keywords, primary_keyword } = await request.json();

  if (!title_de || !content_de || !selected_keywords?.length || !primary_keyword) {
    return NextResponse.json({ error: 'Titel, Content, Keywords und Haupt-Keyword erforderlich' }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_KEY not configured' }, { status: 500 });
  }

  const systemPrompt = `You are an expert SEO content optimizer and translator for Fundació Predator, a charitable foundation for children's welfare in Mallorca.

Given a German blog post and selected SEO keywords, generate optimized content for all three languages (DE, EN, ES).

IMPORTANT RULES:
- Slugs must be URL-friendly: lowercase, hyphens, no special chars, no umlauts
- The English slug should be based on the primary keyword
- Titles should naturally incorporate the primary keyword (don't force it if it reads badly)
- Meta titles: max 60 characters, include primary keyword
- Meta descriptions: max 155 characters, compelling, include primary keyword
- Excerpts: 2-3 sentences, engaging summary
- Translations should be natural, not literal — adapt idioms and cultural references
- Preserve the warm, empathetic, professional tone of the foundation
- Content HTML: preserve the HTML structure from the German original, translate text only
- Tags: lowercase, derived from the selected keywords, 5-8 tags

Respond ONLY with valid JSON, no markdown fences, no explanation:
{
  "slug_en": "...",
  "slug_de": "...",
  "slug_es": "...",
  "title_en": "...",
  "title_de": "...",
  "title_es": "...",
  "excerpt_en": "...",
  "excerpt_de": "...",
  "excerpt_es": "...",
  "meta_title_en": "...",
  "meta_title_de": "...",
  "meta_title_es": "...",
  "meta_description_en": "...",
  "meta_description_de": "...",
  "meta_description_es": "...",
  "content_en": "...",
  "content_es": "...",
  "tags": ["tag1", "tag2", "..."]
}`;

  const userMessage = `Deutscher Titel: ${title_de}

Deutscher Excerpt: ${excerpt_de || '(nicht vorhanden — bitte generieren)'}

Ausgewählte Keywords (EN): ${selected_keywords.join(', ')}
Haupt-Keyword (EN): ${primary_keyword}

Deutscher Content (HTML):
${content_de}`;

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
          { role: 'user', content: userMessage },
        ],
        max_tokens: 16384,
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `OpenAI API error ${res.status}`);
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content || '';

    const jsonStr = raw.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error('SEO Generate error:', err);
    return NextResponse.json({ error: err.message || 'SEO-Generierung fehlgeschlagen' }, { status: 500 });
  }
}
