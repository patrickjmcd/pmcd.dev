import { formatDate } from 'date-fns';

import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/siteMetadata';
import { Leaflet } from '@/utils/RichText';

const MAX_DISPLAY = 5;

export default function BlogMain({ posts }: { posts: Leaflet[] }) {
  return (
    <div className="max-w-3xl mx-auto xl:max-w-5xl xl:px-0 px-4 py-16">
      <div className="mb-12 animate-fade-in">
        <h1 className="gradient-text text-5xl font-bold mb-4">Blog</h1>
        <p className="text-lg text-gray-400">{siteMetadata.description}</p>
      </div>

      <ul className="space-y-6">
        {!posts.length && (
          <p className="text-gray-500">No posts found.</p>
        )}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { value, date, summary, tags } = post;
          const rkey = post.uri.split('/').pop();
          return (
            <li key={rkey} className="animate-fade-in-up">
              <article className="glass-card p-6 hover:border-primary-500/30 transition-all duration-300 group">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <time dateTime={date} className="text-primary-400 font-medium">
                      {date ? formatDate(date, siteMetadata.dateFormat ?? 'MMMM d, yyyy') : ''}
                    </time>
                    {tags.length > 0 && (
                      <>
                        <span className="text-gray-600">·</span>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl font-bold leading-snug">
                    <Link
                      href={`/blog/${rkey}`}
                      className="text-gray-100 group-hover:text-primary-400 transition-colors duration-300"
                    >
                      {value.title}
                    </Link>
                  </h2>

                  {summary && (
                    <p className="text-gray-400 leading-relaxed text-sm line-clamp-3">
                      {summary}
                    </p>
                  )}

                  <Link
                    href={`/blog/${rkey}`}
                    className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center gap-1 transition-colors w-fit"
                    aria-label={`Read more: "${value.title}"`}
                  >
                    Read more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end mt-8">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-400 text-sm font-medium flex items-center gap-1 transition-colors"
            aria-label="All posts"
          >
            All Posts <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </div>
  );
}
