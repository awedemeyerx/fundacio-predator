import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/admin-auth';

export async function GET() {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }
  const { data, error } = await supabaseAdmin
    .from('link_in_bio')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ links: data });
}

export async function POST(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }
  const body = await req.json();

  // Get max sort_order
  const { data: maxRow } = await supabaseAdmin
    .from('link_in_bio')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = (maxRow?.sort_order ?? -1) + 1;

  const { data, error } = await supabaseAdmin
    .from('link_in_bio')
    .insert({
      title_en: body.title_en || '',
      title_de: body.title_de || '',
      title_es: body.title_es || '',
      url: body.url || '',
      icon: body.icon || null,
      sort_order: nextOrder,
      active: body.active ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ link: data });
}

export async function PUT(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }
  const body = await req.json();

  // Bulk reorder
  if (body.reorder && Array.isArray(body.reorder)) {
    for (const item of body.reorder) {
      await supabaseAdmin
        .from('link_in_bio')
        .update({ sort_order: item.sort_order })
        .eq('id', item.id);
    }
    return NextResponse.json({ ok: true });
  }

  // Single update
  if (!body.id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (body.title_en !== undefined) updates.title_en = body.title_en;
  if (body.title_de !== undefined) updates.title_de = body.title_de;
  if (body.title_es !== undefined) updates.title_es = body.title_es;
  if (body.url !== undefined) updates.url = body.url;
  if (body.icon !== undefined) updates.icon = body.icon || null;
  if (body.active !== undefined) updates.active = body.active;
  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from('link_in_bio')
    .update(updates)
    .eq('id', body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ link: data });
}

export async function DELETE(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const { error } = await supabaseAdmin
    .from('link_in_bio')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
