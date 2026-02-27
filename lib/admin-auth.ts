import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from '@/lib/supabase';

export interface AdminUser {
  id: number;
  auth_uid: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'editor';
}

export function createSupabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.supabase_publishable_key || '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  );
}

/** Get the authenticated admin user with role from fundacio_admin_users */
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = createSupabaseServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return null;

  if (!supabaseAdmin) return null;

  const { data } = await supabaseAdmin
    .from('fundacio_admin_users')
    .select('id, auth_uid, email, name, avatar_url, role')
    .eq('auth_uid', session.user.id)
    .single();

  if (data) return data as AdminUser;

  // auth_uid mismatch (e.g. after Supabase migration) — try email lookup
  if (session.user.email) {
    const { data: emailUser } = await supabaseAdmin
      .from('fundacio_admin_users')
      .select('id, auth_uid, email, name, avatar_url, role')
      .eq('email', session.user.email.toLowerCase())
      .single();

    if (emailUser) {
      // Update auth_uid so future requests match directly
      await supabaseAdmin
        .from('fundacio_admin_users')
        .update({ auth_uid: session.user.id, updated_at: new Date().toISOString() })
        .eq('id', emailUser.id);

      return { ...emailUser, auth_uid: session.user.id } as AdminUser;
    }
  }

  // Fallback: check ADMIN_MAIL env for bootstrap access
  const adminMail = process.env.ADMIN_MAIL || '';
  const isAllowedByEnv = adminMail
    .split(',')
    .map((e: string) => e.trim().toLowerCase())
    .includes((session.user.email || '').toLowerCase());

  if (isAllowedByEnv) {
    return {
      id: 0,
      auth_uid: session.user.id,
      email: session.user.email || '',
      name: null,
      avatar_url: null,
      role: 'admin',
    };
  }

  return null;
}

/** Require admin role — returns user or null */
export async function requireAdmin(): Promise<AdminUser | null> {
  const user = await getAdminUser();
  if (!user || user.role !== 'admin') return null;
  return user;
}

/** Require at least editor role (editor or admin) — returns user or null */
export async function requireEditor(): Promise<AdminUser | null> {
  return getAdminUser();
}

/** Keep legacy function for backward compat during migration */
export async function getAdminSession() {
  const supabase = createSupabaseServer();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
