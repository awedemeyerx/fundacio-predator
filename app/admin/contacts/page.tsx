'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  page: string | null;
  created_at: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then(r => r.json())
      .then(data => {
        setContacts(data.contacts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function openMessage(contact: Contact) {
    setSelected(contact);
    setReply('');
    setSent(false);
    setError(null);
  }

  async function handleReply() {
    if (!selected || !reply.trim()) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/contacts/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selected.email,
          subject: `Re: Ihre Nachricht — Fundació Predator`,
          message: reply,
          originalMessage: selected.message,
          originalName: selected.name,
        }),
      });
      if (res.ok) {
        setSent(true);
        setReply('');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Fehler ${res.status}`);
      }
    } catch {
      setError('Netzwerkfehler');
    }
    setSending(false);
  }

  const columns = [
    {
      key: 'created_at',
      label: 'Datum',
      render: (c: Contact) => new Date(c.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'message',
      label: 'Nachricht',
      render: (c: Contact) => (
        <span className="line-clamp-2 max-w-xs">{c.message}</span>
      ),
    },
    {
      key: 'page',
      label: 'Seite',
      render: (c: Contact) => c.page || '-',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FAFBFC]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Nachrichten" />
        <div className="p-8">
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : (
            <DataTable
              columns={columns}
              data={contacts}
              emptyMessage="Noch keine Kontaktanfragen"
              onRowClick={openMessage}
            />
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-fade-in-up">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-charcoal/5 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="font-serif text-lg font-bold text-charcoal">{selected.name}</h2>
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
              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-charcoal-muted">
                <span>
                  {new Date(selected.created_at).toLocaleDateString('de-DE', {
                    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </span>
                {selected.page && (
                  <>
                    <span className="text-charcoal/20">·</span>
                    <span>Seite: {selected.page}</span>
                  </>
                )}
              </div>

              {/* Message */}
              <div className="bg-charcoal/[0.02] rounded-xl p-5">
                <p className="text-sm text-charcoal-body leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              {/* Reply */}
              {sent ? (
                <div className="bg-forest/5 text-forest text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Antwort gesendet an {selected.email}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">Antwort an {selected.name}</p>
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Nachricht schreiben..."
                    rows={4}
                    className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-sm text-charcoal bg-white focus:outline-none focus:border-amber/40 transition-colors resize-none"
                  />
                  {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleReply}
                      disabled={sending || !reply.trim()}
                      className="bg-amber text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {sending ? (
                        'Senden...'
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Antworten
                        </>
                      )}
                    </button>
                    <a
                      href={`mailto:${selected.email}?subject=Re: Ihre Nachricht — Fundació Predator`}
                      className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                    >
                      In Mail-App öffnen
                    </a>
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
