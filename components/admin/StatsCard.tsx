interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
}

export default function StatsCard({ label, value, sub }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-charcoal/5 p-6">
      <p className="text-xs uppercase tracking-wider text-charcoal-muted mb-1">{label}</p>
      <p className="text-2xl font-bold text-charcoal">{value}</p>
      {sub && <p className="text-xs text-charcoal-muted mt-1">{sub}</p>}
    </div>
  );
}
