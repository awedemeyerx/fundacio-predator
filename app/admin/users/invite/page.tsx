'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

export default function InviteUserPage() {
  const { isAdmin } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('editor');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  if (!isAdmin) {
    router.push('/admin/dashboard');
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || undefined, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to invite user');
        setSaving(false);
        return;
      }

      router.push('/admin/users');
    } catch {
      setError('Network error');
      setSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FAFBFC]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="User einladen" />
        <div className="p-8 max-w-lg">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-8 space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@example.com"
                className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
              />
              <p className="text-xs text-charcoal-muted mt-1">
                Der User kann sich nach dem Einladen mit dieser Email via Google oder Passwort anmelden.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Rolle</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
              <p className="text-xs text-charcoal-muted mt-1">
                Editor: Blog erstellen/bearbeiten. Admin: Vollzugriff.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-amber text-white font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
              >
                {saving ? 'Wird eingeladen...' : 'Einladen'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/users')}
                className="text-charcoal-muted hover:text-charcoal text-sm font-medium px-4 py-2.5"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
