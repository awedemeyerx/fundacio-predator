'use client';

import { useEffect, useState, useMemo } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsCard from '@/components/admin/StatsCard';
import DataTable from '@/components/admin/DataTable';

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
  newsletter_optin: boolean | null;
  total_donations: number | null;
  total_spent_cents: number | null;
  first_donation_at: string | null;
  last_donation_at: string | null;
  created_at: string;
}

interface Donation {
  id: number;
  donor_id: number | null;
  donor_name: string | null;
  donor_email: string | null;
  amount_cents: number;
  currency: string;
  project: string | null;
  campaign_id: number | null;
  status: string;
  created_at: string;
}

const PROJECT_LABELS: Record<string, string> = {
  educaclowns: 'EducaClowns',
  'si-mallorca': 'Si Mallorca',
  pollenca: 'Pollença',
  'sos-mamas': 'SOS Mamás',
};

function formatAmount(cents: number, currency = 'eur') {
  return `${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

function formatDate(iso: string | null) {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function donorName(d: Donor): string {
  if (d.display_name) return d.display_name;
  const parts = [d.first_name, d.last_name].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : '-';
}

export default function AdminDonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Donor | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/donors').then(r => r.json()),
      fetch('/api/admin/donations').then(r => r.json()),
    ]).then(([donorData, donationData]) => {
      setDonors(donorData.donors || []);
      setDonations(donationData.donations || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return donors;
    const q = search.toLowerCase();
    return donors.filter(d =>
      donorName(d).toLowerCase().includes(q) ||
      (d.email || '').toLowerCase().includes(q) ||
      (d.company || '').toLowerCase().includes(q)
    );
  }, [donors, search]);

  const totalDonors = donors.length;
  const newsletterCount = donors.filter(d => d.newsletter_optin).length;
  const totalLifetime = donors.reduce((sum, d) => sum + (d.total_spent_cents || 0), 0);
  const repeatDonors = donors.filter(d => (d.total_donations || 0) > 1).length;

  // Donations for selected donor
  const donorDonations = useMemo(() => {
    if (!selected) return [];
    return donations.filter(d =>
      d.donor_id === selected.id || (selected.email && d.donor_email === selected.email)
    );
  }, [selected, donations]);

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (d: Donor) => (
        <div>
          <span className="text-charcoal font-medium">{donorName(d)}</span>
          {d.company && <span className="text-charcoal-muted text-xs ml-2">{d.company}</span>}
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (d: Donor) => d.email || '-',
    },
    {
      key: 'total_donations',
      label: 'Spenden',
      render: (d: Donor) => (
        <span className="tabular-nums">{d.total_donations || 0}</span>
      ),
    },
    {
      key: 'total_spent_cents',
      label: 'Gesamt',
      render: (d: Donor) => (
        <span className="tabular-nums font-medium">{formatAmount(d.total_spent_cents || 0)}</span>
      ),
    },
    {
      key: 'last_donation_at',
      label: 'Letzte Spende',
      render: (d: Donor) => formatDate(d.last_donation_at),
    },
    {
      key: 'newsletter_optin',
      label: 'Newsletter',
      render: (d: Donor) => d.newsletter_optin ? (
        <span className="text-xs px-2 py-1 rounded-full bg-forest/10 text-forest">Ja</span>
      ) : (
        <span className="text-xs text-charcoal-muted">-</span>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAFBFC]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Spender" />
        <div className="p-8 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatsCard label="Spender" value={totalDonors} delay={0} />
            <StatsCard label="Stammspender" value={repeatDonors} sub={`${totalDonors > 0 ? Math.round(repeatDonors / totalDonors * 100) : 0}%`} delay={1} />
            <StatsCard label="Gesamtvolumen" value={`${(totalLifetime / 100).toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR`} delay={2} />
            <StatsCard label="Newsletter" value={newsletterCount} sub={`${totalDonors > 0 ? Math.round(newsletterCount / totalDonors * 100) : 0}%`} delay={3} />
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Name, E-Mail oder Firma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border border-charcoal/10 rounded-lg text-sm bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 min-w-[300px]"
            />
            {search && (
              <span className="ml-3 text-xs text-charcoal-muted">
                {filtered.length} von {donors.length}
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
              emptyMessage="Noch keine Spender"
              onRowClick={(d) => setSelected(d)}
            />
          )}
        </div>
      </div>

      {/* Donor Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-fade-in-up">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-charcoal/5 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="font-serif text-lg font-bold text-charcoal">{donorName(selected)}</h2>
                <p className="text-xs text-charcoal-muted">{selected.email}</p>
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
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-charcoal/[0.02] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-charcoal tabular-nums">{selected.total_donations || 0}</p>
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-muted">Spenden</p>
                </div>
                <div className="bg-charcoal/[0.02] rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-charcoal tabular-nums">{formatAmount(selected.total_spent_cents || 0)}</p>
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-muted">Gesamt</p>
                </div>
                <div className="bg-charcoal/[0.02] rounded-xl p-3 text-center">
                  <p className="text-sm font-medium text-charcoal">{formatDate(selected.first_donation_at)}</p>
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-muted">Seit</p>
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Kontaktdaten</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {selected.company && (
                    <div>
                      <p className="text-charcoal-muted text-xs">Firma</p>
                      <p className="text-charcoal">{selected.company}</p>
                    </div>
                  )}
                  {selected.address_line1 && (
                    <div>
                      <p className="text-charcoal-muted text-xs">Adresse</p>
                      <p className="text-charcoal">{selected.address_line1}</p>
                    </div>
                  )}
                  {selected.address_city && (
                    <div>
                      <p className="text-charcoal-muted text-xs">Ort</p>
                      <p className="text-charcoal">
                        {[selected.address_postal_code, selected.address_city].filter(Boolean).join(' ')}
                        {selected.address_country ? `, ${selected.address_country}` : ''}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-charcoal-muted text-xs">Newsletter</p>
                    <p className="text-charcoal">{selected.newsletter_optin ? 'Ja' : 'Nein'}</p>
                  </div>
                </div>
              </div>

              {/* Donation history */}
              {donorDonations.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">
                    Spendenhistorie ({donorDonations.length})
                  </p>
                  <div className="space-y-1.5 max-h-52 overflow-y-auto">
                    {donorDonations.map(d => (
                      <div
                        key={d.id}
                        className="flex items-center justify-between text-xs px-3 py-2.5 rounded-lg bg-charcoal/[0.02]"
                      >
                        <span className="text-charcoal-muted tabular-nums">{formatDate(d.created_at)}</span>
                        <span className="text-charcoal">
                          {d.project ? (PROJECT_LABELS[d.project] || d.project) : 'Allgemein'}
                        </span>
                        <span className="text-charcoal font-medium tabular-nums">{formatAmount(d.amount_cents, d.currency)}</span>
                        <span className={`px-1.5 py-0.5 rounded-full ${d.status === 'completed' ? 'bg-forest/10 text-forest' : 'bg-gold/10 text-gold'}`}>
                          {d.status}
                        </span>
                      </div>
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
