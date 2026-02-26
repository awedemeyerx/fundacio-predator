interface ProgressBarProps {
  raisedCents: number;
  targetCents: number;
  className?: string;
}

export default function ProgressBar({ raisedCents, targetCents, className = '' }: ProgressBarProps) {
  const raised = raisedCents / 100;
  const target = targetCents / 100;
  const percent = targetCents > 0 ? Math.round((raisedCents / targetCents) * 1000) / 10 : 0;
  const barWidth = Math.min(percent, 100);

  return (
    <div className={className}>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-medium text-charcoal">
          {raised.toLocaleString('de-DE', { minimumFractionDigits: 0 })} EUR
          <span className="text-charcoal-muted font-normal"> von {target.toLocaleString('de-DE', { minimumFractionDigits: 0 })} EUR</span>
        </span>
        <span className="text-sm font-medium text-amber">{percent}%</span>
      </div>
      <div className="w-full h-3 bg-warm-sand rounded-full overflow-hidden">
        <div
          className="h-full bg-amber rounded-full transition-all duration-700 ease-out"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}
