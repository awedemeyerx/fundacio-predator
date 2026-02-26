'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CampaignData {
  id?: number;
  slug: string;
  name_de: string;
  name_en: string;
  name_es: string;
  description_de: string;
  description_en: string;
  description_es: string;
  target_amount_cents: number;
  cover_image_url: string;
  active: boolean;
  start_date: string;
  end_date: string;
}

interface CampaignFormProps {
  campaign?: CampaignData;
}

const LANGS = ['de', 'en', 'es'] as const;

export default function CampaignForm({ campaign }: CampaignFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeLang, setActiveLang] = useState<'de' | 'en' | 'es'>('de');
  const [coverUploading, setCoverUploading] = useState(false);

  const [form, setForm] = useState<CampaignData>({
    slug: campaign?.slug || '',
    name_de: campaign?.name_de || '',
    name_en: campaign?.name_en || '',
    name_es: campaign?.name_es || '',
    description_de: campaign?.description_de || '',
    description_en: campaign?.description_en || '',
    description_es: campaign?.description_es || '',
    target_amount_cents: campaign?.target_amount_cents || 0,
    cover_image_url: campaign?.cover_image_url || '',
    active: campaign?.active ?? true,
    start_date: campaign?.start_date || '',
    end_date: campaign?.end_date || '',
  });

  function updateField(field: string, value: string | number | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

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
      target_amount_cents: Math.round(form.target_amount_cents),
      start_date: form.start_date || null,
      end_date: form.end_date || null,
    };

    try {
      const url = campaign?.id ? `/api/admin/campaigns/${campaign.id}` : '/api/admin/campaigns';
      const method = campaign?.id ? 'PUT' : 'POST';
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

      router.push('/admin/campaigns');
    } catch {
      setError('Network error');
      setSaving(false);
    }
  }

  const targetEuros = form.target_amount_cents / 100;

  return (
    <div className="space-y-6 max-w-3xl">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      {/* Cover Image */}
      <div className="bg-white rounded-xl border border-charcoal/5 p-6">
        <label className="block text-sm font-medium text-charcoal mb-2">Cover Image</label>
        {form.cover_image_url && (
          <img src={form.cover_image_url} alt="Cover" className="w-full max-h-48 object-cover rounded-lg mb-3" />
        )}
        <input type="file" accept="image/*" onChange={handleCoverUpload} className="text-sm" />
        {coverUploading && <span className="text-xs text-charcoal-muted ml-2">Uploading...</span>}
      </div>

      {/* Meta */}
      <div className="bg-white rounded-xl border border-charcoal/5 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => updateField('slug', e.target.value)}
            className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            placeholder="url-friendly-slug"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">Target Amount (EUR)</label>
          <input
            type="number"
            min="0"
            step="1"
            value={targetEuros || ''}
            onChange={(e) => updateField('target_amount_cents', parseFloat(e.target.value) * 100 || 0)}
            className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            placeholder="5000"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Start Date</label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) => updateField('start_date', e.target.value)}
              className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">End Date</label>
            <input
              type="date"
              value={form.end_date}
              onChange={(e) => updateField('end_date', e.target.value)}
              className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => updateField('active', e.target.checked)}
            className="rounded"
          />
          <label className="text-sm text-charcoal">Active</label>
        </div>
      </div>

      {/* Language tabs */}
      <div className="bg-white rounded-xl border border-charcoal/5 overflow-hidden">
        <div className="flex border-b border-charcoal/5">
          {LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeLang === lang
                  ? 'text-amber border-b-2 border-amber bg-amber/5'
                  : 'text-charcoal-muted hover:text-charcoal'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Name ({activeLang.toUpperCase()})</label>
            <input
              type="text"
              value={form[`name_${activeLang}`]}
              onChange={(e) => updateField(`name_${activeLang}`, e.target.value)}
              className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Description ({activeLang.toUpperCase()})</label>
            <textarea
              value={form[`description_${activeLang}`]}
              onChange={(e) => updateField(`description_${activeLang}`, e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-charcoal/10 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber text-white font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : campaign?.id ? 'Update' : 'Create'}
        </button>
        <button
          onClick={() => router.push('/admin/campaigns')}
          className="text-charcoal-muted hover:text-charcoal px-6 py-2.5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
