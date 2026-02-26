'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import BlogPostForm from '@/components/admin/BlogPostForm';

export default function NewBlogPostPage() {
  return (
    <div className="flex min-h-screen bg-warm-sand">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="New Blog Post" />
        <div className="p-8">
          <BlogPostForm />
        </div>
      </div>
    </div>
  );
}
