'use client';

import { LocaleProvider } from '@/lib/locale-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SakuraBackground from '@/components/SakuraBackground';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <SakuraBackground />
      <Header />
      <main className="relative z-10 pt-16">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
