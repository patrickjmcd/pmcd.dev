import Link from 'next/link';

import { SectionHeading } from '@/components/SectionHeading';
import siteMetadata from '@/siteMetadata';

const Projects = () => {
  const projects = [
    {
      title: 'Notion to Things3',
      description:
        'Bridge between Notion and Things3 that keeps tasks in sync across both platforms.',
      tags: ['Python', 'Notion', 'Automation'],
      link: 'https://github.com/patrickjmcd/notion-to-things3',
      color: 'bg-lemon',
    },
    {
      title: 'Table Rock Lake Level',
      description:
        'Live and historical water level data for Table Rock Lake, visualized in the browser.',
      tags: ['Next.js', 'TypeScript', 'Vercel'],
      link: 'https://github.com/patrickjmcd/table-rock-lake-level',
      homepage: 'https://table-rock-lake-level.vercel.app',
      color: 'bg-pool',
    },
    {
      title: 'KC Utilities',
      description:
        'Scrapes KCPL and KC Water usage data and pipes it into InfluxDB for dashboarding.',
      tags: ['Python', 'InfluxDB', 'IoT'],
      link: 'https://github.com/patrickjmcd/kc-utilities',
      color: 'bg-mint',
    },
    {
      title: 'The Irish Aires',
      description: "Website for my dad's St. Louis-based Irish music band.",
      tags: ['TypeScript', 'Next.js', 'Vercel'],
      link: 'https://github.com/patrickjmcd/the-irish-aires',
      homepage: 'https://the-irish-aires.vercel.app',
      color: 'bg-punch',
    },
    {
      title: 'SSD Farms',
      description: 'Website for our storage facility in Shell Knob, MO.',
      tags: ['TypeScript', 'Next.js', 'Vercel'],
      link: 'https://github.com/patrickjmcd/ssd-farms',
      homepage: 'https://ssd-farms.vercel.app',
      color: 'bg-lilac',
    },
    {
      title: 'Epoch Convert',
      description: 'Tiny CLI tool for converting epoch timestamps. Faster than googling it.',
      tags: ['Go', 'CLI'],
      link: 'https://github.com/patrickjmcd/epoch-convert',
      color: 'bg-tang',
    },
    {
      title: 'MLB Magic Numbers',
      description: 'Crunches the numbers to show how close every MLB team is to clinching.',
      tags: ['Python', 'Sports'],
      link: 'https://github.com/patrickjmcd/mlb-magic-numbers',
      color: 'bg-pool',
    },
    {
      title: 'KC Water',
      description: 'Python library for programmatically reading Kansas City water usage data.',
      tags: ['Python', 'API'],
      link: 'https://github.com/patrickjmcd/kcwater',
      color: 'bg-mint',
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 scroll-mt-16 border-t-[3px] border-ink">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="03 / Projects" title="Stuff I've built">
          Side projects, small tools, and a couple of sites for family.
        </SectionHeading>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const href = project.homepage || project.link;
            return (
              <Link
                key={project.title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-card nb-press group flex flex-col"
              >
                <div
                  className={`${project.color} text-coal flex items-center justify-between gap-4 px-5 py-3 border-b-[3px] border-ink`}
                >
                  <h3 className="font-display text-xl leading-tight">{project.title}</h3>
                  <span
                    className="font-display text-2xl leading-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-4 flex-1">
                  <p className="leading-relaxed">{project.description}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <ul className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag} className="nb-chip">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <span className="font-mono text-xs text-muted truncate">
                      {href.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12">
          <Link
            href={siteMetadata.github!}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-btn nb-btn-plain"
          >
            More on GitHub →
          </Link>
        </div>
      </div>
    </section>
  );
};

export { Projects };
