import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import UISection from '@/shared/components/ui/UISection';
import PreviousButton from '@/shared/components/ui/PreviousButton';
import UserHeader from '@/shared/components/ui/UserHeader';
import MessageCount from '@/shared/components/ui/MessageCount';

import CrystalCanvas from '@/app/(protected)/main/_components/CrystalCanvas';
import ShareLink from '@/app/(protected)/main/_components/ui/ShareLink';
import FullScreen from '@/app/(protected)/main/_components/ui/FullScreen';
import HamburgerButton from '@/app/(protected)/main/_components/ui/HamburgerButton';

import { User } from '@/shared/types/user';

import fetchCrystal from '../_utils/fetchCrystal';
import { Crystal } from '@/shared/types/crystal';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Main = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [current, setCurrent] = useState<number>(0);
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user as User;
  const { data, isLoading, isError } = useQuery<Crystal[]>({
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

  const crystalCount = data?.length;
  const messageCount = data?.reduce(
    (acc, cur) => acc + cur.message_id.length,
    0
  );

  return (
    <>
      <PreviousButton />
      <HamburgerButton />
      <UISection>
        <div className="flex flex-col items-center gap-2">
          <UserHeader user={user.username || ''} />
          <MessageCount count={messageCount || 0} />
        </div>
        <div className="flex w-full justify-between md:px-16">
          {current > 0 ? (
            <ArrowLeft
              onClick={() => setCurrent((prev) => prev - 1)}
              className="pointer-events-auto transform cursor-pointer rounded-full p-1 transition duration-200 hover:bg-primary hover:text-white"
              size={'2rem'}
            />
          ) : (
            <div />
          )}
          {current < crystalCount! - 1 ? (
            <ArrowRight
              onClick={() => setCurrent((prev) => prev + 1)}
              className="pointer-events-auto transform cursor-pointer rounded-full p-1 transition duration-200 hover:bg-primary hover:text-white"
              size={'2rem'}
            />
          ) : (
            <div />
          )}
        </div>
        <div className="flex w-full justify-between">
          <FullScreen />
          <ShareLink userId={user.uuid} />
        </div>
      </UISection>
      <CrystalCanvas data={data || []} current={current} />
    </>
  );
};

export default Main;
