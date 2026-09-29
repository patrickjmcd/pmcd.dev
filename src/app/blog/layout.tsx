import { SiteNav } from '@/components/SiteNav';
import { Footer } from '@/templates/Footer';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="pb-24">{children}</main>
      <Footer />
    </>
  );
}
