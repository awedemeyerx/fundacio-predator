'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DataTable from '@/components/admin/DataTable';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';

interface BlogPost {
  id: number;
  title_de: string;
  slug_de: string;
  active: boolean;
  published_at: string;
  author: string;
  created_by_email?: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAdmin } = useAdminAuth();

  useEffect(() => {
    fetch('/api/admin/blog')
      .then(r => r.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Diesen Beitrag wirklich löschen?')) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  }

  const columns = [
    { key: 'title_de', label: 'Title' },
    {
      key: 'active',
      label: 'Status',
      render: (post: BlogPost) => (
        <span className={`text-xs px-2 py-1 rounded-full ${post.active ? 'bg-forest/10 text-forest' : 'bg-charcoal/10 text-charcoal-muted'}`}>
          {post.active ? 'Active' : 'Draft'}
        </span>
      ),
    },
    {
      key: 'published_at',
      label: 'Published',
      render: (post: BlogPost) => new Date(post.published_at).toLocaleDateString('de-DE'),
    },
    {
      key: 'actions',
      label: '',
      render: (post: BlogPost) => {
        const canEdit = isAdmin || post.created_by_email === user?.email;
        return (
          <div className="flex gap-2">
            {canEdit && (
              <Link href={`/admin/blog/${post.id}/edit`} className="text-amber hover:text-amber-600 text-sm">
                Edit
              </Link>
            )}
            {isAdmin && (
              <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-600 text-sm">
                Delete
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex min-h-screen bg-warm-sand">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader
          title="Blog Posts"
          action={
            <Link
              href="/admin/blog/new"
              className="bg-amber text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-amber-600 transition-all"
            >
              + New Post
            </Link>
          }
        />
        <div className="p-8">
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : (
            <DataTable columns={columns} data={posts} emptyMessage="Noch keine Blog Posts" />
          )}
        </div>
      </div>
    </div>
  );
}
