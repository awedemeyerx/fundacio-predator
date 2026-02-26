'use client';

import { useState } from 'react';
import { Lang } from '@/lib/types';
import FadeIn from '@/components/ui/FadeIn';

const content = {
  de: {
    title: 'Kontakt',
    subtitle: 'Fragen, Ideen oder Anregungen? Wir freuen uns auf deine Nachricht.',
    name: 'Name',
    email: 'E-Mail',
    message: 'Nachricht',
    send: 'Nachricht senden',
    sending: 'Wird gesendet...',
    success: 'Danke für deine Nachricht! Wir melden uns bald.',
    error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
  },
  en: {
    title: 'Contact',
    subtitle: 'Questions, ideas, or suggestions? We look forward to your message.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending...',
    success: 'Thank you for your message! We will get back to you soon.',
    error: 'Something went wrong. Please try again.',
  },
  es: {
    title: 'Contacto',
    subtitle: '¿Preguntas, ideas o sugerencias? Esperamos tu mensaje.',
    name: 'Nombre',
    email: 'Correo electrónico',
    message: 'Mensaje',
    send: 'Enviar mensaje',
    sending: 'Enviando...',
    success: '¡Gracias por tu mensaje! Te responderemos pronto.',
    error: 'Algo salió mal. Por favor inténtalo de nuevo.',
  },
};

export default function ContactForm({
  lang,
  page,
}: {
  lang: Lang;
  page: string;
}) {
  const c = content[lang];
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, page }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="py-20 bg-warm-sand/30">
      <div className="max-w-2xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-forest font-medium mb-3">
              {c.title}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              {c.subtitle}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {status === 'success' ? (
            <div className="bg-forest/10 text-forest rounded-2xl p-8 text-center">
              <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-lg font-medium">{c.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal mb-1.5">
                  {c.name}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-white"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal mb-1.5">
                  {c.email}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-white"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-charcoal mb-1.5">
                  {c.message}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/10 rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-amber/30 focus:border-amber bg-white resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm">{c.error}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-amber text-white font-medium py-3.5 rounded-full text-lg hover:bg-amber-600 transition-all disabled:opacity-50"
              >
                {status === 'sending' ? c.sending : c.send}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
