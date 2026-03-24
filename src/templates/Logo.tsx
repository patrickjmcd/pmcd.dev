import { AppConfig } from '@/utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = ({ xl }: ILogoProps) => {
  const size = xl ? 64 : 44;

  return (
    <span className="inline-flex items-center" role="img" aria-label={AppConfig.site_name}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Grid */}
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        {/* Stem */}
        <rect x="28" y="28" width="8" height="8" fill="var(--logo-color-1)" />
        <rect x="28" y="36" width="8" height="8" fill="var(--logo-color-1)" />
        <rect x="28" y="44" width="8" height="8" fill="var(--logo-color-1)" />
        <rect x="28" y="52" width="8" height="8" fill="var(--logo-color-1)" />
        <rect x="28" y="60" width="8" height="8" fill="var(--logo-color-1)" />
        <rect x="28" y="68" width="8" height="8" fill="var(--logo-color-1)" />
        {/* Curved top */}
        <rect x="36" y="28" width="8" height="8" fill="var(--logo-color-2)" />
        <rect x="44" y="28" width="8" height="8" fill="var(--logo-color-2)" />
        <rect x="52" y="28" width="8" height="8" fill="var(--logo-color-2)" />
        <rect x="60" y="36" width="8" height="8" fill="var(--logo-color-2)" />
        <rect x="60" y="44" width="8" height="8" fill="var(--logo-color-2)" />
        <rect x="52" y="52" width="8" height="8" fill="var(--logo-color-2)" />
        <rect x="44" y="52" width="8" height="8" fill="var(--logo-color-2)" />
        <rect x="36" y="52" width="8" height="8" fill="var(--logo-color-2)" />
        {/* Terminal cursor */}
        <rect x="70" y="70" width="10" height="3" fill="currentColor" opacity="0.8" />
      </svg>
    </span>
  );
};

export { Logo };
