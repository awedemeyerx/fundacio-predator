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
    if (s.slug_de) params.push({ lang: 'de', slug: s.slug_de });
    if (s.slug_en) params.push({ lang: 'en', slug: s.slug_en });
    if (s.slug_es) params.push({ lang: 'es', slug: s.slug_es });
  }


  return params;
}


export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = (params.lang as Lang) || 'de';
