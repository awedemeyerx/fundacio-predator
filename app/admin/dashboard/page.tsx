'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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

interface RecentDonation {
  id: number;
  donor_name: string | null;
  donor_email: string | null;
  amount_cents: number;
  currency: string;
  created_at: string;
}

export default function DashboardPage() {
  const { isAdmin } = useAdminAuth();
  const [stats, setStats] = useState<Stats>({ blogPosts: 0, donations: 0, totalRaised: 0, contacts: 0, campaigns: 0 });
  const [recentDonations, setRecentDonations] = useState<RecentDonation[]>([]);

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
        setRecentDonations(donations.slice(0, 5));
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
        <div className="p-8 space-y-8">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAdmin ? 'lg:grid-cols-4' : ''} gap-6`}>
            <StatsCard label="Blog Posts" value={stats.blogPosts} href="/admin/blog" />
            {isAdmin && (
              <>
                <StatsCard label="Spenden" value={stats.donations} sub={`${(stats.totalRaised / 100).toFixed(2)} EUR`} href="/admin/donations" />
                <StatsCard label="Projekte" value={stats.campaigns} href="/admin/campaigns" />
                <StatsCard label="Kontakte" value={stats.contacts} href="/admin/contacts" />
              </>
            )}
          </div>

          {isAdmin && recentDonations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-serif font-bold text-charcoal">Letzte Spenden</h2>
                <Link href="/admin/donations" className="text-sm text-amber hover:text-amber-600 transition-colors">
                  Alle anzeigen
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-charcoal/5">
                      <th className="text-left text-xs font-medium text-charcoal-muted px-6 py-3">Datum</th>
                      <th className="text-left text-xs font-medium text-charcoal-muted px-6 py-3">Name</th>
                      <th className="text-right text-xs font-medium text-charcoal-muted px-6 py-3">Betrag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonations.map((d) => (
                      <tr key={d.id} className="border-b border-charcoal/5 last:border-0">
                        <td className="px-6 py-3 text-sm text-charcoal-muted">
                          {new Date(d.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-3 text-sm text-charcoal">
                          {d.donor_name || d.donor_email || '-'}
                        </td>
                        <td className="px-6 py-3 text-sm text-charcoal font-medium text-right">
                          {(d.amount_cents / 100).toFixed(2)} {(d.currency || 'eur').toUpperCase()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
