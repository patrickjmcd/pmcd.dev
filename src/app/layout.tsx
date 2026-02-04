import type { Metadata } from 'next';

import '@/styles/global.css';
import { AppConfig } from '@/utils/AppConfig';

export const metadata: Metadata = {
  title: AppConfig.title,
  description: AppConfig.description,
  icons: {
    icon: [
      { url: '/images/logo/favicon.ico' },
      { url: '/images/logo/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/logo/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: AppConfig.title,
    description: AppConfig.description,
    url: AppConfig.deployedURL,
    siteName: AppConfig.site_name,
    locale: AppConfig.locale,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={AppConfig.locale}>
      <body>{children}</body>
    </html>
  );
}
