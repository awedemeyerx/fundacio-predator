import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json({ count: 0, liked: false });
  }

  const postId = parseInt(params.id);
  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  const { count } = await supabaseAdmin
    .from('fundacio_blog_likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  return NextResponse.json({ count: count || 0 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'DB not configured' }, { status: 500 });
  }

  const postId = parseInt(params.id);
  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  const { fingerprint } = await request.json();
  if (!fingerprint) {
    return NextResponse.json({ error: 'Fingerprint required' }, { status: 400 });
  }

  // Check if already liked
  const { data: existing } = await supabaseAdmin
    .from('fundacio_blog_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('fingerprint', fingerprint)
    .single();

  if (existing) {
    // Unlike
    await supabaseAdmin
      .from('fundacio_blog_likes')
      .delete()
      .eq('id', existing.id);

    const { count } = await supabaseAdmin
      .from('fundacio_blog_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    return NextResponse.json({ count: count || 0, liked: false });
  }

  // Like
  await supabaseAdmin
    .from('fundacio_blog_likes')
    .insert({ post_id: postId, fingerprint });

  const { count } = await supabaseAdmin
    .from('fundacio_blog_likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);

  return NextResponse.json({ count: count || 0, liked: true });
}
