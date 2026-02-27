'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

export default function ResetCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = createSupabaseBrowser();

    // The hash fragment (#access_token=...&type=recovery) is automatically
    // detected by the Supabase browser client. Listen for the auth event.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        router.push('/admin/auth/set-password');
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

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
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
