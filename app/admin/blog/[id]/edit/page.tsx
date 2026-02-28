'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import BlogPostForm from '@/components/admin/BlogPostForm';

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/blog/${params.id}`)
      .then(r => r.json())
      .then(data => {
        setPost(data.post);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="flex min-h-screen bg-[#FAFBFC]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Edit Blog Post" />
        <div className="p-8">
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : post ? (
            <BlogPostForm post={post} />
          ) : (
            <p className="text-red-500 text-sm">Post not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
