'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') return null; // Wait for session loading

  if (session?.user) {
    return <>{children}</>; // Show children if authenticated
  }

  return null; // Or you could display a loading spinner here
};

export default CheckAuth;
