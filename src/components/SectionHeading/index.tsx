import type { ReactNode } from 'react';

type SectionHeadingProps = {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
};

const SectionHeading = ({ kicker, title, children }: SectionHeadingProps) => (
  <div className="mb-12">
    <span className="nb-kicker mb-4">{kicker}</span>
    <h2 className="font-display text-4xl md:text-6xl leading-none tracking-tight">{title}</h2>
    {children && <p className="mt-4 text-lg text-muted max-w-2xl">{children}</p>}
  </div>
);

export { SectionHeading };
