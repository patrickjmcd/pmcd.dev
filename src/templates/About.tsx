const About = () => {
  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '15+', label: 'Technologies' },
    { value: '100%', label: 'Passion' },
  ];

  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building digital experiences that make a difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Card */}
          <div className="glass-card p-8 animate-fade-in-up">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Hello! I&apos;m Patrick McDonagh
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              I&apos;m a software developer based in Kansas City, MO with a passion for
              building elegant solutions to complex problems. I specialize in
              full-stack development, API design, and IoT systems &mdash; from
              tracking lake levels to monitoring utility usage.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              When I&apos;m not coding, you can find me playing music, riding my
              bike, spending time with my family, or writing on my{' '}
              <a
                href="https://blog.pmcd.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                blog
              </a>
              .
            </p>
            <p className="text-gray-300 leading-relaxed">
              I&apos;m currently available for consulting opportunities and exciting
              new projects. Let&apos;s build something amazing together!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };
