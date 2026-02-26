'use client';

interface AdminHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export default function AdminHeader({ title, action }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-charcoal/5 px-8 py-5 flex items-center justify-between">
      <h1 className="font-serif text-xl font-bold text-charcoal">{title}</h1>
      {action && <div>{action}</div>}
    </header>
  );
}
