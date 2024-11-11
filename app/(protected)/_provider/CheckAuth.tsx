'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IUser } from '@/shared/database/mongodb/models/userModel';
import ROUTES from '@/shared/constants/route';

type User = {
  createdAt: string;
  updatedAt: string;
  _id: string;
} & IUser;

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const user = session.user as User;
      if (user.username === null) {
        router.replace(ROUTES.NICKNAME);
      } else if (user.crystal_id.length === 0) {
        router.replace(ROUTES.MAKE);
      }
    }
  }, [status, session, router]);

  if (status === 'loading') return null; // Wait for session loading

  return <>{children}</>; // Render children if authenticated and conditions are met
};

export default CheckAuth;
