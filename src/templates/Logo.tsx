import Image from 'next/image';

import { AppConfig } from '@/utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '156' : '64';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <span className={`inline-flex items-center text-white ${fontStyle}`}>
      <Image
        src="/images/logo/pmcd_logo_dark_transparent.svg"
        alt="PMCD LLC Logo"
        width={Number(size)}
        height={Number(size)}
        className="mr-2"
      />
      <span className="gradient-text">{AppConfig.site_name}</span>
    </span>
  );
};

export { Logo };
