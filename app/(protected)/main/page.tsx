'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import CheckAuth from '../_provider/CheckAuth';
import Main from './_components/Main';

const MainPage = () => {
  useEffect(() => {
    const isMaked = sessionStorage.getItem('toast');

    if (isMaked) {
      toast.success('새로운 수정구슬이 생성되었습니다!');
      sessionStorage.removeItem('toast');
    }
  }, []);

  return (
    <CheckAuth>
      <Main />
    </CheckAuth>
  );
};

export default MainPage;
