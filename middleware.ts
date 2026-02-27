import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const SUPPORTED_LANGS = ['de', 'en', 'es'];
const DEFAULT_LANG = 'de';

function getPreferredLang(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return DEFAULT_LANG;

  const parsed = acceptLang
    .split(',')
    .map((part) => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of parsed) {
    if (SUPPORTED_LANGS.includes(lang)) return lang;
  }
  return DEFAULT_LANG;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Admin routes: skip language routing, enforce auth ---
  if (pathname.startsWith('/admin')) {
    // Allow login page and OAuth callback without auth
    if (pathname === '/admin/login' || pathname.startsWith('/admin/auth/callback') || pathname.startsWith('/admin/auth/reset-callback')) {
      return NextResponse.next();
    }

    // Auth check for all other /admin/* routes
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.supabase_url || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.supabase_publishable_key || '';
    const supabaseServiceKey = process.env.supabase_secret_key || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    let response = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Check if user is authorized: admin_users table OR ADMIN_MAIL fallback
    if (supabaseServiceKey) {
      const adminClient = createClient(supabaseUrl, supabaseServiceKey);
      const { data: adminUser } = await adminClient
        .from('fundacio_admin_users')
        .select('id')
        .eq('auth_uid', session.user.id)
        .single();

      if (!adminUser) {
        // Fallback: check ADMIN_MAIL env
        const adminMail = process.env.ADMIN_MAIL || '';
        const isAllowedByEnv = adminMail
          .split(',')
          .map((e: string) => e.trim().toLowerCase())
          .includes((session.user.email || '').toLowerCase());

        if (!isAllowedByEnv) {
          return NextResponse.redirect(new URL('/admin/login?error=not_authorized', request.url));
        }
      }
    }

    return response;
  }

  // --- Public routes: language routing ---
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] || '';

  // 1. /de/... → redirect to strip prefix (DE is default, canonical without prefix)
  if (firstSegment === 'de') {
    const rest = '/' + segments.slice(1).join('/');
    const url = request.nextUrl.clone();
    url.pathname = rest === '/' ? '/' : rest;
    return NextResponse.redirect(url, 301);
  }

  // 2. /en/... or /es/... → pass through, Next.js handles [lang] segment
  if (firstSegment === 'en' || firstSegment === 'es') {
    return NextResponse.next();
  }

  // 3. Root / → detect language, redirect or rewrite
  if (pathname === '/') {
    const preferred = getPreferredLang(request);
    if (preferred !== DEFAULT_LANG) {
      const url = request.nextUrl.clone();
      url.pathname = `/${preferred}`;
      return NextResponse.redirect(url, 302);
    }
    // DE user on / → rewrite to /de (URL stays /)
    return NextResponse.rewrite(new URL('/de', request.url));
  }

  // 4. Any other path without lang prefix → rewrite to /de/...
  return NextResponse.rewrite(new URL(`/de${pathname}`, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)',
  ],
};
