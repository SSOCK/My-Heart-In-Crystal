'use client';

import { useCallback } from 'react';
import { Share } from 'lucide-react';

import { toast } from 'sonner';
import { ORIGIN } from '@/shared/constants/url';

const ShareLink = ({ userId }: { userId: string }) => {
  const share = useCallback(() => {
    const url = `${ORIGIN}/visit/${userId}`;
    if (navigator.share === undefined) {
      navigator.clipboard.writeText(url);
      toast('링크가 클립보드에 복사되었습니다.');
    } else {
      navigator.clipboard.writeText(url);
      navigator.share({
        url: url,
      });
      toast('링크가 클립보드에 복사되었습니다.');
    }
  }, [userId]);

  return (
    <Share
      className="main-onboarding-share-button pointer-events-auto cursor-pointer hover:text-blue-500"
      onClick={() => share()}
      size={'2rem'}
    />
  );
};

export default ShareLink;
