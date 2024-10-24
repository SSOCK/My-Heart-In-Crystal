'use client';

import React, { Suspense } from 'react';
import Make from './_components';

const MakePage = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Make />
    </Suspense>
  );
};

export default MakePage;
