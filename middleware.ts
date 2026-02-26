import { NextRequest, NextResponse } from 'next/server';

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract first path segment
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
