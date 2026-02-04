const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Design Systems'],
      color: 'from-primary-500 to-secondary-500',
    },
    {
      title: 'Backend',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: ['Go', 'Node.js', 'Python', 'PostgreSQL', 'MySQL'],
      color: 'from-secondary-500 to-accent-orange',
    },
    {
      title: 'DevOps',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      skills: ['Kubernetes', 'Docker', 'AWS', 'GitHub Actions', 'Terraform'],
      color: 'from-accent-orange to-accent-cyan',
    },
    {
      title: 'IoT',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      skills: ['Arduino', 'Raspberry Pi', 'MQTT', 'Home Assistant', 'ESP32'],
      color: 'from-accent-cyan to-accent-emerald',
    },
  ];

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="skill-card group animate-fade-in-up"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} mb-4 text-white`}
              >
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`} />
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
};

export { Skills };
