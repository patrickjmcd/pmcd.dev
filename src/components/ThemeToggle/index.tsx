'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'claude';

const MoonIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
  </svg>
);

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch {}
}

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const getSystemTheme = (): Theme =>
      window.matchMedia('(prefers-color-scheme: light)').matches ? 'claude' : 'dark';

    // Read persisted theme on mount, fall back to system preference
    let initial: Theme = 'dark';
    try {
      const stored = localStorage.getItem('theme');
      initial = stored === 'claude' || stored === 'dark' ? stored : getSystemTheme();
    } catch {
      initial = getSystemTheme();
    }
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);

    // Sync with other toggles on the same page via storage events
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'claude')) {
        setTheme(e.newValue);
        document.documentElement.setAttribute('data-theme', e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);

    // Follow system preference when no manual override is set
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onSystemChange = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem('theme')) {
          const next: Theme = e.matches ? 'claude' : 'dark';
          setTheme(next);
          document.documentElement.setAttribute('data-theme', next);
        }
      } catch {}
    };
    mq.addEventListener('change', onSystemChange);

    return () => {
      window.removeEventListener('storage', onStorage);
      mq.removeEventListener('change', onSystemChange);
    };
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'claude' ? 'dark' : 'claude';
    setTheme(next);
    applyTheme(next);
  };

  const isClaude = theme === 'claude';

  return (
    <button
      type="button"
      onClick={toggle}
      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
      aria-label={`Switch to ${isClaude ? 'dark' : 'Claude'} theme`}
      title={`Switch to ${isClaude ? 'Dark' : 'Claude'} theme`}
    >
      {isClaude ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
