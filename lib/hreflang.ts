import { Lang, SUPPORTED_LANGS, DEFAULT_LANG } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://fundaciopredator.org';

/** Build a language-prefixed URL. DE (default) gets no prefix. */
export function langUrl(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const normalized = clean === '/' ? '' : clean;

  if (lang === DEFAULT_LANG) return normalized || '/';
  return `/${lang}${normalized}`;
}

/** Get hreflang alternates for pages with identical paths across languages */
export function getAlternates(lang: Lang, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const normalized = clean === '/' ? '' : clean;

  return {
    canonical: `${BASE_URL}${langUrl(lang, path)}`,
    languages: {
      de: `${BASE_URL}${normalized || '/'}`,
      en: `${BASE_URL}/en${normalized}`,
      es: `${BASE_URL}/es${normalized}`,
      'x-default': `${BASE_URL}${normalized || '/'}`,
    },
  };
}

/** Get hreflang alternates for pages with different slugs per language */
export function getCrossLangAlternates(
  urls: Record<Lang, string>,
  currentLang: Lang
) {
  return {
    canonical: `${BASE_URL}${urls[currentLang]}`,
    languages: {
      ...Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `${BASE_URL}${urls[l]}`])
      ),
      'x-default': `${BASE_URL}${urls[DEFAULT_LANG]}`,
    },
  };
}
