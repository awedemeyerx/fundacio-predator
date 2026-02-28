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
  donor_id: number | null;
  stripe_session_id: string | null;
  gateway: string | null;
  status: string;
  created_at: string;
}

interface Donor {
  id: number;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  display_name: string | null;
  company: string | null;
  address_line1: string | null;
  address_city: string | null;
  address_postal_code: string | null;
  address_country: string | null;
  total_donations: number | null;
  total_spent_cents: number | null;
  first_donation_at: string | null;
  last_donation_at: string | null;
}

interface CampaignOption {
  id: number;
  name_de: string;
}

const PROJECT_LABELS: Record<string, string> = {
  educaclowns: 'EducaClowns',
  'si-mallorca': 'Si Mallorca',
  pollenca: 'Pollença',
  'sos-mamas': 'SOS Mamás',
};

function getProjectLabel(d: Donation, campaigns: CampaignOption[]): string {
  if (d.project) return PROJECT_LABELS[d.project] || d.project;
  if (d.campaign_id) {
    const c = campaigns.find(c => c.id === d.campaign_id);
    return c?.name_de || `Kampagne #${d.campaign_id}`;
  }
  return 'Allgemein';
}

function formatAmount(cents: number, currency = 'eur') {
  return `${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState<string>('all');
  const [selected, setSelected] = useState<Donation | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/donations').then(r => r.json()),
      fetch('/api/admin/campaigns').then(r => r.json()),
      fetch('/api/admin/donors').then(r => r.json()).catch(() => ({ donors: [] })),
    ]).then(([donationData, campaignData, donorData]) => {
      setDonations(donationData.donations || []);
      setCampaigns(campaignData.campaigns || []);
      setDonors(donorData.donors || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const donorMap = useMemo(() => {
    const map = new Map<number, Donor>();
    donors.forEach(d => map.set(d.id, d));
    return map;
  }, [donors]);

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

  // Donations by the same donor (for detail modal)
  const donorDonations = useMemo(() => {
    if (!selected) return [];
    return donations.filter(d =>
      d.id !== selected.id && (
        (selected.donor_id && d.donor_id === selected.donor_id) ||
        (selected.donor_email && d.donor_email === selected.donor_email)
      )
    );
  }, [selected, donations]);

  const selectedDonor = selected?.donor_id ? donorMap.get(selected.donor_id) : null;

  const columns = [
    {
      key: 'created_at',
      label: 'Datum',
      render: (d: Donation) => formatDate(d.created_at),
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
      render: (d: Donation) => formatAmount(d.amount_cents, d.currency),
    },
    {
      key: 'project',
      label: 'Projekt',
      render: (d: Donation) => {
        const label = getProjectLabel(d, campaigns);
        return label === 'Allgemein' ? <span className="text-charcoal-muted">-</span> : label;
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
            <DataTable
              columns={columns}
              data={filtered}
              emptyMessage="Noch keine Spenden"
              onRowClick={(d) => setSelected(d)}
            />
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-fade-in-up">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-charcoal/5 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="font-serif text-lg font-bold text-charcoal">Spende #{selected.id}</h2>
                <p className="text-xs text-charcoal-muted">{formatDateTime(selected.created_at)}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-charcoal-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Amount + Status */}
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-charcoal tabular-nums">
                  {formatAmount(selected.amount_cents, selected.currency)}
                </span>
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${selected.status === 'completed' ? 'bg-forest/10 text-forest' : 'bg-gold/10 text-gold'}`}>
                  {selected.status}
                </span>
              </div>

              {/* Project */}
              <div className="bg-charcoal/[0.02] rounded-xl p-4">
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium mb-1">Projekt</p>
                <p className="text-sm text-charcoal font-medium">{getProjectLabel(selected, campaigns)}</p>
              </div>

              {/* Donor info */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Spender</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-charcoal-muted text-xs">Name</p>
                    <p className="text-charcoal">{selected.donor_name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-charcoal-muted text-xs">Email</p>
                    <p className="text-charcoal truncate">{selected.donor_email || '-'}</p>
                  </div>
                  {selectedDonor && (
                    <>
                      {selectedDonor.company && (
                        <div>
                          <p className="text-charcoal-muted text-xs">Firma</p>
                          <p className="text-charcoal">{selectedDonor.company}</p>
                        </div>
                      )}
                      {selectedDonor.address_city && (
                        <div>
                          <p className="text-charcoal-muted text-xs">Ort</p>
                          <p className="text-charcoal">
                            {[selectedDonor.address_postal_code, selectedDonor.address_city].filter(Boolean).join(' ')}
                            {selectedDonor.address_country ? `, ${selectedDonor.address_country}` : ''}
                          </p>
                        </div>
                      )}
                      {selectedDonor.total_donations && selectedDonor.total_donations > 1 && (
                        <div className="col-span-2 bg-amber/5 rounded-lg p-3">
                          <p className="text-xs text-amber font-medium">
                            Stammspender — {selectedDonor.total_donations} Spenden, gesamt {formatAmount(selectedDonor.total_spent_cents || 0)}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Technical details */}
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Details</p>
                <div className="text-xs space-y-1.5 text-charcoal-muted">
                  {selected.gateway && (
                    <div className="flex justify-between">
                      <span>Gateway</span>
                      <span className="text-charcoal">{selected.gateway}</span>
                    </div>
                  )}
                  {selected.stripe_session_id && (
                    <div className="flex justify-between items-center">
                      <span>Stripe Session</span>
                      <a
                        href={`https://dashboard.stripe.com/payments?query=${selected.stripe_session_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-amber hover:text-amber-600 transition-colors font-mono text-[11px]"
                      >
                        {selected.stripe_session_id.slice(0, 20)}...
                        <svg className="w-3 h-3 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                  {selected.donor_id && (
                    <div className="flex justify-between">
                      <span>Spender-ID</span>
                      <span className="text-charcoal font-mono">#{selected.donor_id}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Other donations from this donor */}
              {donorDonations.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">
                    Weitere Spenden dieses Spenders ({donorDonations.length})
                  </p>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {donorDonations.map(d => (
                      <button
                        key={d.id}
                        onClick={() => setSelected(d)}
                        className="w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg hover:bg-charcoal/[0.03] transition-colors text-left"
                      >
                        <span className="text-charcoal-muted">{formatDate(d.created_at)}</span>
                        <span className="text-charcoal">{getProjectLabel(d, campaigns)}</span>
                        <span className="text-charcoal font-medium tabular-nums">{formatAmount(d.amount_cents, d.currency)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
