'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import CheckAuth from '../_provider/CheckAuth';

const Make = dynamic(() => import('@/app/(protected)/make/_components/index'), {
  ssr: false,
});

const MakePage = () => {
  return (
    <CheckAuth>
      <Suspense fallback={null}>
        <Make />
      </Suspense>
    </CheckAuth>
  );
};

export default MakePage;
