"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';

const FlagFR = () => (
  <svg viewBox="0 0 3 2" className="flag-icon">
    <rect width="1" height="2" fill="#002395" />
    <rect width="1" height="2" x="1" fill="#FFFFFF" />
    <rect width="1" height="2" x="2" fill="#ED2939" />
  </svg>
);

const FlagUK = () => (
  <svg viewBox="0 0 60 30" className="flag-icon">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'fr' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="locale-switcher-wrapper">
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'var(--accent-glow)' }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLocale}
        className="locale-switcher-premium"
        aria-label={`Switch to ${locale === 'en' ? 'French' : 'English'}`}
      >
        <div className="flag-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={locale}
              initial={{ opacity: 0, y: 10, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -10, rotateX: 90 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="current-flag"
            >
              {locale === 'en' ? <FlagUK /> : <FlagFR />}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <span className="locale-label">
          {locale.toUpperCase()}
        </span>

        <div className="toggle-indicator">
          <motion.div 
            animate={{ x: locale === 'en' ? 0 : 20 }}
            className="toggle-dot"
          />
        </div>
      </motion.button>
    </div>
  );
}
