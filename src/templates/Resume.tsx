import Link from 'next/link';

import { AnimatedGradient } from '@/components/AnimatedGradient';
import { ThemeToggle } from '@/components/ThemeToggle';
import siteMetadata from '@/siteMetadata';

import { Logo } from './Logo';

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
};

type ResumeData = {
  name: string;
  contact: string[];
  summary: string;
  experience: ExperienceItem[];
  skillCategories: { label: string; value: string }[];
  education: { degree: string; school: string; date: string };
};

function parseReadme(raw: string): ResumeData {
  // Strip <!-- pdf-exclude --> comments for cleaner display
  const lines = raw
    .replace(/<!--.*?-->/g, '')
    .split('\n')
    .map((l) => l.trimEnd());

  const name = lines[0]?.replace(/^#+\s*/, '') ?? 'Patrick J. McDonagh';

  // Contact line (second non-empty line after title)
  const contactLine = lines.find((l, i) => i > 0 && l.trim() && !l.startsWith('#')) ?? '';
  const contact = contactLine
    .split('·')
    .map((c) => c.trim())
    .filter(Boolean);

  // Extract sections by H2 headers
  const sections: Record<string, string[]> = {};
  let current = '';
  for (const line of lines.slice(2)) {
    if (line.startsWith('## ')) {
      current = line.replace(/^##\s*/, '').trim();
      sections[current] = [];
    } else if (current) {
      sections[current]!.push(line);
    }
  }

  const summary = (sections['Executive Summary'] ?? [])
    .filter((l) => l.trim())
    .join(' ')
    .trim();

  // Parse experience (H3 subsections under "Experience")
  const expLines = sections.Experience ?? [];
  const experience: ExperienceItem[] = [];
  let currentExp: ExperienceItem | null = null;
  for (const line of expLines) {
    if (line.startsWith('### ')) {
      if (currentExp) experience.push(currentExp);
      const titleRaw = line.replace(/^###\s*/, '');
      const [company = '', roleRaw = ''] = titleRaw.split(' — ').map((s) => s.trim());
      // swap: company — role becomes role @ company
      currentExp = {
        title: roleRaw || company,
        company: roleRaw ? company : '',
        period: '',
        location: '',
        bullets: [],
      };
    } else if (currentExp) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (!currentExp.period && /\d{4}/.test(trimmed) && !trimmed.startsWith('-')) {
        const parts = trimmed.split('·').map((p) => p.trim());
        currentExp.period = parts[0] ?? '';
        currentExp.location = parts[1] ?? '';
      } else if (trimmed.startsWith('- ')) {
        currentExp.bullets.push(trimmed.slice(2));
      }
    }
  }
  if (currentExp) experience.push(currentExp);

  // Parse skills (bold label: value format)
  const skillLines = sections['Skills and Domains'] ?? [];
  const skillCategories: { label: string; value: string }[] = [];
  for (const line of skillLines) {
    const match = line.match(/\*\*([^*]+)\*\*[:\s]+(.+)/);
    if (match) {
      skillCategories.push({ label: match[1]!.trim().replace(/:$/, ''), value: match[2]!.trim() });
    }
  }

  // Parse education
  const eduLines = (sections.Education ?? []).filter((l) => l.trim());
  const degree = eduLines[0]?.replace(/^\*\*|\*\*$/g, '') ?? '';
  const schoolLine = eduLines[1] ?? '';
  const [school = '', date = ''] = schoolLine.split('·').map((s) => s.trim());

  return {
    name,
    contact,
    summary,
    experience,
    skillCategories,
    education: { degree, school, date },
  };
}

async function getResumeData(): Promise<ResumeData> {
  const res = await fetch(
    'https://raw.githubusercontent.com/patrickjmcd/patrickjmcd/main/README.md',
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) throw new Error('Failed to fetch resume');
  const raw = await res.text();
  return parseReadme(raw);
}

const Resume = async () => {
  const data = await getResumeData();

  return (
    <AnimatedGradient>
      {/* Nav */}
      <nav className="py-6 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo xl />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/#about"
              className="text-gray-400 hover:text-gray-100 transition-colors hidden sm:block"
            >
              About
            </Link>
            <Link
              href="/#skills"
              className="text-gray-400 hover:text-gray-100 transition-colors hidden sm:block"
            >
              Skills
            </Link>
            <Link
              href="/#projects"
              className="text-gray-400 hover:text-gray-100 transition-colors hidden sm:block"
            >
              Projects
            </Link>
            <Link
              href="https://blog.pmcd.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition-colors hidden sm:block"
            >
              Blog
            </Link>
            <Link
              href={`${siteMetadata.github}/patrickjmcd/raw/main/out/Patrick_McDonagh_Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient text-sm px-5 py-2"
            >
              Download PDF
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center animate-fade-in-up pt-8 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="gradient-text">{data.name}</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center text-gray-400">
              {data.contact.map((item, i) => {
                const hrefMatch = item.match(/\[([^\]]+)\]\(([^)]+)\)/);
                const node = hrefMatch ? (
                  <a
                    key={hrefMatch[1]}
                    href={hrefMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    {hrefMatch[1]}
                  </a>
                ) : (
                  <span key={item}>{item}</span>
                );
                return (
                  <span key={item} className="flex items-center">
                    {i > 0 && <span className="mx-2 text-gray-600">·</span>}
                    {node}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          {data.summary && (
            <section className="glass-card p-8 animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4 text-gray-100">Executive Summary</h2>
              <p className="text-gray-300 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="animate-fade-in-up mt-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-100">
                Work <span className="gradient-text">Experience</span>
              </h2>
              <div className="flex flex-col gap-6">
                {data.experience.map((exp, i) => (
                  <div key={`${exp.company}-${i}`} className="glass-card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100">{exp.title}</h3>
                        {exp.company && (
                          <p className="text-primary-400 font-medium">{exp.company}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-400 shrink-0">
                        <p>{exp.period}</p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    {exp.bullets.length > 0 && (
                      <ul className="space-y-1.5 mt-3">
                        {exp.bullets.map((bullet) => (
                          <li key={bullet} className="text-gray-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 mt-2 shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skillCategories.length > 0 && (
            <section className="animate-fade-in-up mt-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-100">
                Skills &amp; <span className="gradient-text">Domains</span>
              </h2>
              <div className="glass-card p-6 space-y-3">
                {data.skillCategories.map((cat) => (
                  <div key={cat.label} className="flex flex-col sm:flex-row gap-1">
                    <span className="text-gray-100 font-semibold sm:w-48 shrink-0">
                      {cat.label}:
                    </span>
                    <span className="text-gray-300">{cat.value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.degree && (
            <section className="animate-fade-in-up mt-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-100">
                <span className="gradient-text">Education</span>
              </h2>
              <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <p className="text-gray-100 font-semibold">{data.education.degree}</p>
                  <p className="text-gray-400">{data.education.school}</p>
                </div>
                <p className="text-gray-400 text-sm">{data.education.date}</p>
              </div>
            </section>
          )}
        </div>
      </main>
    </AnimatedGradient>
  );
};

export { Resume };
