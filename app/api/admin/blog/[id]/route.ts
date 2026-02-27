import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/admin-auth';

const ALLOWED_FIELDS = new Set([
  'slug_de', 'slug_en', 'slug_es',
  'title_de', 'title_en', 'title_es',
  'content_de', 'content_en', 'content_es',
  'excerpt_de', 'excerpt_en', 'excerpt_es',
  'cover_image_url', 'cover_focal_x', 'cover_focal_y',
  'author', 'active', 'published_at',
  'tags',
]);

function pickAllowed(body: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body)) {
    if (ALLOWED_FIELDS.has(key)) result[key] = value;
  }
  return result;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ post: data });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  // Editors can only edit their own posts
  if (user.role === 'editor') {
    const { data: post } = await supabaseAdmin
      .from('fundacio_blog_posts')
      .select('created_by_email')
      .eq('id', params.id)
      .single();

    if (post?.created_by_email && post.created_by_email !== user.email) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const raw = await request.json();
  const body = pickAllowed(raw);

  const { data, error } = await supabaseAdmin
    .from('fundacio_blog_posts')
    .update(body)
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAdminUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { error } = await supabaseAdmin
    .from('fundacio_blog_posts')
    .delete()
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
