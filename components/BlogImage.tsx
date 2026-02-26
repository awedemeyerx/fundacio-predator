'use client';

import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function BlogImage({
  src,
  alt,
  width = 800,
  height = 450,
  className = '',
  priority = false,
}: BlogImageProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    </figure>
  );
}
