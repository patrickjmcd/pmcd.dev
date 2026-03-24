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
      <article className="py-12 animate-fade-in">
        {/* Header */}
        <header className="mb-10 space-y-4 text-center max-w-2xl mx-auto">
          <time
            dateTime={date}
            className="block text-sm font-medium text-primary-400 tracking-wide"
          >
            {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
          </time>
          <PageTitle>{content.value.title}</PageTitle>
          {tags?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="border-t border-white/10 pt-10">
          <div className="prose prose-invert max-w-none pb-10">{children}</div>
        </div>

        {/* Comments */}
        {siteMetadata.comments && (
          <div className="border-t border-white/10 py-10 text-center text-gray-400" id="comment">
            <Comments slug={content.rkey} />
          </div>
        )}

        {/* Footer nav */}
        <footer className="border-t border-white/10 pt-8 space-y-6">
          {(next || prev) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev?.rkey && (
                <Link
                  href={`/blog/${prev.rkey}`}
                  className="glass-card p-4 group hover:border-primary-500/30 transition-all duration-300"
                >
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">← Previous</div>
                  <div className="text-sm text-gray-200 group-hover:text-primary-400 transition-colors leading-snug">
                    {prev.value.title}
                  </div>
                </Link>
              )}
              {next?.rkey && (
                <Link
                  href={`/blog/${next.rkey}`}
                  className={`glass-card p-4 group hover:border-primary-500/30 transition-all duration-300 text-right${!prev?.rkey ? ' sm:col-start-2' : ''}`}
                >
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Next →</div>
                  <div className="text-sm text-gray-200 group-hover:text-primary-400 transition-colors leading-snug">
                    {next.value.title}
                  </div>
                </Link>
              )}
            </div>
          )}

          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center gap-1 transition-colors"
            aria-label="Back to the blog"
          >
            ← Back to the blog
          </Link>
        </footer>
      </article>
    </SectionContainer>
  );
}
