'use client';

import { useCallback } from 'react';
import { Share } from 'lucide-react';

import { toast } from 'sonner';

const ShareLink = ({ userId }: { userId: string }) => {
  const share = useCallback(() => {
    const url = `http://localhost:3000/visit/${userId}`;
    if (navigator.share === undefined) {
      navigator.clipboard.writeText(url);
      toast('링크가 복사되었습니다.');
    } else {
      navigator.clipboard.writeText(url);
      navigator.share({
        title: '부캠',
        text: '부캠',
        url: url,
      });
    }
  }, [userId]);

  return (
    <Share
      className="pointer-events-auto cursor-pointer hover:text-blue-500"
      onClick={() => share()}
      size={24}
    />
  );
};

export default ShareLink;
