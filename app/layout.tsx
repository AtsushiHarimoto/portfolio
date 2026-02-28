import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: {
    default: 'Atsushi Harimoto | Full-Stack Developer & AI Engineer',
    template: '%s | Atsushi Harimoto',
  },
  description:
    'Portfolio of Atsushi Harimoto - Full-Stack Developer & AI Engineer specializing in Vue, React, TypeScript, Python, FastAPI, and LLM integration. Based in Japan.',
  keywords: [
    'Atsushi Harimoto',
    '張本敦',
    'Full-Stack Developer',
    'AI Engineer',
    'フルスタック開発者',
    'AIエンジニア',
    'Vue.js',
    'React',
    'TypeScript',
    'Python',
    'FastAPI',
    'LLM',
    'Software Engineer Japan',
    'ソフトウェアエンジニア',
    'ポートフォリオ',
  ],
  authors: [{ name: 'Atsushi Harimoto' }],
  creator: 'Atsushi Harimoto',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ja_JP', 'zh_TW'],
    url: 'https://atsushiharimoto.github.io/portfolio/',
    siteName: 'Atsushi Harimoto Portfolio',
    title: 'Atsushi Harimoto | Full-Stack Developer & AI Engineer',
    description:
      'Full-Stack Developer & AI Engineer building creative software with Vue, React, TypeScript, Python, and LLM integration.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atsushi Harimoto | Full-Stack Developer & AI Engineer',
    description:
      'Full-Stack Developer & AI Engineer building creative software with Vue, React, TypeScript, Python, and LLM integration.',
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://atsushiharimoto.github.io/portfolio'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/portfolio/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1a1625" />
      </head>
      <body className="min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
