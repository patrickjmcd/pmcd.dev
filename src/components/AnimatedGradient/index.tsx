import type { ReactNode } from 'react';

type IAnimatedGradientProps = {
  children: ReactNode;
};

const AnimatedGradient = (props: IAnimatedGradientProps) => (
  <div className="relative min-h-screen overflow-hidden bg-dark-400">
    {/* Main animated gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-dark-400 to-secondary-900/30 animate-gradient-xy" />

    {/* Floating gradient orbs */}
    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-float" />
    <div className="absolute top-1/2 -right-20 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl animate-float-delayed" />
    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent-orange/10 rounded-full blur-3xl animate-float" />

    {/* Subtle grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }}
    />

    {/* Content */}
    <div className="relative z-10">{props.children}</div>
  </div>
);

export { AnimatedGradient };
