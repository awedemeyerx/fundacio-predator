/** @type {import('next').NextConfig} */

// Old WordPress blog post slugs that lived at /<slug>/ instead of /blog/<slug>/
const oldBlogSlugs = [
  'charity-fleamarket-in-santa-ponca',
  'a-day-of-glamour-and-giving',
  'a-day-of-glamour-and-giving-result',
  'so-leben-kinder-auf-mallorca',
  'gemeinsam-verantwortung-uebernehmen',
  'lasst-uns-weihnachten-zu-den-kindern-bringen',
  'erfuelle-einen-kinderwunsch',
  // EN
  'a-day-of-glamor-and-giving',
  'shopping-for-a-good-cause-registration',
  'on-the-road-with-si-mallorca-2',
  'taking-responsibility-together',
  'lets-bring-christmas-to-the-children',
  'fulfill-a-wish-to-have-children',
  // ES
  'un-dia-de-glamour-y-generosidad',
  'compras-por-una-buena-causa-inscripcion',
  'viajar-con-si-mallorca-2',
  'asumir-juntos-la-responsabilidad',
  'llevemos-la-navidad-a-los-ninos',
  'cumplir-el-deseo-de-tener-hijos',
];

const nextConfig = {
  skipTrailingSlashRedirect: true,
  async redirects() {
    const redirects = [];
    for (const slug of oldBlogSlugs) {
      // /<slug> → /blog/<slug>
      redirects.push({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      });
      // /en/<slug> → /en/blog/<slug>
      redirects.push({
        source: `/en/${slug}`,
        destination: `/en/blog/${slug}`,
        permanent: true,
      });
      // /es/<slug> → /es/blog/<slug>
      redirects.push({
        source: `/es/${slug}`,
        destination: `/es/blog/${slug}`,
        permanent: true,
      });
    }
    return redirects;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fundaciopredator.org',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
