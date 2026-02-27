import Link from 'next/link';

interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
  href?: string;
}

export default function StatsCard({ label, value, sub, href }: StatsCardProps) {
  const content = (
    <>
      <p className="text-xs uppercase tracking-wider text-charcoal-muted mb-1">{label}</p>
      <p className="text-2xl font-bold text-charcoal">{value}</p>
      {sub && <p className="text-xs text-charcoal-muted mt-1">{sub}</p>}
    </>
  );

  const className = `bg-white rounded-xl border border-charcoal/5 p-6${href ? ' hover:border-amber/30 hover:shadow-sm transition-all' : ''}`;

  if (href) {
    return <Link href={href} className={className}>{content}</Link>;
  }

  return <div className={className}>{content}</div>;
}
