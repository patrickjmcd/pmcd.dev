import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="gradient-text text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
      {children}
    </h1>
  );
}
