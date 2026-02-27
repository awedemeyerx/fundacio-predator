import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lang } from '@/lib/types';
import { langUrl } from '@/lib/hreflang';
import { getCrossLangAlternates } from '@/lib/hreflang';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';
import BlogDonationForm from '@/components/BlogDonationForm';
import BlogContent from '@/components/BlogContent';
import { getPostBySlug, getLocalizedPost, getAllPostSlugs, getAdjacentPosts, getRelatedPosts } from '@/lib/blog';
import BlogEngagement from '@/components/BlogEngagement';
import type { Metadata } from 'next';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  const params: { lang: string; slug: string }[] = [];

  for (const s of slugs) {
    params.push({ lang: 'de', slug: s.slug_de });
    params.push({ lang: 'en', slug: s.slug_en });
    params.push({ lang: 'es', slug: s.slug_es });
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = (params.lang as Lang) || 'de';
  const rawPost = await getPostBySlug(params.slug, lang);
  if (!rawPost) return {};

  const post = getLocalizedPost(rawPost, lang);

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: getCrossLangAlternates(
      {
        de: `/blog/${rawPost.slug_de}`,
        en: `/en/blog/${rawPost.slug_en}`,
        es: `/es/blog/${rawPost.slug_es}`,
      },
      lang
    ),
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : undefined,
    },
  };
}

const relatedPostsI18n = {
  de: 'Weitere Beiträge',
  en: 'More posts',
  es: 'Más publicaciones',
};

function RelatedPosts({ posts, lang }: { posts: { slug: string; title: string; cover_image_url: string | null; published_at: string }[]; lang: Lang }) {
  return (
    <div className="pt-8 border-t border-charcoal/5">
      <h3 className="font-serif text-xl text-charcoal text-center mb-8">{relatedPostsI18n[lang]}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((rp) => (
          <Link
            key={rp.slug}
            href={langUrl(lang, `/blog/${rp.slug}`)}
            className="group block"
          >
            {rp.cover_image_url && (
              <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3">
                <Image
                  src={rp.cover_image_url}
                  alt={rp.title}
                  width={600}
                  height={338}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <time className="text-xs text-charcoal/40">
              {new Date(rp.published_at).toLocaleDateString(
                lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-ES' : 'en-US',
                { day: 'numeric', month: 'long', year: 'numeric' }
              )}
            </time>
            <h4 className="font-serif text-base text-charcoal group-hover:text-amber transition-colors mt-1 line-clamp-2">
              {rp.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = (params.lang as Lang) || 'de';
  const rawPost = await getPostBySlug(params.slug, lang);

  if (!rawPost) return notFound();

  const post = getLocalizedPost(rawPost, lang);

  // Fetch adjacent & related posts
  const [{ prev, next }, related] = await Promise.all([
    getAdjacentPosts(rawPost.id, lang),
    getRelatedPosts(rawPost.id),
  ]);

  const prevPost = prev
    ? { slug: getLocalizedPost(prev, lang).slug, title: getLocalizedPost(prev, lang).title, cover_image_url: prev.cover_image_url, published_at: prev.published_at }
    : null;
  const nextPost = next
    ? { slug: getLocalizedPost(next, lang).slug, title: getLocalizedPost(next, lang).title, cover_image_url: next.cover_image_url, published_at: next.published_at }
    : null;
  const relatedPosts = related.map((r) => {
    const loc = getLocalizedPost(r, lang);
    return { slug: loc.slug, title: loc.title, cover_image_url: r.cover_image_url, published_at: r.published_at };
  });

  return (
    <>
      <Header lang={lang} />
      <main className="pt-28 pb-20">
        <article className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <FadeIn>
            <div className="text-sm text-charcoal-muted mb-8">
              <Link href={langUrl(lang, '/')} className="hover:text-amber transition-colors">
                Home
              </Link>
              <span className="mx-2 text-charcoal/20">/</span>
              <Link href={langUrl(lang, '/blog')} className="hover:text-amber transition-colors">
                Blog
              </Link>
              <span className="mx-2 text-charcoal/20">/</span>
              <span className="text-charcoal/50">{post.title}</span>
            </div>
          </FadeIn>

          {/* Cover Image */}
          {post.cover_image_url && (
            <FadeIn>
              <div className="aspect-[2/1] rounded-xl overflow-hidden mb-10">
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </FadeIn>
          )}

          {/* Title */}
          <FadeIn delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-charcoal leading-tight mb-6">
              {post.title}
            </h1>
          </FadeIn>

          {/* Meta + divider */}
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-charcoal/8">
              <time className="text-sm tracking-wide uppercase text-charcoal-muted">
                {new Date(rawPost.published_at).toLocaleDateString(
                  lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-ES' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </time>
              <span className="text-charcoal/15">·</span>
              <span className="text-sm tracking-wide uppercase text-charcoal-muted">{rawPost.author}</span>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.2}>
            <div className="blog-content prose prose-lg prose-charcoal max-w-none
              prose-headings:font-serif prose-headings:text-charcoal
              prose-h2:text-2xl prose-h2:font-bold
              prose-h3:text-xl prose-h3:font-semibold prose-h3:text-charcoal/90
              prose-p:text-charcoal-body/80 prose-p:leading-[1.8] prose-p:text-[16px]
              prose-a:text-amber prose-a:no-underline hover:prose-a:underline
              prose-strong:text-charcoal prose-strong:font-semibold
              prose-li:text-charcoal-body/80 prose-li:leading-[1.8]
              prose-img:rounded-xl prose-img:shadow-sm
            ">
              {post.content && post.content.includes('<') ? (
                <BlogContent html={post.content} />
              ) : (
                post.content?.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h2 key={i}>
                        {paragraph.replace(/\*\*/g, '')}
                      </h2>
                    );
                  }
                  return <p key={i}>{paragraph}</p>;
                })
              )}
            </div>
          </FadeIn>

          {/* Engagement: Likes, Donation, Comments, Nav */}
          <FadeIn delay={0.3}>
            <BlogEngagement
              postId={rawPost.id}
              lang={lang}
              prevPost={prevPost}
              nextPost={nextPost}
              relatedPosts={[]}
              donationSlot={<BlogDonationForm lang={lang} />}
            />
          </FadeIn>
        </article>

        {/* Related Posts — after donation form, outside article */}
        {relatedPosts.length > 0 && (
          <FadeIn delay={0.5}>
            <div className="max-w-3xl mx-auto px-6 mt-16">
              <RelatedPosts posts={relatedPosts} lang={lang} />
            </div>
          </FadeIn>
        )}
      </main>
      <Footer lang={lang} />
    </>
  );
}
