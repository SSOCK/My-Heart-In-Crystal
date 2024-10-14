import React from 'react';

import MakeCanvas from '@/app/(protected)/make/_components/MakeCanvas';
import UISection from '@/shared/components/ui/UISection';

import PreviousButton from '@/shared/components/ui/PreviousButton';

const MakePage = () => {
  return (
    <>
      <PreviousButton />
      <UISection>
        <div className="bg-gray-300">꾸미기</div>
        <div className="bg-gray-300">꾸며주세욤</div>
        <div className="fixed right-0 w-1/4 bg-gray-300 md:w-1/3">
          꾸미기 사이드바
        </div>
      </UISection>
      <MakeCanvas />
    </>
  );
};

export default MakePage;
