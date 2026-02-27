'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';

interface Campaign {
  id: number;
  name_de: string;
  slug: string;
  target_amount_cents: number;
  raised_cents?: number;
  progress_percent?: number;
  active: boolean;
}

interface DonationSummary {
  campaign_id: number;
  count: number;
}

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [donationCounts, setDonationCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/campaigns').then(r => r.json()),
      fetch('/api/admin/donations').then(r => r.json()),
    ]).then(([campaignData, donationData]) => {
      setCampaigns(campaignData.campaigns || []);

      // Count donations per campaign
      const counts: Record<number, number> = {};
      for (const d of (donationData.donations || [])) {
        if (d.campaign_id) {
          counts[d.campaign_id] = (counts[d.campaign_id] || 0) + 1;
        }
      }
      setDonationCounts(counts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Dieses Projekt wirklich löschen?')) return;
    await fetch(`/api/admin/campaigns/${id}`, { method: 'DELETE' });
    setCampaigns(campaigns.filter(c => c.id !== id));
  }

  const columns = [
    { key: 'name_de', label: 'Name' },
    {
      key: 'progress',
      label: 'Ziel',
      render: (c: Campaign) => {
        const raised = (c.raised_cents || 0) / 100;
        const target = c.target_amount_cents / 100;
        const percent = c.progress_percent ?? 0;
        const barWidth = Math.min(percent, 100);

        if (c.target_amount_cents === 0) {
          return <span className="text-charcoal-muted text-xs">Kein Spendenziel festgelegt</span>;
        }

        return (
          <div className="min-w-[200px]">
            <div className="text-xs text-charcoal-body mb-1">
              {raised.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} von {target.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </div>
            <div className="w-full h-2 bg-charcoal/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all"
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: 'donations_count',
      label: 'Spenden',
      render: (c: Campaign) => (
        <span className="tabular-nums">{donationCounts[c.id] || 0}</span>
      ),
    },
    {
      key: 'raised_cents',
      label: 'Umsatz',
      render: (c: Campaign) => (
        <span className="tabular-nums">
          {((c.raised_cents || 0) / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </span>
      ),
    },
    {
      key: 'active',
      label: 'Status',
      render: (c: Campaign) => (
        <span className={`text-xs px-2 py-1 rounded-full ${c.active ? 'bg-forest/10 text-forest' : 'bg-charcoal/10 text-charcoal-muted'}`}>
          {c.active ? 'Aktiv' : 'Inaktiv'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (c: Campaign) => (
        <div className="flex gap-2">
          <Link href={`/admin/campaigns/${c.id}/edit`} className="text-amber hover:text-amber-600 text-sm">Edit</Link>
          <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-600 text-sm">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-warm-sand">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader
          title="Projekte"
          action={
            <Link
              href="/admin/campaigns/new"
              className="bg-amber text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-amber-600 transition-all"
            >
              + Neues Projekt
            </Link>
          }
        />
        <div className="p-8">
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : (
            <DataTable columns={columns} data={campaigns} emptyMessage="Noch keine Projekte" />
          )}
        </div>
      </div>
    </div>
  );
}
