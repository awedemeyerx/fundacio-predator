export type Lang = 'de' | 'en' | 'es';
export type Localized<T = string> = Record<Lang, T>;

export const SUPPORTED_LANGS: Lang[] = ['de', 'en', 'es'];
export const DEFAULT_LANG: Lang = 'de';
