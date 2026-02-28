'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function ProfilePage() {
  const { user } = useAdminAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [saving, setSaving] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
    <div className="flex min-h-screen bg-[#FAFBFC]">
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

            <hr className="border-charcoal/5" />

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Google-Konto verknüpfen</label>
              <p className="text-xs text-charcoal-muted mb-3">
                Verknüpfe dein Google-Konto, um dich alternativ mit Google anzumelden.
              </p>
              <button
                type="button"
                onClick={async () => {
                  setGoogleLoading(true);
                  const supabase = createSupabaseBrowser();
                  const { error } = await supabase.auth.linkIdentity({
                    provider: 'google',
                    options: {
                      redirectTo: `${window.location.origin}/admin/auth/callback`,
                    },
                  });
                  if (error) {
                    setMessage({ type: 'error', text: error.message });
                    setGoogleLoading(false);
                  }
                }}
                disabled={googleLoading}
                className="flex items-center gap-3 border border-charcoal/10 text-charcoal text-sm font-medium px-4 py-2.5 rounded-full hover:bg-warm-sand transition-all disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {googleLoading ? 'Weiterleitung...' : 'Mit Google verknüpfen'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
