import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      title: 'Notion to Things3',
      description:
        'Bridge between Notion and Things3 that keeps tasks in sync across both platforms.',
      tags: ['Python', 'Notion', 'Automation'],
      link: 'https://github.com/patrickjmcd/notion-to-things3',
      gradient: 'from-primary-500 to-accent-orange',
    },
    {
      title: 'Table Rock Lake Level',
      description:
        'Live and historical water level data for Table Rock Lake, visualized in the browser.',
      tags: ['Next.js', 'TypeScript', 'Vercel'],
      link: 'https://github.com/patrickjmcd/table-rock-lake-level',
      homepage: 'https://table-rock-lake-level.vercel.app',
      gradient: 'from-accent-cyan to-primary-500',
    },
    {
      title: 'KC Utilities',
      description:
        'Scrapes KCPL and KC Water usage data and pipes it into InfluxDB for dashboarding.',
      tags: ['Python', 'InfluxDB', 'IoT'],
      link: 'https://github.com/patrickjmcd/kc-utilities',
      gradient: 'from-primary-500 to-secondary-500',
    },
    {
      title: 'The Irish Aires',
      description:
        'Website for my dad\'s St. Louis-based Irish music band.',
      tags: ['TypeScript', 'Next.js', 'Vercel'],
      link: 'https://github.com/patrickjmcd/the-irish-aires',
      homepage: 'https://the-irish-aires.vercel.app',
      gradient: 'from-accent-emerald to-secondary-500',
    },
    {
      title: 'SSD Farms',
      description:
        'Website for our storage facility in Shell Knob, MO.',
      tags: ['TypeScript', 'Next.js', 'Vercel'],
      link: 'https://github.com/patrickjmcd/ssd-farms',
      homepage: 'https://ssd-farms.vercel.app',
      gradient: 'from-accent-emerald to-accent-cyan',
    },
    {
      title: 'Epoch Convert',
      description:
        'Tiny CLI tool for converting epoch timestamps. Faster than googling it.',
      tags: ['Go', 'CLI'],
      link: 'https://github.com/patrickjmcd/epoch-convert',
      gradient: 'from-accent-orange to-accent-cyan',
    },
    {
      title: 'MLB Magic Numbers',
      description:
        'Crunches the numbers to show how close every MLB team is to clinching.',
      tags: ['Python', 'Sports'],
      link: 'https://github.com/patrickjmcd/mlb-magic-numbers',
      gradient: 'from-accent-cyan to-accent-emerald',
    },
    {
      title: 'KC Water',
      description:
        'Python library for programmatically reading Kansas City water usage data.',
      tags: ['Python', 'API'],
      link: 'https://github.com/patrickjmcd/kcwater',
      gradient: 'from-secondary-500 to-accent-orange',
    },
  ];

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of projects I&apos;ve worked on
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.title}
              href={project.homepage || project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient top border */}
              <div
                className={`h-1 bg-gradient-to-r ${project.gradient}`}
              />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <svg
                    className="w-5 h-5 text-gray-500 group-hover:text-primary-400 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-dark-300/80 text-gray-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <Link
            href="https://github.com/patrickjmcd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>View more on GitHub</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export { Projects };
