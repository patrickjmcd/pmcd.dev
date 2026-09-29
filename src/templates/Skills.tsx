import { SectionHeading } from '@/components/SectionHeading';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Design Systems'],
    color: 'bg-pool',
  },
  {
    title: 'Backend',
    skills: ['Go', 'Node.js', 'Python', 'PostgreSQL', 'MySQL'],
    color: 'bg-mint',
  },
  {
    title: 'DevOps',
    skills: ['Kubernetes', 'Docker', 'AWS', 'GitHub Actions', 'Terraform'],
    color: 'bg-lilac',
  },
  {
    title: 'IoT',
    skills: ['Arduino', 'Raspberry Pi', 'MQTT', 'Home Assistant', 'ESP32'],
    color: 'bg-tang',
  },
];

const Skills = () => (
  <section id="skills" className="py-24 px-4 scroll-mt-16 border-t-[3px] border-ink">
    <div className="max-w-6xl mx-auto">
      <SectionHeading kicker="02 / Toolbox" title="What I work with" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category) => (
          <div key={category.title} className="nb-card">
            <h3
              className={`${category.color} text-coal font-display text-xl px-5 py-3 border-b-[3px] border-ink`}
            >
              {category.title}
            </h3>
            <ul className="p-5 space-y-2 font-mono text-sm">
              {category.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-ink shrink-0" aria-hidden="true" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export { Skills };
