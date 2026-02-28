import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/admin-auth';

// Only allow known columns to be written
const ALLOWED_FIELDS = new Set([
  'slug_de', 'slug_en', 'slug_es',
  'title_de', 'title_en', 'title_es',
  'content_de', 'content_en', 'content_es',
  'excerpt_de', 'excerpt_en', 'excerpt_es',
  'cover_image_url', 'cover_focal_x', 'cover_focal_y',
  'author', 'active', 'published_at',
  'tags', 'created_by_email',
]);

function pickAllowed(body: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_FIELDS.has(key)) result[key] = value;
  }
  return result;
}

export async function GET() {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from('fundacio_blog_posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data });
}

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const raw = await request.json();
  raw.created_by_email = user.email;
  const body = pickAllowed(raw);

  const { data, error } = await supabaseAdmin
    .from('fundacio_blog_posts')
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/[lang]/blog', 'page');

  return NextResponse.json({ post: data });
}
