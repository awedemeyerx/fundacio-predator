'use client';

import { useMemo } from 'react';
import Image from 'next/image';

interface BlogContentProps {
  html: string;
}

/**
 * Renders blog HTML content, replacing <img> tags with optimized Next.js Image components.
 * Splits content at img tags and renders them as separate optimized images.
 */
// WordPress boilerplate that was imported into post bodies — strip it
const BOILERPLATE_MARKERS = [
  '<h2>Was machen wir anders?</h2>',
  '<h2>What do we do differently?</h2>',
  '<h2>¿Qué hacemos de forma diferente?</h2>',
];

function stripBoilerplate(content: string): string {
  for (const marker of BOILERPLATE_MARKERS) {
    const idx = content.indexOf(marker);
    if (idx !== -1) {
      return content.slice(0, idx).trim();
    }
  }
  return content;
}

export default function BlogContent({ html }: BlogContentProps) {
  const parts = useMemo(() => {
    if (!html) return [];

    const cleaned = stripBoilerplate(html);

    // Split content at <img ...> tags
    const imgRegex = /<img\s+[^>]*>/gi;
    const segments: { type: 'html' | 'image'; content: string; src?: string; alt?: string }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = imgRegex.exec(cleaned)) !== null) {
      // Add HTML before this image
      if (match.index > lastIndex) {
        segments.push({ type: 'html', content: cleaned.slice(lastIndex, match.index) });
      }

      // Extract src and alt from img tag
      const srcMatch = match[0].match(/src="([^"]*)"/);
      const altMatch = match[0].match(/alt="([^"]*)"/);

      if (srcMatch) {
        segments.push({
          type: 'image',
          content: match[0],
          src: srcMatch[1],
          alt: altMatch?.[1] || '',
        });
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining HTML
    if (lastIndex < cleaned.length) {
      segments.push({ type: 'html', content: cleaned.slice(lastIndex) });
    }

    return segments;
  }, [html]);

  if (!html) return null;

  // If no images found, render as plain HTML
  if (parts.length === 0 || (parts.length === 1 && parts[0].type === 'html')) {
    return <div dangerouslySetInnerHTML={{ __html: stripBoilerplate(html) }} />;
  }

  return (
    <div>
      {parts.map((part, i) => {
        if (part.type === 'html') {
          return <div key={i} dangerouslySetInnerHTML={{ __html: part.content }} />;
        }

        if (part.type === 'image' && part.src) {
          return (
            <figure key={i} className="my-8">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={part.src}
                  alt={part.alt || ''}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}
