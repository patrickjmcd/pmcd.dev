'use client';

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({ theme: 'light', setTheme: () => {} });

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const readStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem('theme');
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const apply = (t: Theme) => {
      setThemeState(t);
      document.documentElement.setAttribute('data-theme', t);
    };

    apply(readStoredTheme() ?? getSystemTheme());

    // Follow the OS setting until the visitor picks a theme themselves
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (!readStoredTheme()) apply(e.matches ? 'dark' : 'light');
    };

    // Keep other tabs in sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && isTheme(e.newValue)) apply(e.newValue);
    };

    mq.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
    return () => {
      mq.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.setAttribute('data-theme', t);
    try {
      localStorage.setItem('theme', t);
    } catch {}
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
