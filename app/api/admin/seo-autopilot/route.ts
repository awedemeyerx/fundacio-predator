import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title_de, content_de } = await request.json();

  if (!title_de && !content_de) {
    return NextResponse.json({ error: 'Titel oder Content (DE) erforderlich' }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'OPENAI_KEY not configured' }, { status: 500 });
  }

  // Strip HTML tags for cleaner LLM input
  const plainContent = (content_de || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const contentPreview = plainContent.slice(0, 3000);

  const systemPrompt = `You are an SEO expert specializing in multilingual content (German, English, Spanish) for a charitable foundation website about children's welfare in Mallorca (Fundació Predator).

Analyze the given German blog post and suggest 12-15 keyword phrases that would drive organic search traffic. For each keyword, provide:
- The keyword in English (primary for international SEO)
- The keyword in German
- The keyword in Spanish
- An estimated monthly search volume category: "high" (>5K), "medium" (1K-5K), "low" (100-1K), "niche" (<100)
- An approximate monthly search number (your best estimate based on training data)
- Competition level: "high", "medium", "low"
- Relevance score from 0.0 to 1.0 (how well it matches the article topic)

Focus on:
- Long-tail keywords (3-5 words) that are realistic to rank for
- A mix of informational and transactional intent
- Keywords relevant to the charity/foundation/children's welfare niche
- Photography and art related keywords if the content touches on those topics

Respond ONLY with valid JSON, no markdown, no explanation:
{
  "keywords": [
    {
      "keyword_en": "...",
      "keyword_de": "...",
      "keyword_es": "...",
      "volume_estimate": "high|medium|low|niche",
      "monthly_searches": "~1.2K",
      "competition": "high|medium|low",
      "relevance": 0.95
    }
  ]
}`;

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
          { role: 'user', content: `Titel: ${title_de}\n\nContent:\n${contentPreview}` },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `OpenAI API error ${res.status}`);
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content || '';

    // Parse JSON from response (strip potential markdown fences)
    const jsonStr = raw.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error('SEO Autopilot error:', err);
    return NextResponse.json({ error: err.message || 'Keyword-Recherche fehlgeschlagen' }, { status: 500 });
  }
}
