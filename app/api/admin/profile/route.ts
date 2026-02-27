import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '@/lib/supabase';
import { getAdminUser } from '@/lib/admin-auth';

export async function PUT(request: NextRequest) {
  const currentUser = await getAdminUser();
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  const { name, password } = await request.json();

  // Update name in admin_users table
  if (name !== undefined) {
    const { error } = await supabaseAdmin
      .from('fundacio_admin_users')
      .update({ name, updated_at: new Date().toISOString() })
      .eq('id', currentUser.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  // Update password via Supabase Auth (service role)
  if (password) {
    if (password.length < 6) {
      return NextResponse.json({ error: 'Passwort muss mindestens 6 Zeichen haben' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url || '';
    const supabaseServiceKey = process.env.supabase_secret_key || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    const adminAuth = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await adminAuth.auth.admin.updateUserById(
      currentUser.auth_uid,
      { password }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
