import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  // Use progress view if available, fall back to base table
  const useProgress = request.nextUrl.searchParams.get('progress') !== 'false';

  if (useProgress) {
    const { data, error } = await supabaseAdmin
      .from('fundacio_campaign_progress')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      return NextResponse.json({ campaigns: data });
    }
    // Fall through to base table if view doesn't exist yet
  }

  const { data, error } = await supabaseAdmin
    .from('fundacio_campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ campaigns: data });
}

export async function POST(request: NextRequest) {
  const user = await getAdminUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from('fundacio_campaigns')
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ campaign: data });
}
