'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function ResetCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = createSupabaseBrowser();

    // Sign out any existing session first, so the magic link token
    // from the hash fragment creates a fresh session for the invited user.
    // We must preserve the hash before signing out, as it contains the token.
    const hash = window.location.hash;

    (async () => {
      await supabase.auth.signOut();

      // Re-set the hash so Supabase can pick up the token after sign-out
      if (hash) {
        window.location.hash = hash;
      }

      // Now listen for the auth event from the hash fragment
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
          const isInvite = hash.includes('type=invite') || hash.includes('type=magiclink');
          router.push(`/admin/auth/set-password${isInvite ? '?invite=true' : ''}`);
        }
      });

      // Fallback: if no auth event fires within 5s, check session or redirect
      const timeout = setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/admin/auth/set-password');
        } else {
          setError('Link ist ungültig oder abgelaufen.');
        }
      }, 5000);

      // Cleanup (best-effort since async)
      window.addEventListener('beforeunload', () => {
        subscription.unsubscribe();
        clearTimeout(timeout);
      });
    })();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-warm-sand flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <a href="/admin/login" className="text-amber hover:underline">
            Zurück zum Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-sand flex items-center justify-center">
      <p className="text-charcoal">Link wird überprüft...</p>
    </div>
  );
}
