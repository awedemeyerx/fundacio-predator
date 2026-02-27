'use client';

import { useState } from 'react';

interface Keyword {
  keyword_en: string;
  keyword_de: string;
  keyword_es: string;
  volume_estimate: 'high' | 'medium' | 'low' | 'niche';
  monthly_searches: string;
  competition: 'high' | 'medium' | 'low';
  relevance: number;
}

interface GeneratedSeo {
  slug_en: string;
  slug_de: string;
  slug_es: string;
  title_en: string;
  title_de: string;
  title_es: string;
  excerpt_en: string;
  excerpt_de: string;
  excerpt_es: string;
  meta_title_en: string;
  meta_title_de: string;
  meta_title_es: string;
  meta_description_en: string;
  meta_description_de: string;
  meta_description_es: string;
  content_en: string;
  content_es: string;
  tags: string[];
}

interface SeoAutopilotModalProps {
  title_de: string;
  content_de: string;
  excerpt_de: string;
  onApply: (data: Partial<GeneratedSeo>) => void;
  onClose: () => void;
}

const VOLUME_COLORS: Record<string, string> = {
  high: 'bg-green-100 text-green-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-orange-100 text-orange-700',
  niche: 'bg-gray-100 text-gray-600',
};

const COMPETITION_COLORS: Record<string, string> = {
  high: 'text-red-600',
  medium: 'text-amber-600',
  low: 'text-green-600',
};

