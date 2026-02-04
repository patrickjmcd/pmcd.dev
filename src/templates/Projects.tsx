import Link from 'next/link';

const Projects = () => {
  const projects = [
    {
      title: 'Table Rock Lake Level',
      description:
        'Next.js site to display the current and historical levels of Table Rock Lake.',
      tags: ['Next.js', 'TypeScript', 'Vercel'],
      link: 'https://github.com/patrickjmcd/table-rock-lake-level',
      homepage: 'https://table-rock-lake-level.vercel.app',
      gradient: 'from-accent-cyan to-primary-500',
    },
    {
      title: 'SSD Farms',
      description:
        'Website for SSD Farms, built with TypeScript and deployed on Vercel.',
      tags: ['TypeScript', 'Next.js', 'Vercel'],
      link: 'https://github.com/patrickjmcd/ssd-farms',
      homepage: 'https://ssd-farms.vercel.app',
      gradient: 'from-accent-emerald to-accent-cyan',
    },
    {
      title: 'The Irish Aires',
      description:
        'Website for The Irish Aires, a music group. Built with TypeScript and deployed on Vercel.',
      tags: ['TypeScript', 'Next.js', 'Vercel'],
      link: 'https://github.com/patrickjmcd/the-irish-aires',
      homepage: 'https://the-irish-aires.vercel.app',
      gradient: 'from-accent-emerald to-secondary-500',
    },
    {
      title: 'KC Utilities',
      description:
        'Tool to grab KCPL and KC Water data and store it in InfluxDB for monitoring and visualization.',
      tags: ['Python', 'InfluxDB', 'IoT'],
      link: 'https://github.com/patrickjmcd/kc-utilities',
      gradient: 'from-primary-500 to-secondary-500',
    },
    {
      title: 'KC Water',
      description:
        'Python utility to read Kansas City Water usage data programmatically.',
      tags: ['Python', 'API', 'Utilities'],
      link: 'https://github.com/patrickjmcd/kcwater',
      gradient: 'from-secondary-500 to-accent-orange',
    },
    {
      title: 'Epoch Convert',
      description:
        'Simple CLI utility to convert an epoch timestamp or print the current time.',
      tags: ['Go', 'CLI', 'Utilities'],
      link: 'https://github.com/patrickjmcd/epoch-convert',
      gradient: 'from-accent-orange to-accent-cyan',
    },
    {
      title: 'MLB Magic Numbers',
      description:
        'Calculates the magic number for all MLB teams to track playoff clinching scenarios.',
      tags: ['Python', 'MLB', 'Sports'],
      link: 'https://github.com/patrickjmcd/mlb-magic-numbers',
      gradient: 'from-accent-cyan to-accent-emerald',
    },
    {
      title: 'Notion to Things3',
      description:
        'Sync tasks from Notion to Things3 for seamless task management across platforms.',
      tags: ['Python', 'Notion', 'Automation'],
      link: 'https://github.com/patrickjmcd/notion-to-things3',
      gradient: 'from-primary-500 to-accent-orange',
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
            <div
              key={project.title}
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
                  <div className="flex items-center gap-3">
                    {project.homepage && (
                      <Link
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-accent-cyan transition-colors"
                        aria-label={`Visit ${project.title} live site`}
                      >
                        <svg
                          className="w-5 h-5"
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
                      </Link>
                    )}
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-primary-400 transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                    </Link>
                  </div>
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
            </div>
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
