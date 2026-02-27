'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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
  cover_focal_x: number;
  cover_focal_y: number;
  author: string;
  active: boolean;
  published_at: string;
  tags: string[];
}

interface BlogPostFormProps {
  post?: BlogPostData;
}

const LANGS = ['de', 'en', 'es'] as const;

export default function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [activeLang, setActiveLang] = useState<'de' | 'en' | 'es'>('de');
  const [coverUploading, setCoverUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [translating, setTranslating] = useState(false);
  const [postId, setPostId] = useState(post?.id);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const coverDropRef = useRef<HTMLDivElement>(null);
  const [coverDragOver, setCoverDragOver] = useState(false);
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);
  const [focalDragging, setFocalDragging] = useState(false);

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
    cover_focal_x: post?.cover_focal_x ?? 50,
    cover_focal_y: post?.cover_focal_y ?? 50,
    author: post?.author || 'Fundació Predator',
    active: post?.active ?? true,
    published_at: post?.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    tags: post?.tags || [],
  });

  // Track if form has been modified for auto-save
  const formRef = useRef(form);
  formRef.current = form;
  const postIdRef = useRef(postId);
  postIdRef.current = postId;

  function updateField(field: string, value: string | boolean | number | string[]) {
    setForm(prev => ({ ...prev, [field]: value }));
    scheduleSave();
  }

  const handleContentChange = useCallback((lang: string) => {
    return (html: string) => {
      setForm(prev => ({ ...prev, [`content_${lang}`]: html }));
      scheduleSave();
    };
  }, []);

  // Auto-save: debounce 3s after last change
  function scheduleSave() {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      doSave(true);
    }, 3000);
  }

  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, []);

  async function doSave(isAutoSave = false) {
    if (saving) return;
    setError('');
    setSaving(true);
    setSaveStatus('saving');

    const payload = {
      ...formRef.current,
      published_at: new Date(formRef.current.published_at).toISOString(),
    };

    try {
      const currentId = postIdRef.current;
      const url = currentId ? `/api/admin/blog/${currentId}` : '/api/admin/blog';
      const method = currentId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Save failed');
        setSaving(false);
        setSaveStatus('error');
        return;
      }

      const data = await res.json();
      // If this was a create, update the URL and postId so future saves are PUTs
      if (!currentId && data.post?.id) {
        setPostId(data.post.id);
        window.history.replaceState(null, '', `/admin/blog/${data.post.id}/edit`);
      }

      setSaving(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch {
      setError('Network error');
      setSaving(false);
      setSaveStatus('error');
    }
  }

  async function handleSave() {
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    await doSave(false);
  }

  // Cover image upload
  async function uploadCoverFile(file: File) {
    setCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        updateField('cover_image_url', data.url);
      }
    } catch {
      setError('Upload failed');
    }
    setCoverUploading(false);
  }

  function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadCoverFile(file);
  }

  function handleCoverDrop(e: React.DragEvent) {
    e.preventDefault();
    setCoverDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadCoverFile(file);
    }
  }

  // Focal point
  function handleFocalMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setFocalDragging(true);
    updateFocalFromEvent(e);
  }

  function handleFocalMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!focalDragging) return;
    updateFocalFromEvent(e);
  }

  function handleFocalMouseUp() {
    setFocalDragging(false);
  }

  function updateFocalFromEvent(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)));
    setForm(prev => ({ ...prev, cover_focal_x: x, cover_focal_y: y }));
    scheduleSave();
  }

  // Tags
  function addTag(tag: string) {
    const t = tag.trim().toLowerCase();
    if (t && !form.tags.includes(t)) {
      updateField('tags', [...form.tags, t]);
    }
    setTagInput('');
  }

  function removeTag(tag: string) {
    updateField('tags', form.tags.filter(t => t !== tag));
  }

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
    if (e.key === 'Backspace' && !tagInput && form.tags.length > 0) {
      removeTag(form.tags[form.tags.length - 1]);
    }
  }

  // Translation
  const otherLangs = (current: 'de' | 'en' | 'es') => {
    return (['de', 'en', 'es'] as const).filter(l => l !== current);
  };

  async function handleTranslateAll(from: 'de' | 'en' | 'es', to: 'de' | 'en' | 'es') {
    setTranslating(true);
    setError('');
    const fields: Array<'title' | 'excerpt' | 'content'> = ['title', 'excerpt', 'content'];
    try {
      const updates: Record<string, string> = {};
      for (const field of fields) {
        const sourceKey = `${field}_${from}` as keyof BlogPostData;
        const sourceText = form[sourceKey] as string;
        if (!sourceText) continue;
        const res = await fetch('/api/admin/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: sourceText, from, to, field }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Übersetzung von ${field} fehlgeschlagen`);
        }
        const { translated } = await res.json();
        updates[`${field}_${to}`] = translated;
      }
      setForm(prev => ({ ...prev, ...updates }));
      scheduleSave();
    } catch (err: any) {
      setError(err.message || 'Übersetzung fehlgeschlagen');
    } finally {
      setTranslating(false);
    }
  }

  const isNew = !postId;

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

      {/* Language tabs + Translation + Editor */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between border-b border-charcoal/10 mb-4">
          <div className="flex">
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
          {/* Translation buttons */}
          <div className="flex items-center gap-2">
            {otherLangs(activeLang).map(source => (
              <button
                key={source}
                type="button"
                disabled={translating}
                onClick={() => handleTranslateAll(source, activeLang)}
                className="px-3 py-1.5 bg-amber/10 text-amber text-xs font-medium rounded-md hover:bg-amber/20 border border-amber/20 transition-colors disabled:opacity-50 disabled:cursor-wait"
              >
                {translating ? '...' : `Aus ${source.toUpperCase()}`}
              </button>
            ))}
          </div>
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
          {/* Cover Image — click or drag */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Cover Image</label>
            <div
              ref={coverDropRef}
              onClick={() => coverFileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setCoverDragOver(true); }}
              onDragLeave={() => setCoverDragOver(false)}
              onDrop={handleCoverDrop}
              className={`relative cursor-pointer rounded-lg border-2 border-dashed transition-colors overflow-hidden ${
                coverDragOver
                  ? 'border-amber bg-amber/5'
                  : form.cover_image_url
                    ? 'border-transparent'
                    : 'border-charcoal/20 hover:border-amber/50'
              }`}
            >
              {form.cover_image_url ? (
                <div className="relative">
                  <div
                    className="relative w-full h-48 select-none"
                    onMouseDown={handleFocalMouseDown}
                    onMouseMove={handleFocalMouseMove}
                    onMouseUp={handleFocalMouseUp}
                    onMouseLeave={handleFocalMouseUp}
                  >
                    <img
                      src={form.cover_image_url}
                      alt="Cover"
                      className="w-full h-48 object-cover rounded-lg"
                      style={{ objectPosition: `${form.cover_focal_x}% ${form.cover_focal_y}%` }}
                      draggable={false}
                    />
                    {/* Focal point indicator */}
                    <div
                      className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white shadow-lg pointer-events-none"
                      style={{
                        left: `${form.cover_focal_x}%`,
                        top: `${form.cover_focal_y}%`,
                        background: 'rgba(232, 114, 42, 0.8)',
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
                      Klicken/ziehen = Focal Point
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateField('cover_image_url', '');
                    }}
                    className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded hover:bg-black/70"
                  >
                    Entfernen
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-charcoal-muted">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">
                    {coverUploading ? 'Uploading...' : 'Klicken oder Bild hierher ziehen'}
                  </span>
                </div>
              )}
            </div>
            <input
              ref={coverFileRef}
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
            <input
              type="text"
              value={form.cover_image_url}
              onChange={(e) => updateField('cover_image_url', e.target.value)}
              placeholder="Oder Bild-URL einfügen"
              className="mt-2 w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Tags</label>
            <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border border-charcoal/10 rounded-lg bg-white min-h-[40px]">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-amber/10 text-amber text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-amber-700 ml-0.5"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={() => { if (tagInput.trim()) addTag(tagInput); }}
                placeholder={form.tags.length === 0 ? 'Tags eingeben, Enter zum Hinzufügen...' : ''}
                className="flex-1 min-w-[120px] text-sm border-none outline-none bg-transparent text-charcoal placeholder:text-charcoal/30"
              />
            </div>
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
      <div className="flex items-center gap-3 max-w-3xl mx-auto">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber text-white font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
        >
          {saving ? 'Speichern...' : postId ? 'Speichern' : 'Erstellen'}
        </button>
        <button
          onClick={() => router.push('/admin/blog')}
          className="text-charcoal-muted hover:text-charcoal px-6 py-2.5 transition-colors"
        >
          Zurück
        </button>
        {/* Save status indicator */}
        {saveStatus === 'saved' && (
          <span className="text-forest text-sm ml-2 animate-fade-in">Gespeichert</span>
        )}
        {saveStatus === 'saving' && (
          <span className="text-charcoal-muted text-sm ml-2">Speichern...</span>
        )}
        {saveStatus === 'error' && (
          <span className="text-red-500 text-sm ml-2">Fehler beim Speichern</span>
        )}
      </div>
    </div>
  );
}
