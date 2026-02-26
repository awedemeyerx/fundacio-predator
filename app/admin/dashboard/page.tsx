'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

interface Stats {
  blogPosts: number;
  donations: number;
  totalRaised: number;
  contacts: number;
  campaigns: number;
}

export default function DashboardPage() {
  const { isAdmin } = useAdminAuth();
  const [stats, setStats] = useState<Stats>({ blogPosts: 0, donations: 0, totalRaised: 0, contacts: 0, campaigns: 0 });

  useEffect(() => {
    const fetches: Promise<Response>[] = [
      fetch('/api/admin/blog').then(r => r.json()).catch(() => ({ posts: [] })),
    ];

    if (isAdmin) {
      fetches.push(
        fetch('/api/admin/donations').then(r => r.json()).catch(() => ({ donations: [] })),
        fetch('/api/admin/contacts').then(r => r.json()).catch(() => ({ contacts: [] })),
        fetch('/api/admin/campaigns').then(r => r.json()).catch(() => ({ campaigns: [] })),
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Promise.all(fetches).then((results: any[]) => {
      const blogData = results[0];
      if (isAdmin) {
        const donationData = results[1];
        const contactData = results[2];
        const campaignData = results[3];
        const donations = donationData.donations || [];
        setStats({
          blogPosts: (blogData.posts || []).length,
          donations: donations.length,
          totalRaised: donations.reduce((sum: number, d: { amount_cents: number }) => sum + (d.amount_cents || 0), 0),
          contacts: (contactData.contacts || []).length,
          campaigns: (campaignData.campaigns || []).length,
        });
      } else {
        setStats({
          blogPosts: (blogData.posts || []).length,
          donations: 0,
          totalRaised: 0,
          contacts: 0,
          campaigns: 0,
        });
      }
    });
  }, [isAdmin]);

  return (
    <div className="flex min-h-screen bg-warm-sand">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Dashboard" />
        <div className="p-8">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAdmin ? 'lg:grid-cols-4' : ''} gap-6`}>
            <StatsCard label="Blog Posts" value={stats.blogPosts} />
            {isAdmin && (
              <>
                <StatsCard label="Spenden" value={stats.donations} sub={`${(stats.totalRaised / 100).toFixed(2)} EUR`} />
                <StatsCard label="Kampagnen" value={stats.campaigns} />
                <StatsCard label="Kontakte" value={stats.contacts} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
