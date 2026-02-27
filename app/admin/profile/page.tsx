'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

export default function ProfilePage() {
  const { user } = useAdminAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSave() {
    setMessage(null);

    if (password && password !== passwordConfirm) {
      setMessage({ type: 'error', text: 'Passwörter stimmen nicht überein' });
      return;
    }

    if (password && password.length < 6) {
      setMessage({ type: 'error', text: 'Passwort muss mindestens 6 Zeichen haben' });
      return;
    }

    setSaving(true);
    try {
      const body: Record<string, string> = {};
      if (name !== (user?.name || '')) body.name = name;
      if (password) body.password = password;

      if (Object.keys(body).length === 0) {
        setMessage({ type: 'success', text: 'Keine Änderungen' });
        setSaving(false);
        return;
      }

      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Fehler beim Speichern' });
      } else {
        setMessage({ type: 'success', text: 'Profil gespeichert' });
        setPassword('');
        setPasswordConfirm('');
        // Reload to refresh sidebar name
        if (body.name) {
          setTimeout(() => window.location.reload(), 500);
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Netzwerkfehler' });
    }
    setSaving(false);
  }

  return (
    <div className="flex min-h-screen bg-warm-sand">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Mein Profil" />
        <div className="p-8 max-w-lg">
          {message && (
            <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-forest/10 text-forest' : 'bg-red-50 text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">E-Mail</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm bg-charcoal/[0.02] text-charcoal-muted"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Rolle</label>
              <input
                type="text"
                value={user?.role || '-'}
                disabled
                className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm bg-charcoal/[0.02] text-charcoal-muted capitalize"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30"
                placeholder="Dein Name"
              />
            </div>

            <hr className="border-charcoal/5" />

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Neues Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30"
                placeholder="Leer lassen um nicht zu ändern"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Passwort bestätigen</label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30"
                placeholder="Passwort wiederholen"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-amber text-white font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
            >
              {saving ? 'Speichern...' : 'Speichern'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
