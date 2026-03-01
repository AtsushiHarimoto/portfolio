'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { type Locale, defaultLocale, locales, getTranslations } from './i18n';

const LOCALE_STORAGE_KEY = 'portfolio-locale';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && locales.some((l) => l.code === stored)) {
      return stored as Locale;
    }
  } catch {}
  return defaultLocale;
}

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslations>;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [hydrated, setHydrated] = useState(false);

  // Restore locale from localStorage after hydration
  useEffect(() => {
    const stored = getInitialLocale();
    setLocaleState(stored);
    document.documentElement.lang = stored === 'zh-tw' ? 'zh-TW' : stored;
    setHydrated(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch {}
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale === 'zh-tw' ? 'zh-TW' : newLocale;
    }
  }, []);

  const t = getTranslations(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {hydrated ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
