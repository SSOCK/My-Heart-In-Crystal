'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Make = dynamic(() => import('@/app/(protected)/make/_components'), {
  ssr: false,
});

const MakePage = () => {
  return (
    <Suspense fallback={null}>
      <Make />
    </Suspense>
  );
};

export default MakePage;
