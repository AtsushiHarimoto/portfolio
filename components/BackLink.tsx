'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { useLocale } from '@/lib/locale-context';

function BackLinkInner() {
  const searchParams = useSearchParams();
  const fromHome = searchParams.get('from') === 'home';
  const { t } = useLocale();

  return (
    <Link
      href={fromHome ? '/' : '/projects/'}
      className="inline-flex items-center gap-2 text-sm text-moyin-text-secondary hover:text-moyin-pink transition-colors mb-6"
    >
      <ChevronLeft className="w-4 h-4" strokeWidth={2} />
      {fromHome ? t.demos.shared.backToHome : t.demos.shared.backToProjects}
    </Link>
  );
}

export default function BackLink() {
  return (
    <Suspense
      fallback={
        <Link
          href="/projects/"
          className="inline-flex items-center gap-2 text-sm text-moyin-text-secondary hover:text-moyin-pink transition-colors mb-6"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          &nbsp;
        </Link>
      }
    >
      <BackLinkInner />
    </Suspense>
  );
}
