import { ReactNode } from 'react';
import Comments from '@/components/Comments';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import Tag from '@/components/Tag';
import siteMetadata from '@/siteMetadata';
import { Leaflet } from '@/utils/RichText';

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  content: Leaflet;
  authorDetails?: unknown[];
  next?: {
    rkey: string;
    value: { title: string };
  };
  prev?: {
    rkey: string;
    value: { title: string };
  };
  children: ReactNode;
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const date = content.value.publishedAt ?? content.date ?? '';
  const tags = content.tags ?? [];

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="py-16">
        <header className="mb-12 space-y-5">
          <time
            dateTime={date}
            className="inline-block font-mono text-xs font-bold uppercase px-2 py-1 bg-lemon text-coal border-2 border-ink"
          >
            {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
          </time>
          <PageTitle>{content.value.title}</PageTitle>
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
        </header>

        <div className="border-t-[3px] border-ink pt-10 pb-12">{children}</div>

        {siteMetadata.comments && (
          <div className="border-t-[3px] border-ink py-10 text-center" id="comment">
            <Comments slug={content.rkey} />
          </div>
        )}

        <footer className="border-t-[3px] border-ink pt-10 space-y-8">
          {(next || prev) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prev?.rkey && (
                <Link href={`/blog/${prev.rkey}`} className="nb-card nb-press p-5">
                  <div className="font-mono text-xs font-bold uppercase mb-2">← Previous</div>
                  <div className="font-display leading-snug">{prev.value.title}</div>
                </Link>
              )}
              {next?.rkey && (
                <Link
                  href={`/blog/${next.rkey}`}
                  className={`nb-card nb-press p-5 text-right${!prev?.rkey ? ' sm:col-start-2' : ''}`}
                >
                  <div className="font-mono text-xs font-bold uppercase mb-2">Next →</div>
                  <div className="font-display leading-snug">{next.value.title}</div>
                </Link>
              )}
            </div>
          )}

          <Link href="/blog" className="nb-btn nb-btn-plain nb-btn-sm">
            ← All posts
          </Link>
        </footer>
      </article>
    </SectionContainer>
  );
}
