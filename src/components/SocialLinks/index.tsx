import siteMetadata from '@/siteMetadata';

const links = [
  {
    name: 'GitHub',
    href: siteMetadata.github!,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: siteMetadata.linkedin!,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Bluesky',
    href: siteMetadata.bluesky!,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.2 2.9C7.95 4.97 10.9 9.16 12 11.42c1.1-2.26 4.05-6.45 6.8-8.52 1.98-1.49 5.2-2.65 5.2 1.03 0 .73-.42 6.17-.67 7.05-.86 3.07-3.99 3.85-6.78 3.38 4.87.83 6.1 3.57 3.43 6.32-5.08 5.2-7.3-1.31-7.87-2.98-.1-.3-.15-.45-.15-.33 0-.12-.05.03-.15.33-.57 1.67-2.8 8.18-7.87 2.98-2.67-2.75-1.44-5.49 3.43-6.32-2.79.47-5.92-.31-6.78-3.38C.42 10.1 0 4.66 0 3.93 0 .25 3.22 1.41 5.2 2.9z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    href: `mailto:${siteMetadata.email}`,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path strokeLinecap="square" d="M3 5h18v14H3zM3 5l9 7 9-7" />
      </svg>
    ),
  },
];

const SocialLinks = () => (
  <ul className="flex items-center gap-3">
    {links.map((link) => {
      const external = !link.href.startsWith('mailto');
      return (
        <li key={link.name}>
          <a
            href={link.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="nb-btn nb-btn-plain nb-btn-sm w-10 h-10 p-0"
            aria-label={link.name}
            title={link.name}
          >
            {link.icon}
          </a>
        </li>
      );
    })}
  </ul>
);

export { SocialLinks };
