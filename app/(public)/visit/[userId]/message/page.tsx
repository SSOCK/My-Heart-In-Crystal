'use client';

import dynamic from 'next/dynamic';

import { useState, useEffect, Suspense } from 'react';

import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';

const Make = dynamic(
  () => import('@/app/(public)/visit/_components/_make/Make'),
  {
    ssr: false,
  }
);

const VisitMakePage = ({ params }: { params: { userId: string } }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { resetModel } = use3DModel();

  useEffect(() => {
    setIsMounted(true);

    return () => {
      resetModel();
    };
  }, []);

  if (!isMounted) return null;

  return (
    <Suspense fallback={null}>
      <Make userId={params.userId} />
    </Suspense>
  );
};

export default VisitMakePage;
