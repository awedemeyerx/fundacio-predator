import Link from 'next/link';


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
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" style={{
                            objectPosition: `${post.cover_focal_x ?? 50}% ${post.cover_focal_y ?? 50}%` 
                          }}
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
