import { create } from 'zustand';

import { ModalType } from '@/shared/constants/modal';
import { Message } from '../types/message';

type ModalProps = {
  data?: Message[];
};

interface ModalStore {
  type: ModalType | null;
  props: ModalProps;
  isOpen: boolean;
  onOpen: (type: ModalType, props?: ModalProps) => void;
  onClose: () => void;
}

const useModal = create<ModalStore>((set) => ({
  type: null,
  props: {},
  isOpen: false,
  onOpen: (type, props) => set({ type, props, isOpen: true }),
  onClose: () => set({ type: null, props: {}, isOpen: false }),
}));

export default useModal;
