'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
  href?: string;
  delay?: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 800;
          const start = performance.now();
          const end = value;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsCard({ label, value, sub, href, delay = 0 }: StatsCardProps) {
  const isNumber = typeof value === 'number';

  const content = (
    <>
      <p className="text-[11px] uppercase tracking-widest text-charcoal-muted/70 font-medium mb-2">{label}</p>
      <p className="text-3xl font-bold text-charcoal tabular-nums">
        {isNumber ? <AnimatedNumber value={value} /> : value}
      </p>
      {sub && <p className="text-xs text-charcoal-muted mt-1.5">{sub}</p>}
    </>
  );

  const className = [
    'rounded-2xl border border-charcoal/[0.06] p-6',
    'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
    'transition-all duration-300 ease-out',
    'animate-fade-in-up',
    href ? 'block hover:border-amber/30 hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : '',
  ].join(' ');

  const style = { animationDelay: `${delay * 75}ms`, animationFillMode: 'backwards' as const };

  if (href) {
    return <Link href={href} className={className} style={style}>{content}</Link>;
  }

  return <div className={className} style={style}>{content}</div>;
}
