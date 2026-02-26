'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lang } from '@/lib/types';

const content = {
  de: {
    text: 'Wir nutzen Cookies für anonyme Besucherstatistiken (Vercel Analytics). Keine Werbecookies, kein Tracking.',
    accept: 'Akzeptieren',
    decline: 'Ablehnen',
    link: 'Datenschutz',
  },
  en: {
    text: 'We use cookies for anonymous visitor statistics (Vercel Analytics). No advertising cookies, no tracking.',
    accept: 'Accept',
    decline: 'Decline',
    link: 'Privacy Policy',
  },
  es: {
    text: 'Usamos cookies para estadísticas anónimas de visitantes (Vercel Analytics). Sin cookies publicitarias, sin seguimiento.',
    accept: 'Aceptar',
    decline: 'Rechazar',
    link: 'Privacidad',
  },
};

export default function CookieConsent({ lang }: { lang: Lang }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  }

  const c = content[lang];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-charcoal/5 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-charcoal-body leading-relaxed">
                {c.text}{' '}
                <a
                  href={lang === 'de' ? '/datenschutz' : `/${lang}/datenschutz`}
                  className="text-amber underline underline-offset-2"
                >
                  {c.link}
                </a>
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm text-charcoal-muted border border-charcoal/10 rounded-full hover:bg-charcoal/5 transition-colors"
              >
                {c.decline}
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm text-white bg-amber rounded-full hover:bg-amber-600 transition-colors font-medium"
              >
                {c.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
