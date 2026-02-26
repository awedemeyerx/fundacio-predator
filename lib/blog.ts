import { supabaseAdmin } from './supabase';
import { Lang } from './types';

export interface BlogPost {
  id: number;
  slug_de: string;
  slug_en: string;
  slug_es: string;
  title_de: string;
  title_en: string;
  title_es: string;
  content_de: string | null;
  content_en: string | null;
  content_es: string | null;
  excerpt_de: string | null;
  excerpt_en: string | null;
  excerpt_es: string | null;
  cover_image_url: string | null;
  author: string;
  active: boolean;
  published_at: string;
  created_at: string;
}

export function getLocalizedPost(post: BlogPost, lang: Lang) {
  return {
    ...post,
    slug: post[`slug_${lang}`] || post.slug_de,
    title: post[`title_${lang}`] || post.title_de,
    content: post[`content_${lang}`] || post.content_de,
    excerpt: post[`excerpt_${lang}`] || post.excerpt_de,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!supabaseAdmin) return [];

  const { data, error } = await supabaseAdmin
    .from('fundacio_blog_posts')
    .select('*')
    .eq('active', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getPostBySlug(slug: string, lang: Lang): Promise<BlogPost | null> {
  if (!supabaseAdmin) return null;

  const slugColumn = `slug_${lang}`;

  const { data, error } = await supabaseAdmin
    .from('fundacio_blog_posts')
    .select('*')
    .eq(slugColumn, slug)
    .eq('active', true)
    .single();

  if (error || !data) {
    // Fallback: try all slug columns
    for (const l of ['de', 'en', 'es'] as Lang[]) {
      const { data: fallback } = await supabaseAdmin
        .from('fundacio_blog_posts')
        .select('*')
        .eq(`slug_${l}`, slug)
        .eq('active', true)
        .single();
      if (fallback) return fallback;
    }
    return null;
  }

  return data;
}

export async function getAllPostSlugs(): Promise<{ slug_de: string; slug_en: string; slug_es: string }[]> {
  if (!supabaseAdmin) return [];

  const { data, error } = await supabaseAdmin
    .from('fundacio_blog_posts')
    .select('slug_de, slug_en, slug_es')
    .eq('active', true);

  if (error) {
    console.error('Failed to fetch post slugs:', error);
    return [];
  }

  return data || [];
}
