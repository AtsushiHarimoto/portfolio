'use client';

import { usePathname } from 'next/navigation';
import { LocaleProvider } from '@/lib/locale-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SakuraBackground from '@/components/SakuraBackground';
import dynamic from 'next/dynamic';

const FloatingMiniNav = dynamic(() => import('@/components/webgl/FloatingMiniNav'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <LocaleProvider>
      <SakuraBackground />
      {!isHome && <FloatingMiniNav />}
      {!isHome && <Header />}
      <main className={`relative z-10 ${isHome ? '' : 'pt-16'}`}>{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
