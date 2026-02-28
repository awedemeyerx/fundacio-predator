'use client';

import { useState } from 'react';
import { LINK_ICONS, getLinkIcon } from '@/lib/link-icons';

interface LinkItem {
  id: string;
  title_en: string;
  title_de: string;
  title_es: string;
  url: string;
  icon: string | null;
  sort_order: number;
  active: boolean;
}

function IconPicker({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const keys = Object.keys(LINK_ICONS);
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {/* No icon option */}
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all border ${
          value === null
            ? 'border-gold bg-gold/10 text-gold'
            : 'border-charcoal/10 text-charcoal-muted hover:border-charcoal/30'
        }`}
        title="No icon"
      >
        &times;
      </button>
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all border ${
            value === key
              ? 'border-gold bg-gold/10 text-gold'
              : 'border-charcoal/10 text-charcoal-muted hover:border-charcoal/30'
          }`}
          title={LINK_ICONS[key].label}
        >
          <span className="w-4 h-4">{LINK_ICONS[key].icon}</span>
        </button>
      ))}
    </div>
  );
}

const emptyLink = (): Omit<LinkItem, 'id' | 'sort_order'> => ({
  title_en: '',
  title_de: '',
  title_es: '',
  url: '',
  icon: null,
  active: true,
});

export default function LinkManager({ initialLinks }: { initialLinks: LinkItem[] }) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<LinkItem, 'id' | 'sort_order'>>(emptyLink());
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleCreate() {
    setSaving(true);
    const res = await fetch('/api/admin/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const { link } = await res.json();
      setLinks([...links, link]);
      setForm(emptyLink());
      setCreating(false);
    }
    setSaving(false);
  }

  async function handleUpdate(id: string) {
    setSaving(true);
    const res = await fetch('/api/admin/links', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...form }),
    });
    if (res.ok) {
      const { link } = await res.json();
      setLinks(links.map((l) => (l.id === id ? link : l)));
      setEditing(null);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Link wirklich löschen?')) return;
    const res = await fetch(`/api/admin/links?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setLinks(links.filter((l) => l.id !== id));
    }
  }

  async function handleToggleActive(link: LinkItem) {
    const res = await fetch('/api/admin/links', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: link.id, active: !link.active }),
    });
    if (res.ok) {
      setLinks(links.map((l) => (l.id === link.id ? { ...l, active: !l.active } : l)));
    }
  }

  async function handleMove(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= links.length) return;

    const updated = [...links];
    [updated[index], updated[target]] = [updated[target], updated[index]];

    const reorder = updated.map((l, i) => ({ id: l.id, sort_order: i }));
    setLinks(updated.map((l, i) => ({ ...l, sort_order: i })));

    await fetch('/api/admin/links', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reorder }),
    });
  }

  function startEdit(link: LinkItem) {
    setEditing(link.id);
    setCreating(false);
    setForm({
      title_en: link.title_en,
      title_de: link.title_de,
      title_es: link.title_es,
      url: link.url,
      icon: link.icon,
      active: link.active,
    });
  }

  function startCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptyLink());
  }

  return (
    <div className="space-y-4">
      {/* Link cards */}
      {links.map((link, i) => (
        <div key={link.id} className="bg-white rounded-xl border border-charcoal/5 overflow-hidden">
          {editing === link.id ? (
            <div className="p-5 space-y-4">
              <LinkForm form={form} setForm={setForm} />
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(link.id)}
                  disabled={saving}
                  className="bg-amber text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="text-sm text-charcoal-muted hover:text-charcoal px-4 py-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4">
              {/* Sort buttons */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => handleMove(i, -1)}
                  disabled={i === 0}
                  className="text-charcoal-muted hover:text-charcoal disabled:opacity-20 text-xs px-1"
                >
                  &uarr;
                </button>
                <button
                  onClick={() => handleMove(i, 1)}
                  disabled={i === links.length - 1}
                  className="text-charcoal-muted hover:text-charcoal disabled:opacity-20 text-xs px-1"
                >
                  &darr;
                </button>
              </div>

              {/* Icon */}
              <div className="w-8 h-8 flex items-center justify-center text-gold shrink-0">
                {link.icon ? (
                  <span className="w-5 h-5">{getLinkIcon(link.icon)}</span>
                ) : (
                  <span className="text-charcoal/20 text-xs">--</span>
                )}
              </div>

              {/* Title + URL */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-charcoal truncate">
                  {link.title_en || link.title_de || 'Untitled'}
                </div>
                <div className="text-xs text-charcoal-muted truncate">{link.url}</div>
              </div>

              {/* Status + Actions */}
              <button
                onClick={() => handleToggleActive(link)}
                className={`text-xs px-2 py-1 rounded-full cursor-pointer transition-colors ${
                  link.active
                    ? 'bg-forest/10 text-forest hover:bg-forest/20'
                    : 'bg-charcoal/10 text-charcoal-muted hover:bg-charcoal/20'
                }`}
              >
                {link.active ? 'Active' : 'Draft'}
              </button>
              <button
                onClick={() => startEdit(link)}
                className="text-amber hover:text-amber-600 text-sm transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="text-red-400 hover:text-red-600 text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Create form */}
      {creating ? (
        <div className="bg-white rounded-xl border border-charcoal/5 p-5 space-y-4">
          <h3 className="text-sm font-medium text-charcoal">New Link</h3>
          <LinkForm form={form} setForm={setForm} />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={saving || !form.url}
              className="bg-amber text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50"
            >
              {saving ? 'Creating...' : 'Create'}
            </button>
            <button
              onClick={() => setCreating(false)}
              className="text-sm text-charcoal-muted hover:text-charcoal px-4 py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={startCreate}
          className="bg-amber text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-amber-600 transition-all"
        >
          + New Link
        </button>
      )}
    </div>
  );
}

function LinkForm({
  form,
  setForm,
}: {
  form: Omit<LinkItem, 'id' | 'sort_order'>;
  setForm: (f: Omit<LinkItem, 'id' | 'sort_order'>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Title (DE)"
          value={form.title_de}
          onChange={(e) => setForm({ ...form, title_de: e.target.value })}
          className="border border-charcoal/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber"
        />
        <input
          type="text"
          placeholder="Title (EN)"
          value={form.title_en}
          onChange={(e) => setForm({ ...form, title_en: e.target.value })}
          className="border border-charcoal/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber"
        />
        <input
          type="text"
          placeholder="Title (ES)"
          value={form.title_es}
          onChange={(e) => setForm({ ...form, title_es: e.target.value })}
          className="border border-charcoal/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber"
        />
      </div>
      <input
        type="url"
        placeholder="URL"
        value={form.url}
        onChange={(e) => setForm({ ...form, url: e.target.value })}
        className="w-full border border-charcoal/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber"
      />
      <div>
        <label className="text-xs text-charcoal-muted block mb-2">Icon</label>
        <IconPicker value={form.icon} onChange={(icon) => setForm({ ...form, icon })} />
      </div>
    </div>
  );
}
