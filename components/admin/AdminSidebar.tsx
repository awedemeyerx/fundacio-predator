'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from './AdminAuthProvider';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/admin/blog', label: 'Blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { href: '/admin/links', label: 'Links', icon: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71' },
  { href: '/admin/campaigns', label: 'Projekte', icon: 'M13 10V3L4 14h7v7l9-11h-7z', adminOnly: true },
  { href: '/admin/donations', label: 'Spenden', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', adminOnly: true },
  { href: '/admin/donors', label: 'Spender', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', adminOnly: true },
  { href: '/admin/contacts', label: 'Nachrichten', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', adminOnly: true },
  { href: '/admin/users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', adminOnly: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAdminAuth();

  const visibleItems = navItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <aside className="w-64 bg-white border-r border-charcoal/5 min-h-screen flex flex-col">
      <div className="p-6 border-b border-charcoal/5">
        <Link href="/admin/dashboard" className="font-serif text-lg font-bold text-charcoal">
          Fundació Predator
        </Link>
        <p className="text-xs text-charcoal-muted mt-0.5">Admin</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-amber/10 text-amber font-medium'
                  : 'text-charcoal-body hover:bg-warm-sand hover:text-charcoal'
              }`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-charcoal/5">
        {user?.avatar_url && (
          <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full mb-2" />
        )}
        <Link href="/admin/profile" className="block text-xs text-charcoal-muted truncate hover:text-amber transition-colors">
          {user?.name || user?.email}
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${isAdmin ? 'bg-amber/10 text-amber' : 'bg-charcoal/5 text-charcoal-muted'}`}>
            {user?.role || 'user'}
          </span>
          <Link
            href="/admin/profile"
            className="text-xs text-charcoal-muted hover:text-amber transition-colors"
          >
            Profil
          </Link>
          <button
            onClick={logout}
            className="text-sm text-charcoal-muted hover:text-amber transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
