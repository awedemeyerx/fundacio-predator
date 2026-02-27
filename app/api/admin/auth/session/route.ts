import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.supabase_publishable_key || '';
  const supabaseServiceKey = process.env.supabase_secret_key || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  let response = NextResponse.json({ user: null });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        response = NextResponse.json({ user: null });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Look up user in admin users table
  if (supabaseServiceKey) {
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: adminUser } = await adminClient
      .from('fundacio_admin_users')
      .select('id, email, name, avatar_url, role')
      .eq('auth_uid', session.user.id)
      .single();

    if (adminUser) {
      return NextResponse.json({
        user: {
          id: session.user.id,
          adminId: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
          avatar_url: adminUser.avatar_url,
          role: adminUser.role,
        },
      });
    }
  }

  // Fallback: if user is in ADMIN_MAIL, treat as admin
  const adminMail = process.env.ADMIN_MAIL || '';
  const isAllowedByEnv = adminMail
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .includes((session.user.email || '').toLowerCase());

  return NextResponse.json({
    user: {
      email: session.user.email,
      id: session.user.id,
      role: isAllowedByEnv ? 'admin' : undefined,
    },
  });
}
