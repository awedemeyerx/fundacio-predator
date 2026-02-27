'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lang } from '@/lib/types';
import { langUrl } from '@/lib/hreflang';

// Simple fingerprint based on browser properties
function getFingerprint(): string {
  if (typeof window === 'undefined') return '';
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join('|');
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

interface Comment {
  id: number;
  author_name: string;
  message: string;
  created_at: string;
}

interface AdjacentPost {
  slug: string;
  title: string;
  cover_image_url: string | null;
  published_at: string;
}

interface BlogEngagementProps {
  postId: number;
  lang: Lang;
  prevPost: AdjacentPost | null;
  nextPost: AdjacentPost | null;
  relatedPosts: AdjacentPost[];
  donationSlot?: React.ReactNode;
}

const i18n = {
  de: {
    likes: 'Likes',
    comments: 'Kommentare',
    noComments: 'Noch keine Kommentare. Sei der Erste!',
    leaveComment: 'Hinterlasse einen Kommentar',
    name: 'Name',
    email: 'Email',
    emailHint: 'Wird nicht veröffentlicht',
    message: 'Deine Nachricht ...',
    send: 'Kommentar senden',
    sending: 'Wird gesendet...',
    morePosts: 'Weitere Beiträge',
    newer: 'Neuerer Beitrag',
    older: 'Älterer Beitrag',
  },
  en: {
    likes: 'Likes',
    comments: 'Comments',
    noComments: 'No comments yet. Be the first!',
    leaveComment: 'Leave a comment',
    name: 'Name',
    email: 'Email',
    emailHint: 'Will not be published',
    message: 'Your message ...',
    send: 'Send comment',
    sending: 'Sending...',
    morePosts: 'More posts',
    newer: 'Newer post',
    older: 'Older post',
  },
  es: {
    likes: 'Likes',
    comments: 'Comentarios',
    noComments: 'Sin comentarios todavía. ¡Sé el primero!',
    leaveComment: 'Deja un comentario',
    name: 'Nombre',
    email: 'Email',
    emailHint: 'No se publicará',
    message: 'Tu mensaje ...',
    send: 'Enviar comentario',
    sending: 'Enviando...',
    morePosts: 'Más publicaciones',
    newer: 'Publicación más reciente',
    older: 'Publicación anterior',
  },
};

export default function BlogEngagement({
  postId,
  lang,
  prevPost,
  nextPost,
  relatedPosts,
  donationSlot,
}: BlogEngagementProps) {
  const t = i18n[lang];
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [commentSending, setCommentSending] = useState(false);

  // Load likes & comments
  useEffect(() => {
    fetch(`/api/blog/${postId}/likes`)
      .then(r => r.json())
      .then(d => setLikeCount(d.count || 0))
      .catch(() => {});

    fetch(`/api/blog/${postId}/comments`)
      .then(r => r.json())
      .then(d => setComments(d.comments || []))
      .catch(() => {});
  }, [postId]);

  // Check if already liked (from localStorage)
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('fundacio_liked_posts') || '[]');
    if (likedPosts.includes(postId)) setLiked(true);
  }, [postId]);

  const handleLike = useCallback(async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      const fp = getFingerprint();
      const res = await fetch(`/api/blog/${postId}/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint: fp }),
      });
      const data = await res.json();
      setLikeCount(data.count);
      setLiked(data.liked);

      // Track in localStorage
      const likedPosts = JSON.parse(localStorage.getItem('fundacio_liked_posts') || '[]');
      if (data.liked) {
        localStorage.setItem('fundacio_liked_posts', JSON.stringify([...likedPosts, postId]));
      } else {
        localStorage.setItem('fundacio_liked_posts', JSON.stringify(likedPosts.filter((id: number) => id !== postId)));
      }
    } catch {
      // ignore
    } finally {
      setLikeLoading(false);
    }
  }, [postId, likeLoading]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentMessage.trim() || commentSending) return;

    setCommentSending(true);
    try {
      const res = await fetch(`/api/blog/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_name: commentName,
          author_email: commentEmail,
          message: commentMessage,
        }),
      });
      const data = await res.json();
      if (data.comment) {
        setComments(prev => [...prev, data.comment]);
        setCommentName('');
        setCommentEmail('');
        setCommentMessage('');
      }
    } catch {
      // ignore
    } finally {
      setCommentSending(false);
    }
  };

  return (
    <>
      {/* Navigation Arrows (prev/next) */}
      {(prevPost || nextPost) && (
        <div className="flex justify-between items-center mt-12 mb-8">
          {prevPost ? (
            <Link
              href={langUrl(lang, `/blog/${prevPost.slug}`)}
              className="group flex items-center gap-2 text-sm text-charcoal/50 hover:text-amber transition-colors"
              title={t.newer}
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">{t.newer}</span>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link
              href={langUrl(lang, `/blog/${nextPost.slug}`)}
              className="group flex items-center gap-2 text-sm text-charcoal/50 hover:text-amber transition-colors"
              title={t.older}
            >
              <span className="hidden sm:inline">{t.older}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      )}

      {/* Like Button */}
      <div className="border-t border-charcoal/5 pt-8 mt-8">
        <button
          onClick={handleLike}
          disabled={likeLoading}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all text-sm font-medium ${
            liked
              ? 'bg-amber/10 border-amber/30 text-amber'
              : 'border-charcoal/10 text-charcoal/50 hover:border-amber/30 hover:text-amber'
          }`}
        >
          <svg className={`w-4 h-4 ${liked ? 'fill-amber' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {likeCount} {t.likes}
        </button>
      </div>

      {/* Donation CTA — between likes and comments */}
      {donationSlot && (
        <div className="mt-10">
          {donationSlot}
        </div>
      )}

      {/* Comments */}
      <div className="mt-12">
        <h3 className="font-serif text-xl text-charcoal mb-6">
          {t.comments} ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <p className="text-charcoal/40 text-sm mb-8">{t.noComments}</p>
        ) : (
          <div className="space-y-6 mb-8">
            {comments.map((c) => (
              <div key={c.id} className="bg-charcoal/[0.02] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center text-amber text-sm font-medium">
                    {c.author_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-charcoal">{c.author_name}</span>
                    <span className="text-xs text-charcoal/30 ml-2">
                      {new Date(c.created_at).toLocaleDateString(
                        lang === 'de' ? 'de-DE' : lang === 'es' ? 'es-ES' : 'en-US',
                        { day: 'numeric', month: 'short', year: 'numeric' }
                      )}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-charcoal/70 leading-relaxed">{c.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Comment Form */}
        <div className="bg-charcoal/[0.02] rounded-xl p-6">
          <h4 className="font-medium text-charcoal mb-4">{t.leaveComment}</h4>
          <form onSubmit={handleComment} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-charcoal/50 mb-1 block">{t.name}</label>
                <input
                  type="text"
                  required
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-charcoal/10 bg-white text-sm focus:outline-none focus:border-amber/40 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-charcoal/50 mb-1 block">{t.email}</label>
                <input
                  type="email"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder={t.emailHint}
                  className="w-full px-4 py-2.5 rounded-lg border border-charcoal/10 bg-white text-sm focus:outline-none focus:border-amber/40 transition-colors placeholder:text-charcoal/20"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-charcoal/50 mb-1 block">{t.message}</label>
              <textarea
                required
                rows={4}
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-charcoal/10 bg-white text-sm focus:outline-none focus:border-amber/40 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={commentSending}
              className="inline-flex items-center gap-2 bg-amber text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all hover:shadow-md hover:shadow-amber/15 disabled:opacity-50"
            >
              <span>{commentSending ? t.sending : t.send}</span>
              {!commentSending && <span>&rarr;</span>}
            </button>
          </form>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-8 border-t border-charcoal/5">
          <h3 className="font-serif text-xl text-charcoal text-center mb-8">{t.morePosts}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rp) => (
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
      )}
    </>
  );
}
