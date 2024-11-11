import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import CrystalCanvas from '@/shared/components/canvas/CrystalCanvas';
import UISection from '@/shared/components/ui/UISection';

import PreviousButton from '@/shared/components/ui/PreviousButton';
import UserHeader from '@/shared/components/ui/UserHeader';
import MessageCount from '@/shared/components/ui/MessageCount';

import ShareLink from '../_components/ui/ShareLink';
import FullScreen from '../_components/ui/FullScreen';
import HamburgerButton from '../_components/ui/HamburgerButton';

import { User } from '@/shared/types/user';

import fetchCrystal from '../_utils/fetchCrystal';

const Main = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as User;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['crystal'],
    queryFn: () => fetchCrystal(user._id),
    gcTime: 0,
  });

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }

    if (user && user.crystal_id.length === 0) {
      sessionStorage.removeItem('isDecorated');
      router.push('/make');
    }
  }, [router, user, isMounted]);

  if (!isMounted) return null;
  if (isLoading || isError) return null;

  console.log(data, session);

  return (
    <>
      <PreviousButton />
      <HamburgerButton />
      <UISection>
        <div className="flex flex-col items-center gap-2">
          <UserHeader user={user.username || ''} />
          <MessageCount count={10} />
        </div>
        <div className="flex w-full justify-between">
          <FullScreen />
          <ShareLink userId={user.uuid} />
        </div>
      </UISection>
      <CrystalCanvas />
    </>
  );
};

export default Main;
