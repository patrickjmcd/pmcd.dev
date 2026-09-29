import { AppConfig } from '@/utils/AppConfig';

type ILogoProps = {
  size?: number;
};

// Pixel "P" with a terminal cursor. Stem uses currentColor so it follows
// whatever text color the container sets.
const Logo = ({ size = 28 }: ILogoProps) => (
  <span className="inline-flex items-center" role="img" aria-label={AppConfig.site_name}>
    <svg
      width={size}
      height={size}
      viewBox="24 24 60 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="28" y="28" width="8" height="48" fill="currentColor" />
      <rect x="36" y="28" width="24" height="8" fill="var(--logo-color-2)" />
      <rect x="60" y="36" width="8" height="16" fill="var(--logo-color-2)" />
      <rect x="36" y="52" width="24" height="8" fill="var(--logo-color-2)" />
      <rect x="68" y="70" width="12" height="6" fill="currentColor" />
    </svg>
  </span>
);

export { Logo };
