'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { useRouter } from 'next/navigation';

interface AdminUserRow {
  id: number;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

export default function UsersPage() {
  const { isAdmin, user: currentUser } = useAdminAuth();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/dashboard');
      return;
    }

    fetch('/api/admin/users')
      .then(r => r.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isAdmin, router]);

  async function handleRoleChange(id: number, newRole: string) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });

    if (res.ok) {
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to update role');
    }
  }

  async function handleDelete(id: number, email: string) {
    if (!confirm(`${email} wirklich entfernen?`)) return;

    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });

    if (res.ok) {
      setUsers(users.filter(u => u.id !== id));
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to delete user');
    }
  }

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-[#FAFBFC]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader
          title="User-Verwaltung"
          action={
            <Link
              href="/admin/users/invite"
              className="bg-amber text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-amber-600 transition-all"
            >
              + User einladen
            </Link>
          }
        />
        <div className="p-8">
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-charcoal-muted text-sm">Keine User vorhanden</p>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-charcoal/5 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-charcoal/5">
                    <th className="text-left text-xs font-medium text-charcoal-muted px-6 py-3">User</th>
                    <th className="text-left text-xs font-medium text-charcoal-muted px-6 py-3">Rolle</th>
                    <th className="text-left text-xs font-medium text-charcoal-muted px-6 py-3">Erstellt</th>
                    <th className="text-right text-xs font-medium text-charcoal-muted px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const isSelf = currentUser?.email === u.email;
                    return (
                      <tr key={u.id} className="border-b border-charcoal/5 last:border-0 hover:bg-warm-sand/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {u.avatar_url ? (
                              <img src={u.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-charcoal/5 flex items-center justify-center text-xs text-charcoal-muted">
                                {(u.name || u.email)[0].toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-charcoal">{u.name || u.email}</div>
                              {u.name && <div className="text-xs text-charcoal-muted">{u.email}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            disabled={isSelf}
                            className="text-sm border border-charcoal/10 rounded-lg px-2 py-1 bg-white text-charcoal disabled:opacity-50"
                          >
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-charcoal-muted">
                          {new Date(u.created_at).toLocaleDateString('de-DE')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {!isSelf && (
                            <button
                              onClick={() => handleDelete(u.id, u.email)}
                              className="text-red-400 hover:text-red-600 text-sm"
                            >
                              Entfernen
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
