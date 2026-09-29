import { formatDate } from 'date-fns';

import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/siteMetadata';
import { Leaflet } from '@/utils/RichText';

export default function BlogMain({ posts }: { posts: Leaflet[] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <span className="nb-kicker mb-4">Writing</span>
        <h1 className="font-display text-5xl sm:text-7xl leading-none tracking-tight mb-4">Blog</h1>
        <p className="text-lg text-muted">
          Mirrored from{' '}
          <a
            href={siteMetadata.leafletBase}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-link"
          >
            {siteMetadata.leafletBase.replace(/^https?:\/\//, '')}
          </a>
          .
        </p>
      </header>

      {!posts.length && <p className="nb-card p-6 font-mono">No posts yet.</p>}

      <ul className="space-y-8">
        {posts.map((post) => {
          const { value, date, summary, tags } = post;
          const rkey = post.uri.split('/').pop();
          return (
            <li key={rkey}>
              <article className="nb-card nb-press relative p-6 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <time
                    dateTime={date}
                    className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-ink text-paper"
                  >
                    {date ? formatDate(date, siteMetadata.dateFormat ?? 'MMM d, yyyy') : ''}
                  </time>
                  {tags.map((tag) => (
                    <span key={tag} className="relative z-10">
                      <Tag text={tag} />
                    </span>
                  ))}
                </div>

                <h2 className="font-display text-2xl leading-tight">
                  {/* The ::after stretches this link over the whole card */}
                  <Link href={`/blog/${rkey}`} className="after:absolute after:inset-0">
                    {value.title}
                  </Link>
                </h2>

                {summary && <p className="text-muted leading-relaxed line-clamp-3">{summary}</p>}

                <span className="font-mono text-sm font-bold" aria-hidden="true">
                  Read →
                </span>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
