import Link from 'next/link';
import Image from 'next/image';
import { Lang } from '@/lib/types';
import { langUrl } from '@/lib/hreflang';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';
import { getAllPosts, getLocalizedPost } from '@/lib/blog';

export const revalidate = 300; // ISR: revalidate every 5 minutes

export default async function BlogPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = (params.lang as Lang) || 'de';
  const posts = await getAllPosts();

  return (
    <>
      <Header lang={lang} />
      <main className="pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-[0.3em] text-forest font-medium mb-4">
              Blog
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mb-4 leading-tight">
              {lang === 'de' ? 'Neuigkeiten' : lang === 'es' ? 'Noticias' : 'News'}
            </h1>
            <p className="text-[17px] text-charcoal-body/70 font-light max-w-xl mb-16">
              {lang === 'de'
                ? 'Aktuelle Berichte aus unseren Projekten und Aktionen.'
                : lang === 'es'
                ? 'Informes actuales de nuestros proyectos y acciones.'
                : 'Latest reports from our projects and activities.'}
            </p>
          </FadeIn>

          {posts.length === 0 ? (
            <FadeIn delay={0.1}>
              <div className="text-center py-20 text-charcoal-muted">
                <p>{lang === 'de' ? 'Noch keine Beiträge.' : lang === 'es' ? 'Aún no hay publicaciones.' : 'No posts yet.'}</p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((rawPost, i) => {
                const post = getLocalizedPost(rawPost, lang);
                return (
                  <FadeIn key={rawPost.id} delay={i * 0.08}>
                    <Link
                      href={langUrl(lang, `/blog/${post.slug}`)}
                      className="group block"
                    >
                      {/* Cover image */}
                      <div className="aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-charcoal/[0.03]">
                        {post.cover_image_url ? (
                          <Image
                            src={post.cover_image_url}
                            alt={post.title}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-charcoal/[0.03] to-charcoal/[0.06]" />
                        )}
                      </div>

                      {/* Date */}
                      <time className="text-xs text-charcoal-muted">
                        {new Date(rawPost.published_at).toLocaleDateString(
                          lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-ES' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </time>

                      {/* Title */}
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mt-2 mb-2 group-hover:text-amber transition-colors leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-[15px] text-charcoal-body/70 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      <span className="inline-flex items-center text-amber text-sm font-medium mt-3">
                        {lang === 'de' ? 'Weiterlesen' : lang === 'es' ? 'Leer más' : 'Read more'}
                        <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
