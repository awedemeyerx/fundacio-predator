'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminUser {
  email: string;
  id: string;
  adminId?: number;
  name?: string | null;
  avatar_url?: string | null;
  role?: 'admin' | 'editor';
}

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  isAdmin: boolean;
  isEditor: boolean;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  isEditor: false,
  logout: async () => {},
  refreshSession: async () => {},
});

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export default function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/auth/session');
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // Refresh role on tab focus (e.g. after admin changed role)
  useEffect(() => {
    const onFocus = () => fetchSession();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchSession]);

  async function logout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/admin/login');
  }

  const refreshSession = useCallback(async () => {
    await fetchSession();
  }, [fetchSession]);

  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor';

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-sand flex items-center justify-center">
        <div className="text-charcoal-muted">Loading...</div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, isAdmin, isEditor, logout, refreshSession }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
