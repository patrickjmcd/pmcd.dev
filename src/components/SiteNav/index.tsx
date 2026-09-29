'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useState } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/templates/Logo';

const navLinks = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/blog', label: 'Blog' },
];

type SiteNavProps = {
  /** Extra control shown next to the theme toggle, e.g. a download button */
  action?: ReactNode;
};

const SiteNav = ({ action }: SiteNavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isCurrent = (href: string) => !href.startsWith('/#') && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-paper border-b-[3px] border-ink">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="pmcd.dev home"
          className="flex items-center gap-2 font-display text-lg"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-lemon border-2 border-ink text-coal">
            <Logo />
          </span>
          <span className="hidden sm:inline">pmcd.dev</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nb-navlink ${isCurrent(link.href) ? 'bg-ink text-paper' : ''}`}
                  aria-current={isCurrent(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {action}
          <ThemeToggle />
          <button
            type="button"
            className="md:hidden nb-btn nb-btn-plain nb-btn-sm w-9 h-9 p-0"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="md:hidden border-t-[3px] border-ink bg-card">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b-2 border-ink last:border-b-0">
              <Link
                href={link.href}
                className={`block px-4 py-3 font-mono font-bold uppercase tracking-wide hover:bg-lemon hover:text-coal ${isCurrent(link.href) ? 'bg-ink text-paper' : ''}`}
                aria-current={isCurrent(link.href) ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export { SiteNav };
