import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Archivo, Archivo_Black, IBM_Plex_Mono } from 'next/font/google';

import '@/styles/global.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AppConfig } from '@/utils/AppConfig';

const body = Archivo({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const heading = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-heading',
  display: 'swap',
});

const code = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-code',
  display: 'swap',
});

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={AppConfig.locale}
      className={`${body.variable} ${heading.variable} ${code.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: required for anti-FOUC theme init
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');var theme=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',theme);}catch(e){}`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
