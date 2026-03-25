'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'dark' | 'claude';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({ theme: 'dark', setTheme: () => {} });

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'claude' : 'dark';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const initial = saved === 'claude' || saved === 'dark' ? saved : getSystemTheme();
    setThemeState(initial);
    document.documentElement.setAttribute('data-theme', initial);

    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const next: Theme = e.matches ? 'claude' : 'dark';
        setThemeState(next);
        document.documentElement.setAttribute('data-theme', next);
      }
    };
    mq.addEventListener('change', onSystemChange);
    return () => mq.removeEventListener('change', onSystemChange);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    document.documentElement.setAttribute('data-theme', t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
