import Link from 'next/link';

import { Logo } from './Logo';

const Hero = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/patrickjmcd',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/patrickmcdonagh',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:me@pmcd.dev',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="py-6 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo xl />
          <div className="flex items-center gap-6">
            <Link
              href="#about"
              className="text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Skills
            </Link>
            <Link
              href="#projects"
              className="text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Projects
            </Link>
            <Link
              href="https://blog.pmcd.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors hidden sm:block"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="btn-gradient text-sm px-5 py-2"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating shapes */}
          <div className="absolute top-1/3 left-10 w-4 h-4 bg-primary-500 rounded-full animate-float opacity-60 hidden lg:block" />
          <div className="absolute top-1/2 right-16 w-3 h-3 bg-secondary-500 rounded-full animate-float-delayed opacity-60 hidden lg:block" />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-accent-orange rounded-full animate-float opacity-60 hidden lg:block" />

          <div className="animate-fade-in-up">
            <p className="text-primary-400 font-medium mb-4 tracking-wide">
              Software Developer, Musician & Emo Dad
            </p>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up animate-delay-100">
            Hi, I&apos;m{' '}
            <span className="gradient-text">Patrick McDonagh</span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            I build elegant solutions to complex problems. Specializing in
            full-stack development, API design, and IoT systems in Kansas City, MO.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up animate-delay-300">
            <Link href="#projects" className="btn-gradient">
              View My Work
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 animate-fade-in-up animate-delay-400">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-gray-500 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <Link href="#about" className="text-gray-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export { Hero };
