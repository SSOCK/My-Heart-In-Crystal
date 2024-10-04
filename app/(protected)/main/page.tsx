import React from 'react';

import CrystalCanvas from '@/shared/components/canvas/CrystalCanvas';
import UISection from '@/shared/components/ui/UISection';

import PreviousButton from '@/shared/components/ui/PreviousButton';
import UserHeader from '@/shared/components/ui/UserHeader';

const MainPage = () => {
  return (
    <>
      <PreviousButton />
      <UISection>
        <UserHeader user="김부캠" />
      </UISection>
      <CrystalCanvas />
    </>
  );
};

export default MainPage;
