import Link from 'next/link';

import { SectionHeading } from '@/components/SectionHeading';
import siteMetadata from '@/siteMetadata';

async function getGitHubStats(): Promise<{ repos: number; commits: number }> {
  const since = new Date();
  since.setDate(since.getDate() - 90);
  const dateStr = since.toISOString().split('T')[0];

  const fetchOpts = {
    headers: { Accept: 'application/vnd.github+json' },
    next: { revalidate: 86400 } as const,
  };

  const [repoRes, commitRes] = await Promise.allSettled([
    fetch('https://api.github.com/users/patrickjmcd', fetchOpts),
    fetch(
      `https://api.github.com/search/commits?q=author:patrickjmcd+committer-date:>${dateStr}`,
      fetchOpts,
    ),
  ]);

  let repos = 0;
  let commits = 0;

  if (repoRes.status === 'fulfilled' && repoRes.value.ok) {
    const data = await repoRes.value.json();
    repos = data.public_repos ?? 0;
  }

  if (commitRes.status === 'fulfilled' && commitRes.value.ok) {
    const data = await commitRes.value.json();
    commits = data.total_count ?? 0;
  }

  return { repos, commits };
}

const About = async () => {
  const { repos, commits } = await getGitHubStats();

  const stats = [
    { value: '10+', label: 'years writing software', color: 'bg-lemon' },
    {
      value: repos > 0 ? repos.toLocaleString() : '110+',
      label: 'public repos on GitHub',
      color: 'bg-pool',
    },
    { value: '5+', label: 'languages shipped to prod', color: 'bg-mint' },
    {
      value: commits > 0 ? commits.toLocaleString() : '—',
      label: 'public commits, last 90 days',
      color: 'bg-punch',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="01 / About" title="Hey, I'm Patrick." />

        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 items-start">
          <div className="nb-card p-8 text-lg leading-relaxed space-y-5">
            <p>
              I&apos;m a software developer in Kansas City. Most of my work is full-stack web
              development, API design, and IoT systems &mdash; the kind of projects where data
              starts on a sensor somewhere and ends up on a dashboard. At home that looks like
              tracking lake levels and keeping an eye on our utility usage.
            </p>
            <p>
              Away from the keyboard I play music, ride my bike, hang out with my family, and
              occasionally write things down on{' '}
              <Link href="/blog" className="nb-link font-semibold">
                the blog
              </Link>
              .
            </p>
            <p>
              I&apos;m not looking for a new role right now, but I&apos;ll always make time to
              consult on something interesting. If that sounds like your project,{' '}
              <a href={`mailto:${siteMetadata.email}`} className="nb-link font-semibold">
                send me an email
              </a>
              .
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`${stat.color} text-coal border-[3px] border-ink shadow-[4px_4px_0_0_var(--ink)] p-5 flex flex-col-reverse`}
              >
                <dt className="font-mono text-xs font-bold uppercase leading-snug">{stat.label}</dt>
                <dd className="font-display text-4xl leading-none mb-2">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export { About };
