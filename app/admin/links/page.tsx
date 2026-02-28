'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import LinkManager from '@/components/admin/LinkManager';

export default function AdminLinksPage() {
  const [links, setLinks] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/links')
      .then((r) => r.json())
      .then((data) => {
        setLinks(data.links || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#FAFBFC]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Links" />
        <div className="p-8">
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : links ? (
            <LinkManager initialLinks={links} />
          ) : (
            <p className="text-charcoal-muted text-sm">Error loading links</p>
          )}
        </div>
      </div>
    </div>
  );
}
