'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import useModal from '@/shared/hooks/useModal';
import MODAL_TYPE from '@/shared/constants/modal';

import DeleteModal from '@/shared/components/modals/DeleteModal';
import { Message } from '@/shared/types/message';
import { formattedTime } from '@/shared/utils/time/formattedTime';

const MessageListModal = () => {
  const { isOpen, onClose, type, props } = useModal();

  if (!isOpen || type !== MODAL_TYPE.ALL_MESSAGE) {
    return null;
  }

  const messageLists = props.data as Message[];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="no-scrollbar message-list-modal"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-white">메세지 리스트</DialogTitle>
          <DialogDescription>모든 메세지를 확인해보세요 !</DialogDescription>
        </DialogHeader>
        <div className="message-list flex flex-col gap-4">
          {messageLists.map((message, index) => (
            <>
              <div
                key={index}
                style={{
                  backgroundColor: message.letter_color,
                  minHeight: '10rem',
                }}
                className="message flex flex-col justify-between rounded-lg p-4"
              >
                <div>
                  <DeleteModal messageId={message._id} />
                  <div
                    className="text-center text-2xl text-white"
                    style={{
                      textShadow:
                        '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
                    }}
                  >
                    {message.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div
                    className="text-xl"
                    style={{
                      color: 'rgba(254, 202, 202, 1)',
                      textShadow:
                        '-1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black',
                    }}
                  >
                    {formattedTime(message.createdAt)}
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
                    {message.sender}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant={'secondary'}
            className="w-full"
            onClick={() => onClose()}
          >
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageListModal;
