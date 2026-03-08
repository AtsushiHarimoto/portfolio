'use client';

import { usePathname } from 'next/navigation';
import { LocaleProvider } from '@/lib/locale-context';
import { VfxProvider } from '@/lib/vfx-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SakuraBackground from '@/components/SakuraBackground';
import HomeControls from '@/components/HomeControls';
import dynamic from 'next/dynamic';

const FloatingMiniNav = dynamic(() => import('@/components/webgl/FloatingMiniNav'), { ssr: false });
const WaterRippleHero = dynamic(() => import('@/components/webgl/WaterRippleHero'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <LocaleProvider>
      <VfxProvider>
        {/* Full-page water ripple shader background */}
        <div className="fixed inset-0 z-0">
          <WaterRippleHero />
        </div>
        <SakuraBackground />
        {!isHome && <FloatingMiniNav />}
        {/* Home: show floating controls (lang switcher + VFX toggle) instead of full Header */}
        {isHome && <HomeControls />}
        {!isHome && <Header />}
        <main className={`relative z-10 ${isHome ? '' : 'pt-16'}`}>{children}</main>
        <Footer />
      </VfxProvider>
    </LocaleProvider>
  );
}
