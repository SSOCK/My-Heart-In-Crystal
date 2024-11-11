'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { ROUTES } from '@/shared/constants/routes';
import { User } from '@/shared/types/user';

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // 로딩 상태일 때 아무 동작도 하지 않음
    if (status === 'loading') return;

    // 인증되지 않은 경우
    if (status === 'unauthenticated') {
      router.replace('/'); // 로그인되지 않은 경우 '/'로 리다이렉트
    }

    // 인증된 경우, 사용자의 상태에 따라 라우팅
    if (status === 'authenticated' && session?.user) {
      const user = session.user as User;
      if (user.username === null) {
        router.replace(ROUTES.NICKNAME); // username이 없으면 Nickname 페이지로 리다이렉트
      } else if (user.crystal_id.length === 0) {
        router.replace(ROUTES.MAKE); // crystal_id가 없으면 Make 페이지로 리다이렉트
      }
    }
  }, [status, session, router]);

  // 로딩 중에는 아무것도 렌더링하지 않음
  if (status === 'loading') return null;

  return <>{children}</>; // 인증이 된 경우 자식 컴포넌트를 렌더링
};

export default CheckAuth;
