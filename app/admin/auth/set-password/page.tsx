'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function SetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Passwort muss mindestens 8 Zeichen lang sein.');
      return;
    }
    if (password !== confirm) {
      setError('Passwörter stimmen nicht überein.');
      return;
    }

    setLoading(true);

    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-warm-sand flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-charcoal">Neues Passwort</h1>
          <p className="text-charcoal-muted text-sm mt-1">Wähle ein neues Passwort für deinen Admin-Zugang.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Neues Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Passwort bestätigen</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber text-white font-medium py-3 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
            >
              {loading ? '...' : 'Passwort ändern'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
