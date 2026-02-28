import { headers } from 'next/headers';
import Image from 'next/image';
import { supabaseAdmin } from '@/lib/supabase';
import { getLinkIcon } from '@/lib/link-icons';
import type { Lang } from '@/lib/types';

function detectLang(searchParams: { lang?: string }): Lang {
  if (searchParams.lang === 'en' || searchParams.lang === 'es' || searchParams.lang === 'de') {
    return searchParams.lang;
  }
  // Fallback to accept-language
  try {
    const headersList = headers();
    const accept = headersList.get('accept-language') || '';
    const primary = accept.split(',')[0]?.split('-')[0]?.toLowerCase();
    if (primary === 'en' || primary === 'es') return primary;
  } catch {}
  return 'de';
}

interface LinkRow {
  id: string;
  title_en: string;
  title_de: string;
  title_es: string;
  url: string;
  icon: string | null;
  sort_order: number;
  active: boolean;
}

export default async function LinkPage({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const lang = detectLang(searchParams);

  let links: LinkRow[] = [];
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from('link_in_bio')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    links = data || [];
  }

  function getTitle(link: LinkRow): string {
    if (lang === 'en' && link.title_en) return link.title_en;
    if (lang === 'es' && link.title_es) return link.title_es;
    return link.title_de || link.title_en || '';
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Hero background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://adwrup9jyslnyjhd.public.blob.vercel-storage.com/studio-portrait-palma-028.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-12">
        {/* Avatar / Logo */}
        <div className="mb-6">
          <Image
            src="/images/logo.png"
            alt="Fundació Predator"
            width={80}
            height={80}
            className="rounded-2xl shadow-lg shadow-black/20"
          />
        </div>

        {/* Name */}
        <h1 className="font-serif text-2xl text-white font-bold tracking-tight">
          Fundació Predator
        </h1>

        {/* Subtitle with sparkle separator */}
        <p className="text-white/60 text-sm mt-1.5 flex items-center gap-2">
          <span>Images of Humans</span>
          <span className="text-gold text-xs">&#10022;</span>
          <span>Mallorca</span>
        </p>

        {/* Gold gradient separator */}
        <div className="mt-5 mb-8 w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Links */}
        <div className="w-full max-w-md space-y-3">
          {links.map((link) => {
            const icon = getLinkIcon(link.icon);
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 w-full px-5 py-3.5 rounded-xl border border-white/10 bg-white/10 backdrop-blur-md text-white text-sm font-medium transition-all duration-300 hover:bg-white/20 hover:border-gold/30 hover:shadow-lg hover:shadow-black/10 hover:scale-[1.01]"
              >
                {icon && (
                  <span className="w-5 h-5 text-gold/80 group-hover:text-gold transition-colors duration-300 shrink-0">
                    {icon}
                  </span>
                )}
                <span className="flex-1">{getTitle(link)}</span>
                <svg
                  className="w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            );
          })}

          {links.length === 0 && (
            <p className="text-center text-white/40 text-sm py-8">
              No links yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
