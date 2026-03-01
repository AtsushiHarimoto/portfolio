'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function BackLinkInner() {
  const searchParams = useSearchParams();
  const fromHome = searchParams.get('from') === 'home';

  return (
    <Link
      href={fromHome ? '/' : '/projects/'}
      className="inline-flex items-center gap-2 text-sm text-moyin-text-secondary hover:text-moyin-pink transition-colors mb-6"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {fromHome ? 'Back to Home' : 'Back to Projects'}
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
      }
    >
      <BackLinkInner />
    </Suspense>
  );
}
