import { useState, useCallback } from 'react';

import { LockKeyholeOpen, LockKeyhole } from 'lucide-react';
import { Crystal } from '@/shared/types/crystal';
import useModal from '@/shared/hooks/useModal';
import MODAL_TYPE from '@/shared/constants/modal';

const PrivateButton = ({ crystal }: { crystal: Crystal }) => {
  const { onOpen } = useModal();
  const [current, setCurrent] = useState(crystal.is_private !== null);

  const handlePrivate = useCallback(() => {
    setCurrent(!current);
  }, [current]);

  return (
    <button
      onClick={() => {
        onOpen(MODAL_TYPE.PRIVATE, {
          data: { is_private: current, crystal_id: crystal._id, handlePrivate },
        });
      }}
      className="transfrom pointer-events-auto rounded-full p-2 transition duration-200 hover:bg-gray-300"
    >
      {current ? <LockKeyhole /> : <LockKeyholeOpen />}
    </button>
  );
};

export default PrivateButton;
