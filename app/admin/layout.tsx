import AdminAuthProvider from '@/components/admin/AdminAuthProvider';

export const metadata = {
  title: 'Admin — Fundació Predator',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  );
}
