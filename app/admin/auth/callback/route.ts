import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/admin/login?error=no_code', request.url));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.supabase_publishable_key || '';
  const supabaseServiceKey = process.env.supabase_secret_key || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  let response = NextResponse.redirect(new URL('/admin/dashboard', request.url));

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

  // Exchange the code for a session
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(new URL('/admin/login?error=auth_failed', request.url));
  }

  // Get the authenticated user
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    return NextResponse.redirect(new URL('/admin/login?error=no_session', request.url));
  }

  // Check if user exists in fundacio_admin_users (by auth_uid OR email)
  if (supabaseServiceKey) {
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);
    const userEmail = session.user.email?.toLowerCase();

    // Try by auth_uid first
    let { data: adminUser } = await adminClient
      .from('fundacio_admin_users')
      .select('id')
      .eq('auth_uid', session.user.id)
      .single();

    // Fallback: find by email and link auth_uid
    if (!adminUser && userEmail) {
      const { data: emailUser } = await adminClient
        .from('fundacio_admin_users')
        .select('id')
        .eq('email', userEmail)
        .single();

      if (emailUser) {
        // Link Google auth_uid to existing admin user
        await adminClient
          .from('fundacio_admin_users')
          .update({ auth_uid: session.user.id, updated_at: new Date().toISOString() })
          .eq('id', emailUser.id);
        adminUser = emailUser;
      }
    }

    // Also check ADMIN_MAIL env fallback
    if (!adminUser && userEmail) {
      const adminMail = process.env.ADMIN_MAIL || '';
      const isAllowedByEnv = adminMail
        .split(',')
        .map((e: string) => e.trim().toLowerCase())
        .includes(userEmail);

      if (!isAllowedByEnv) {
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL('/admin/login?error=not_authorized', request.url));
      }
    }

    if (!adminUser && !userEmail) {
      await supabase.auth.signOut();
      return NextResponse.redirect(new URL('/admin/login?error=not_authorized', request.url));
    }

    // Update avatar and name from Google profile if available
    const meta = session.user.user_metadata;
    if (meta?.full_name || meta?.avatar_url) {
      await adminClient
        .from('fundacio_admin_users')
        .update({
          name: meta.full_name || meta.name || undefined,
          avatar_url: meta.avatar_url || meta.picture || undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('auth_uid', session.user.id);
    }
  }

  return response;
}
