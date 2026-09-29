import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
      {children}
    </h1>
  );
}
