import type { ReactNode } from 'react';

import { SiteNav } from '@/components/SiteNav';
import siteMetadata from '@/siteMetadata';

import { Footer } from './Footer';

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

const pdfUrl = `${siteMetadata.github}/patrickjmcd/raw/main/out/Patrick_McDonagh_Resume.pdf`;

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <h2 className="flex items-center gap-4 mb-6">
    <span className="nb-kicker">{children}</span>
    <span className="flex-1 border-t-[3px] border-ink" aria-hidden="true" />
  </h2>
);

const Resume = async () => {
  const data = await getResumeData();

  return (
    <>
      <SiteNav
        action={
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-btn nb-btn-sm hidden sm:inline-flex"
          >
            PDF ↓
          </a>
        }
      />

      <main className="px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto space-y-14">
          {/* Header */}
          <header>
            <h1 className="font-display text-4xl sm:text-6xl leading-none tracking-tight mb-6">
              {data.name}
            </h1>
            <ul className="flex flex-wrap gap-2">
              {data.contact.map((item) => {
                const hrefMatch = item.match(/\[([^\]]+)\]\(([^)]+)\)/);
                return (
                  <li key={item} className="nb-chip text-sm">
                    {hrefMatch ? (
                      <a
                        href={hrefMatch[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {hrefMatch[1]}
                      </a>
                    ) : (
                      item
                    )}
                  </li>
                );
              })}
            </ul>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nb-btn nb-btn-sm mt-6 sm:hidden"
            >
              Download PDF ↓
            </a>
          </header>

          {/* Summary */}
          {data.summary && (
            <section>
              <SectionLabel>Summary</SectionLabel>
              <p className="nb-card bg-lemon text-coal p-6 text-lg leading-relaxed">
                {data.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <SectionLabel>Experience</SectionLabel>
              <ol className="space-y-6">
                {data.experience.map((exp, i) => (
                  <li key={`${exp.company}-${i}`} className="nb-card">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-6 py-4 border-b-[3px] border-ink">
                      <div>
                        <h3 className="font-display text-xl leading-tight">{exp.title}</h3>
                        {exp.company && <p className="font-semibold">{exp.company}</p>}
                      </div>
                      <div className="font-mono text-xs sm:text-right shrink-0">
                        <p className="inline-block px-2 py-0.5 bg-ink text-paper font-bold">
                          {exp.period}
                        </p>
                        {exp.location && <p className="mt-1 text-muted">{exp.location}</p>}
                      </div>
                    </div>
                    {exp.bullets.length > 0 && (
                      <ul className="px-6 py-5 space-y-2">
                        {exp.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 leading-relaxed">
                            <span className="w-2 h-2 mt-2.5 bg-tang shrink-0" aria-hidden="true" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Skills */}
          {data.skillCategories.length > 0 && (
            <section>
              <SectionLabel>Skills</SectionLabel>
              <dl className="nb-card divide-y-2 divide-ink">
                {data.skillCategories.map((cat) => (
                  <div
                    key={cat.label}
                    className="flex flex-col sm:flex-row gap-1 sm:gap-6 px-6 py-3"
                  >
                    <dt className="font-mono text-sm font-bold uppercase sm:w-48 shrink-0 pt-0.5">
                      {cat.label}
                    </dt>
                    <dd>{cat.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Education */}
          {data.education.degree && (
            <section>
              <SectionLabel>Education</SectionLabel>
              <div className="nb-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="font-display text-lg">{data.education.degree}</p>
                  <p className="text-muted">{data.education.school}</p>
                </div>
                <p className="font-mono text-sm">{data.education.date}</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export { Resume };
