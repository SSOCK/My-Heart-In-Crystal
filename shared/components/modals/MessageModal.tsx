import { CircleX } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import useModal from '@/shared/hooks/useModal';
import MODAL_TYPE from '@/shared/constants/modal';
import { MessageType } from '@/shared/types/message';
import { formattedTime } from '@/shared/utils/time/formattedTime';

const MessageModal = () => {
  const { isOpen, onClose, type, props } = useModal();

  if (!isOpen || type !== MODAL_TYPE.MESSAGE) {
    return null;
  }
  const { data } = props;

  if (!data) return null;

  const { sender, sendAt, message, letterColor } = data as MessageType;

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="no-scrollbar message"
        style={{ backgroundColor: letterColor }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogClose onClick={() => onClose()} className="flex justify-end">
          <CircleX className="message-close" />
        </DialogClose>

        <div
          className="text-center text-white"
          style={{
            textShadow:
              '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
          }}
        >
          {message.split('\n').map((line, index) => (
            <p key={index} className="text-xl">
              {line}
            </p>
          ))}
        </div>

        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <DialogFooter
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div
            className="text-xl"
            style={{
              color: 'rgba(254, 202, 202, 1)',
              textShadow:
                '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
            }}
          >
            {formattedTime(sendAt)}
          </div>
          <div
            className="flex gap-2 text-xl"
            style={{
              color: 'rgba(34,197,94,1)',
              textShadow:
                '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
            }}
          >
            <p style={{ color: 'rgba(156, 163, 175, 1)' }}>From . </p>
            {sender}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
