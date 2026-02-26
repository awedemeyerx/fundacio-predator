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

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then(r => r.json())
      .then(data => {
        setContacts(data.contacts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
    <div className="flex min-h-screen bg-warm-sand">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Kontakte" />
        <div className="p-8">
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : (
            <DataTable columns={columns} data={contacts} emptyMessage="Noch keine Kontaktanfragen" />
          )}
        </div>
      </div>
    </div>
  );
}
