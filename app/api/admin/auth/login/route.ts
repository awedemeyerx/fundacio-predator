import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.supabase_publishable_key || '';
  const supabaseServiceKey = process.env.supabase_secret_key || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  // Check if email exists in admin users table before attempting login
  if (supabaseServiceKey) {
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: adminUser } = await adminClient
      .from('fundacio_admin_users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (!adminUser) {
      return NextResponse.json({ error: 'Kein Zugang. Bitte kontaktiere einen Administrator.' }, { status: 403 });
    }
  }

  let response = NextResponse.json({ success: true });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // After successful auth, link auth_uid to the real Supabase user ID
  if (data.user && supabaseServiceKey) {
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    await adminClient
      .from('fundacio_admin_users')
      .update({ auth_uid: data.user.id, updated_at: new Date().toISOString() })
      .eq('email', email.toLowerCase())
      .neq('auth_uid', data.user.id);
  }

  return response;
}
