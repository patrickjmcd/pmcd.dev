import Link from 'next/link';

import { SiteNav } from '@/components/SiteNav';
import { SocialLinks } from '@/components/SocialLinks';
import siteMetadata from '@/siteMetadata';

const tickerItems = [
  'Go',
  'TypeScript',
  'Python',
  'Next.js',
  'Kubernetes',
  'MQTT',
  'Home Assistant',
  'ESP32',
  'PostgreSQL',
  'Terraform',
];

const Ticker = () => (
  <div
    className="border-y-[3px] border-ink bg-coal text-[#f3ecdc] overflow-hidden"
    aria-hidden="true"
  >
    <div className="flex w-max animate-marquee py-3 font-mono font-bold uppercase tracking-wider">
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex shrink-0">
          {tickerItems.map((item) => (
            <li key={item} className="flex items-center">
              <span className="px-6">{item}</span>
              <span className="text-lemon">✱</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

const Hero = () => (
  <>
    <SiteNav />
    <section className="px-4 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-12 items-end">
        <div>
          <p className="inline-block mb-6 px-3 py-1 font-mono text-sm font-bold uppercase bg-card border-2 border-ink -rotate-2">
            Kansas City, MO
          </p>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-8">
            Patrick
            <br />
            McDonagh
          </h1>

          <p className="text-xl sm:text-2xl font-semibold mb-4 max-w-2xl">
            Software developer, musician &amp;{' '}
            <span className="inline-block px-2 bg-punch text-coal border-2 border-ink rotate-1">
              emo dad
            </span>
          </p>

          <p className="text-lg text-muted max-w-2xl leading-relaxed mb-10">
            I write backend services, web apps, and the glue that gets data off of little sensors
            and into somewhere useful. Lately that means Go, TypeScript, Kubernetes, and a lot of
            MQTT.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="#projects" className="nb-btn">
              See what I&apos;ve built ↓
            </Link>
            <a href={`mailto:${siteMetadata.email}`} className="nb-btn nb-btn-plain">
              {siteMetadata.email}
            </a>
          </div>
        </div>

        <aside className="nb-card bg-lemon text-coal p-6 w-full lg:w-72 lg:rotate-2">
          <p className="font-mono text-xs font-bold uppercase tracking-wider mb-2">Status</p>
          <p className="font-display text-2xl leading-tight mb-4">Not looking for work.</p>
          <p className="text-sm mb-6">
            But I&apos;m always up for consulting on something interesting &mdash; especially if it
            has a sensor on it.
          </p>
          <div className="on-accent">
            <SocialLinks />
          </div>
        </aside>
      </div>
    </section>
    <Ticker />
  </>
);

export { Hero };
