import Link from 'next/link';

import { AnimatedGradient } from '@/components/AnimatedGradient';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnimatedGradient>
      <nav className="py-5 px-4 sticky top-0 z-50 bg-dark-400/70 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto xl:max-w-5xl xl:px-0 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              PMcD
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-200 font-medium">Blog</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>
      <main className="pb-24">{children}</main>
    </AnimatedGradient>
  );
}
