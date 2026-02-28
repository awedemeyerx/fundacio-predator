'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type') as 'invite' | 'magiclink' | null;

  useEffect(() => {
    if (!tokenHash || !type) {
      setStatus('error');
      setError('Ungültiger Einladungslink.');
    }
  }, [tokenHash, type]);

  const handleAccept = async () => {
    if (!tokenHash || !type) return;

    setStatus('loading');
    const supabase = createSupabaseBrowser();

    // Sign out any existing session first
    await supabase.auth.signOut();

    const { error: verifyError } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type === 'invite' ? 'invite' : 'magiclink',
    });

    if (verifyError) {
      setStatus('error');
      setError(
        verifyError.message?.includes('expired')
          ? 'Der Einladungslink ist abgelaufen. Bitte den Admin um eine neue Einladung.'
          : verifyError.message || 'Verifizierung fehlgeschlagen.'
      );
      return;
    }

    // Redirect to set-password page for invited users
    router.push('/admin/auth/set-password?invite=true');
  };

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-warm-sand flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <a href="/admin/login" className="text-amber hover:underline text-sm">
            Zum Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-sand flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="font-serif text-xl font-bold text-charcoal mb-2">Einladung annehmen</h1>
        <p className="text-charcoal-body text-sm mb-6">
          Klicke auf den Button, um deinen Zugang zur Fundació Predator zu aktivieren.
        </p>
        <button
          onClick={handleAccept}
          disabled={status === 'loading'}
          className="bg-amber text-white font-medium px-8 py-3 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50 w-full"
        >
          {status === 'loading' ? 'Wird aktiviert...' : 'Zugang aktivieren'}
        </button>
      </div>
    </div>
  );
}
