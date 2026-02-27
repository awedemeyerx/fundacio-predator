'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithGoogle } from '@/lib/supabase-browser';

const ERROR_MESSAGES: Record<string, string> = {
  not_authorized: 'Kein Zugang. Bitte kontaktiere einen Administrator.',
  auth_failed: 'Authentifizierung fehlgeschlagen. Bitte versuche es erneut.',
  no_code: 'Authentifizierung fehlgeschlagen.',
  no_session: 'Sitzung konnte nicht erstellt werden.',
};

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(ERROR_MESSAGES[errorParam] || errorParam);
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('Network error');
      setLoading(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess('Falls ein Konto mit dieser E-Mail existiert, wurde ein Reset-Link gesendet.');
      } else {
        setError('Fehler beim Senden.');
      }
    } catch {
      setError('Netzwerkfehler');
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    setError('');
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
        setGoogleLoading(false);
      }
      // Redirect happens via Supabase OAuth flow
    } catch {
      setError('Google Login fehlgeschlagen');
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-warm-sand flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-bold text-charcoal">Fundació Predator</h1>
          <p className="text-charcoal-muted text-sm mt-1">Admin Login</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-charcoal/10 text-charcoal font-medium py-3 rounded-full hover:bg-warm-sand transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {googleLoading ? 'Weiterleitung...' : 'Mit Google anmelden'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-charcoal/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-charcoal-muted">oder</span>
            </div>
          </div>

          {/* Email/Password */}
          {resetMode ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber text-white font-medium py-3 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
              >
                {loading ? '...' : 'Link senden'}
              </button>

              <button
                type="button"
                onClick={() => { setResetMode(false); setError(''); setSuccess(''); }}
                className="w-full text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                Zurück zum Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-warm-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber text-white font-medium py-3 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
              >
                {loading ? '...' : 'Login'}
              </button>

              <button
                type="button"
                onClick={() => { setResetMode(true); setError(''); setSuccess(''); }}
                className="w-full text-sm text-charcoal-muted hover:text-charcoal transition-colors"
              >
                Passwort vergessen?
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
