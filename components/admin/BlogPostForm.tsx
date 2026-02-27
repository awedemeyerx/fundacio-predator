'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const BlockNoteEditor = dynamic(() => import('./BlockNoteEditor'), { ssr: false });

interface BlogPostData {
  id?: number;
  slug_de: string;
  slug_en: string;
  slug_es: string;
  title_de: string;
  title_en: string;
  title_es: string;
  content_de: string;
  content_en: string;
  content_es: string;
  excerpt_de: string;
  excerpt_en: string;
  excerpt_es: string;
  cover_image_url: string;
  author: string;
  active: boolean;
  published_at: string;
}

interface BlogPostFormProps {
  post?: BlogPostData;
}

const LANGS = ['de', 'en', 'es'] as const;

export default function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeLang, setActiveLang] = useState<'de' | 'en' | 'es'>('de');
  const [coverUploading, setCoverUploading] = useState(false);

  const [form, setForm] = useState<BlogPostData>({
    slug_de: post?.slug_de || '',
    slug_en: post?.slug_en || '',
    slug_es: post?.slug_es || '',
    title_de: post?.title_de || '',
    title_en: post?.title_en || '',
    title_es: post?.title_es || '',
    content_de: post?.content_de || '',
    content_en: post?.content_en || '',
    content_es: post?.content_es || '',
    excerpt_de: post?.excerpt_de || '',
    excerpt_en: post?.excerpt_en || '',
    excerpt_es: post?.excerpt_es || '',
    cover_image_url: post?.cover_image_url || '',
    author: post?.author || 'Fundació Predator',
    active: post?.active ?? true,
    published_at: post?.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
  });

  function updateField(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  const handleContentChange = useCallback((lang: string) => {
    return (html: string) => {
      setForm(prev => ({ ...prev, [`content_${lang}`]: html }));
    };
  }, []);

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) updateField('cover_image_url', data.url);
    } catch {
      setError('Upload failed');
    }
    setCoverUploading(false);
  }

  async function handleSave() {
    setError('');
    setSaving(true);

    const payload = {
      ...form,
      published_at: new Date(form.published_at).toISOString(),
    };

    try {
      const url = post?.id ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = post?.id ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Save failed');
        setSaving(false);
        return;
      }

      router.push('/admin/blog');
    } catch {
      setError('Network error');
      setSaving(false);
    }
  }

  const isNew = !post?.id;

  return (
    <div className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      {/* Title — large, serif, like the live blog */}
      <div className="max-w-3xl mx-auto">
        <input
          type="text"
          value={form[`title_${activeLang}`]}
          onChange={(e) => updateField(`title_${activeLang}`, e.target.value)}
          placeholder={`Title (${activeLang.toUpperCase()})`}
          className="w-full text-2xl md:text-3xl font-serif text-charcoal placeholder:text-charcoal/30 bg-transparent border-none outline-none focus:ring-0 py-2"
        />
      </div>

      {/* Language tabs + Editor */}
      <div className="max-w-3xl mx-auto">
        <div className="flex border-b border-charcoal/10 mb-4">
          {LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                activeLang === lang
                  ? 'text-amber border-b-2 border-amber'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <BlockNoteEditor
          key={activeLang}
          initialHTML={form[`content_${activeLang}`]}
          onChange={handleContentChange(activeLang)}
        />
      </div>

      {/* Details — collapsible metadata */}
      <details open={isNew} className="max-w-3xl mx-auto bg-white rounded-xl border border-charcoal/5">
        <summary className="px-6 py-4 cursor-pointer text-sm font-medium text-charcoal select-none hover:bg-charcoal/[0.02] rounded-xl">
          Details
        </summary>
        <div className="px-6 pb-6 pt-2 space-y-5">
          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Cover Image</label>
            {form.cover_image_url && (
              <img src={form.cover_image_url} alt="Cover" className="w-full max-h-48 object-cover rounded-lg mb-3" />
            )}
            <input type="file" accept="image/*" onChange={handleCoverUpload} className="text-sm" />
            {coverUploading && <span className="text-xs text-charcoal-muted ml-2">Uploading...</span>}
            <input
              type="text"
              value={form.cover_image_url}
              onChange={(e) => updateField('cover_image_url', e.target.value)}
              placeholder="Or paste image URL"
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            />
          </div>

          {/* Slug + Excerpt */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Slug ({activeLang.toUpperCase()})</label>
            <input
              type="text"
              value={form[`slug_${activeLang}`]}
              onChange={(e) => updateField(`slug_${activeLang}`, e.target.value)}
              className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
              placeholder="url-friendly-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Excerpt ({activeLang.toUpperCase()})</label>
            <textarea
              value={form[`excerpt_${activeLang}`]}
              onChange={(e) => updateField(`excerpt_${activeLang}`, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            />
          </div>

          {/* Author + Published */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Published</label>
              <input
                type="datetime-local"
                value={form.published_at}
                onChange={(e) => updateField('published_at', e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => updateField('active', e.target.checked)}
              className="rounded"
            />
            <label className="text-sm text-charcoal">Active (visible on website)</label>
          </div>
        </div>
      </details>

      {/* Actions */}
      <div className="flex gap-3 max-w-3xl mx-auto">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber text-white font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : post?.id ? 'Update' : 'Create'}
        </button>
        <button
          onClick={() => router.push('/admin/blog')}
          className="text-charcoal-muted hover:text-charcoal px-6 py-2.5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
