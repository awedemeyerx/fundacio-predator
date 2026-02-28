'use client';

import { useEffect, useState, useMemo } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
import DataTable from '@/components/admin/DataTable';

interface Donation {
  id: number;
  donor_name: string | null;
  donor_email: string | null;
  amount_cents: number;
  currency: string;
  project: string | null;
  campaign_id: number | null;
  status: string;
  created_at: string;
}

interface CampaignOption {
  id: number;
  name_de: string;
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/donations').then(r => r.json()),
      fetch('/api/admin/campaigns').then(r => r.json()),
    ]).then(([donationData, campaignData]) => {
      setDonations(donationData.donations || []);
      setCampaigns(campaignData.campaigns || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let result = donations;

    if (campaignFilter !== 'all') {
      if (campaignFilter === 'none') {
        result = result.filter(d => !d.campaign_id && !d.project);
      } else {
        result = result.filter(d => d.campaign_id === Number(campaignFilter));
      }
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        (d.donor_name || '').toLowerCase().includes(q) ||
        (d.donor_email || '').toLowerCase().includes(q)
      );
    }

    return result;
  }, [donations, campaignFilter, search]);

  const totalCents = donations.reduce((sum, d) => sum + (d.amount_cents || 0), 0);
  const completedCount = donations.filter(d => d.status === 'completed').length;

  const columns = [
    {
      key: 'created_at',
      label: 'Datum',
      render: (d: Donation) => new Date(d.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    },
    {
      key: 'donor_name',
      label: 'Name',
      render: (d: Donation) => d.donor_name || '-',
    },
    {
      key: 'donor_email',
      label: 'Email',
      render: (d: Donation) => d.donor_email || '-',
    },
    {
      key: 'amount_cents',
      label: 'Betrag',
      render: (d: Donation) => `${(d.amount_cents / 100).toFixed(2)} ${(d.currency || 'eur').toUpperCase()}`,
    },
    {
      key: 'project',
      label: 'Projekt',
      render: (d: Donation) => {
        const projectLabels: Record<string, string> = {
          educaclowns: 'EducaClowns',
          pollenca: 'Pollença',
          'sos-mamas': 'SOS Mamás',
        };
        if (d.project) return projectLabels[d.project] || d.project;
        if (d.campaign_id) {
          const c = campaigns.find(c => c.id === d.campaign_id);
          return c?.name_de || `#${d.campaign_id}`;
        }
        return <span className="text-charcoal-muted">-</span>;
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (d: Donation) => (
        <span className={`text-xs px-2 py-1 rounded-full ${d.status === 'completed' ? 'bg-forest/10 text-forest' : 'bg-gold/10 text-gold'}`}>
          {d.status}
        </span>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAFBFC]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Spenden" />
        <div className="p-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard label="Gesamtspenden" value={donations.length} sub={`davon ${completedCount} abgeschlossen`} />
            <StatsCard label="Gesamtsumme" value={`${(totalCents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR`} />
            <StatsCard
              label="Durchschnitt"
              value={donations.length > 0 ? `${(totalCents / 100 / donations.length).toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR` : '-'}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="px-3 py-2 border border-charcoal/10 rounded-lg text-sm bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30"
            >
              <option value="all">Alle Projekte</option>
              <option value="none">Ohne Projekt</option>
              {campaigns.map(c => (
                <option key={c.id} value={c.id}>{c.name_de}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Name, E-Mail oder Spender..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border border-charcoal/10 rounded-lg text-sm bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 min-w-[250px]"
            />
            {(search || campaignFilter !== 'all') && (
              <span className="self-center text-xs text-charcoal-muted">
                {filtered.length} von {donations.length} Ergebnissen
              </span>
            )}
          </div>

          {/* Table */}
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : (
            <DataTable columns={columns} data={filtered} emptyMessage="Noch keine Spenden" />
          )}
        </div>
      </div>
    </div>
  );
}
