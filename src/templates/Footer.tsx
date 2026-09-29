import Link from 'next/link';

import siteMetadata from '@/siteMetadata';

const Footer = () => (
  <footer className="on-ink border-t-[3px] border-ink bg-ink text-paper px-4 py-8">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between font-mono text-sm">
      <p>&copy; {new Date().getFullYear()} Patrick McDonagh</p>
      <nav className="flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/resume" className="hover:text-lemon">
          Resume
        </Link>
        <Link href="/blog" className="hover:text-lemon">
          Blog
        </Link>
        <a
          href={siteMetadata.siteRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-lemon"
        >
          Source
        </a>
      </nav>
    </div>
  </footer>
);

export { Footer };