export default function SeoAutopilotModal({ title_de, content_de, excerpt_de, onApply, onClose }: SeoAutopilotModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState<GeneratedSeo | null>(null);
  const [editedGenerated, setEditedGenerated] = useState<GeneratedSeo | null>(null);

  // Step 1: Fetch keywords
  async function fetchKeywords() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/seo-autopilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title_de, content_de }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Keyword-Recherche fehlgeschlagen');
      }
      const data = await res.json();
      setKeywords(data.keywords || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Auto-fetch on mount
  if (step === 1 && keywords.length === 0 && !loading && !error) {
    fetchKeywords();
  }

  function toggleKeyword(kw: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(kw)) {
        next.delete(kw);
        if (primaryKeyword === kw) setPrimaryKeyword('');
      } else {
        next.add(kw);
        if (!primaryKeyword) setPrimaryKeyword(kw);
      }
      return next;
    });
  }

  function setPrimary(kw: string) {
    setPrimaryKeyword(kw);
    setSelected(prev => {
      const next = new Set(prev);
      next.add(kw);
      return next;
    });
  }

  // Step 2: Generate SEO content
  async function handleGenerate() {
    setGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/admin/seo-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title_de,
          content_de,
          excerpt_de,
          selected_keywords: Array.from(selected),
          primary_keyword: primaryKeyword,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'SEO-Generierung fehlgeschlagen');
      }
      const data: GeneratedSeo = await res.json();
      setGenerated(data);
      setEditedGenerated({ ...data });
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  function updateEditField(field: keyof GeneratedSeo, value: string | string[]) {
    setEditedGenerated(prev => prev ? { ...prev, [field]: value } : prev);
  }

  // Step 3: Apply
  function handleApply() {
    if (!editedGenerated) return;
    onApply(editedGenerated);
    setStep(3);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-charcoal">SEO Autopilot</h2>
              <p className="text-xs text-charcoal-muted">
                {step === 1 && 'Schritt 1: Keywords auswählen'}
                {step === 2 && 'Schritt 2: Vorschau prüfen & anpassen'}
                {step === 3 && 'Fertig — alle Felder wurden gesetzt'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Step indicators */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map(s => (
                <div key={s} className={`w-2 h-2 rounded-full transition-colors ${s <= step ? 'bg-amber' : 'bg-charcoal/15'}`} />
              ))}
            </div>
            <button onClick={onClose} className="text-charcoal-muted hover:text-charcoal p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {error && (
            <div className="mb-4 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg flex items-center justify-between">
              {error}
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 ml-3">&times;</button>
            </div>
          )}

          {/* Step 1: Keywords */}
          {step === 1 && (
            <div>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <svg className="animate-spin h-8 w-8 text-amber mb-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="text-charcoal-muted text-sm">Recherchiere Keywords...</p>
                </div>
              ) : keywords.length > 0 ? (
                <>
                  <p className="text-sm text-charcoal-muted mb-4">
                    Wähle 3-5 Keywords aus und markiere ein Haupt-Keyword für den Slug.
                  </p>
                  <div className="border border-charcoal/10 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-charcoal/[0.03] text-charcoal-muted text-xs uppercase tracking-wide">
                          <th className="text-left px-4 py-2.5 w-8"></th>
                          <th className="text-left px-4 py-2.5">Keyword (EN)</th>
                          <th className="text-left px-4 py-2.5">DE</th>
                          <th className="text-left px-4 py-2.5 w-20">Volumen</th>
                          <th className="text-left px-4 py-2.5 w-16">Komp.</th>
                          <th className="text-left px-4 py-2.5 w-16">Rel.</th>
                          <th className="text-center px-4 py-2.5 w-16">Haupt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {keywords.map((kw, i) => {
                          const isSelected = selected.has(kw.keyword_en);
                          const isPrimary = primaryKeyword === kw.keyword_en;
                          return (
                            <tr
                              key={i}
                              className={`border-t border-charcoal/5 transition-colors cursor-pointer ${
                                isSelected ? 'bg-amber/5' : 'hover:bg-charcoal/[0.02]'
                              }`}
                              onClick={() => toggleKeyword(kw.keyword_en)}
                            >
                              <td className="px-4 py-2.5">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleKeyword(kw.keyword_en)}
                                  className="rounded border-charcoal/30 text-amber focus:ring-amber"
                                />
                              </td>
                              <td className="px-4 py-2.5 font-medium text-charcoal">{kw.keyword_en}</td>
                              <td className="px-4 py-2.5 text-charcoal-muted">{kw.keyword_de}</td>
                              <td className="px-4 py-2.5">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${VOLUME_COLORS[kw.volume_estimate] || ''}`}>
                                  {kw.monthly_searches}
                                </span>
                              </td>
                              <td className={`px-4 py-2.5 text-xs font-medium ${COMPETITION_COLORS[kw.competition] || ''}`}>
                                {kw.competition}
                              </td>
                              <td className="px-4 py-2.5">
                                <div className="flex items-center gap-1">
                                  <div className="w-12 h-1.5 bg-charcoal/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber rounded-full" style={{ width: `${kw.relevance * 100}%` }} />
                                  </div>
                                  <span className="text-xs text-charcoal-muted">{Math.round(kw.relevance * 100)}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5 text-center">
                                <input
                                  type="radio"
                                  name="primary"
                                  checked={isPrimary}
                                  onChange={() => setPrimary(kw.keyword_en)}
                                  onClick={e => e.stopPropagation()}
                                  className="text-amber focus:ring-amber"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : !error ? (
                <div className="text-center py-16 text-charcoal-muted">
                  <p>Keine Keywords gefunden. Stelle sicher, dass der deutsche Content vorhanden ist.</p>
                  <button
                    onClick={fetchKeywords}
                    className="mt-3 px-4 py-2 bg-amber/10 text-amber text-sm font-medium rounded-lg hover:bg-amber/20"
                  >
                    Erneut versuchen
                  </button>
                </div>
              ) : null}
            </div>
          )}

          {/* Step 2: Preview & Edit */}
          {step === 2 && editedGenerated && (
            <div className="space-y-6">
              <p className="text-sm text-charcoal-muted">
                Prüfe die generierten Inhalte und passe sie bei Bedarf an.
              </p>

              {/* Slugs */}
              <FieldSection title="Slugs">
                <FieldRow label="EN" field="slug_en" value={editedGenerated.slug_en} onChange={v => updateEditField('slug_en', v)} />
                <FieldRow label="DE" field="slug_de" value={editedGenerated.slug_de} onChange={v => updateEditField('slug_de', v)} />
                <FieldRow label="ES" field="slug_es" value={editedGenerated.slug_es} onChange={v => updateEditField('slug_es', v)} />
              </FieldSection>

              {/* Titles */}
              <FieldSection title="Titel">
                <FieldRow label="DE" field="title_de" value={editedGenerated.title_de} onChange={v => updateEditField('title_de', v)} />
                <FieldRow label="EN" field="title_en" value={editedGenerated.title_en} onChange={v => updateEditField('title_en', v)} />
                <FieldRow label="ES" field="title_es" value={editedGenerated.title_es} onChange={v => updateEditField('title_es', v)} />
              </FieldSection>

              {/* Excerpts */}
              <FieldSection title="Excerpts">
                <FieldRowArea label="DE" value={editedGenerated.excerpt_de} onChange={v => updateEditField('excerpt_de', v)} />
                <FieldRowArea label="EN" value={editedGenerated.excerpt_en} onChange={v => updateEditField('excerpt_en', v)} />
                <FieldRowArea label="ES" value={editedGenerated.excerpt_es} onChange={v => updateEditField('excerpt_es', v)} />
              </FieldSection>

              {/* Meta */}
              <FieldSection title="Meta Titles">
                <FieldRow label="DE" field="meta_title_de" value={editedGenerated.meta_title_de} onChange={v => updateEditField('meta_title_de', v)} maxLen={60} />
                <FieldRow label="EN" field="meta_title_en" value={editedGenerated.meta_title_en} onChange={v => updateEditField('meta_title_en', v)} maxLen={60} />
                <FieldRow label="ES" field="meta_title_es" value={editedGenerated.meta_title_es} onChange={v => updateEditField('meta_title_es', v)} maxLen={60} />
              </FieldSection>

              <FieldSection title="Meta Descriptions">
                <FieldRowArea label="DE" value={editedGenerated.meta_description_de} onChange={v => updateEditField('meta_description_de', v)} maxLen={155} />
                <FieldRowArea label="EN" value={editedGenerated.meta_description_en} onChange={v => updateEditField('meta_description_en', v)} maxLen={155} />
                <FieldRowArea label="ES" value={editedGenerated.meta_description_es} onChange={v => updateEditField('meta_description_es', v)} maxLen={155} />
              </FieldSection>

              {/* Tags */}
              <FieldSection title="Tags">
                <div className="flex flex-wrap gap-1.5">
                  {editedGenerated.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-amber/10 text-amber text-xs font-medium px-2.5 py-1 rounded-full">
                      {tag}
                      <button
                        type="button"
                        onClick={() => updateEditField('tags', editedGenerated.tags.filter((_, j) => j !== i))}
                        className="hover:text-amber-700 ml-0.5"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </FieldSection>

              {/* Content preview (collapsed) */}
              <details className="border border-charcoal/10 rounded-xl">
                <summary className="px-4 py-3 text-sm font-medium text-charcoal cursor-pointer hover:bg-charcoal/[0.02]">
                  Content EN (Vorschau)
                </summary>
                <div className="px-4 pb-4 text-sm text-charcoal-muted prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: editedGenerated.content_en }} />
              </details>
              <details className="border border-charcoal/10 rounded-xl">
                <summary className="px-4 py-3 text-sm font-medium text-charcoal cursor-pointer hover:bg-charcoal/[0.02]">
                  Content ES (Vorschau)
                </summary>
                <div className="px-4 pb-4 text-sm text-charcoal-muted prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: editedGenerated.content_es }} />
              </details>
            </div>
          )}

          {/* Step 3: Done */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Alle Felder gesetzt!</h3>
              <p className="text-sm text-charcoal-muted text-center max-w-md">
                Slugs, Titel, Excerpts, Content und Tags wurden in das Formular übernommen.
                Du kannst sie jetzt noch manuell anpassen und dann speichern.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-charcoal/10 flex items-center justify-between">
          <div className="text-xs text-charcoal-muted">
            {step === 1 && selected.size > 0 && (
              <span>{selected.size} Keyword{selected.size !== 1 ? 's' : ''} ausgewählt{primaryKeyword ? ` · Haupt: "${primaryKeyword}"` : ''}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {step === 3 ? (
              <button
                onClick={onClose}
                className="bg-amber text-white font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all"
              >
                Schließen
              </button>
            ) : step === 2 ? (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="text-charcoal-muted hover:text-charcoal px-4 py-2.5 transition-colors text-sm"
                >
                  Zurück
                </button>
                <button
                  onClick={handleApply}
                  className="bg-amber text-white font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all"
                >
                  Anwenden
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="text-charcoal-muted hover:text-charcoal px-4 py-2.5 transition-colors text-sm"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={selected.size === 0 || !primaryKeyword || generating}
                  className="bg-amber text-white font-medium px-6 py-2.5 rounded-full hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {generating && (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                  {generating ? 'Generiere...' : 'Generieren'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function FieldSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-charcoal/10 rounded-xl overflow-hidden">
      <div className="bg-charcoal/[0.03] px-4 py-2 text-xs font-medium text-charcoal-muted uppercase tracking-wide">
        {title}
      </div>
      <div className="divide-y divide-charcoal/5">{children}</div>
    </div>
  );
}

function FieldRow({
  label,
  field,
  value,
  onChange,
  maxLen,
}: {
  label: string;
  field?: string;
  value: string;
  onChange: (v: string) => void;
  maxLen?: number;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <span className="text-xs font-medium text-charcoal-muted w-6 shrink-0">{label}</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 px-2 py-1.5 text-sm border border-charcoal/10 rounded-md focus:border-amber/50 focus:ring-1 focus:ring-amber/20 outline-none"
      />
      {maxLen && (
        <span className={`text-xs tabular-nums shrink-0 ${value.length > maxLen ? 'text-red-500 font-medium' : 'text-charcoal-muted'}`}>
          {value.length}/{maxLen}
        </span>
      )}
    </div>
  );
}

function FieldRowArea({
  label,
  value,
  onChange,
  maxLen,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLen?: number;
}) {
  return (
    <div className="flex gap-3 px-4 py-2">
      <span className="text-xs font-medium text-charcoal-muted w-6 shrink-0 pt-2">{label}</span>
      <div className="flex-1">
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={2}
          className="w-full px-2 py-1.5 text-sm border border-charcoal/10 rounded-md focus:border-amber/50 focus:ring-1 focus:ring-amber/20 outline-none resize-none"
        />
        {maxLen && (
          <span className={`text-xs tabular-nums ${value.length > maxLen ? 'text-red-500 font-medium' : 'text-charcoal-muted'}`}>
            {value.length}/{maxLen}
          </span>
        )}
      </div>
    </div>
  );
}
