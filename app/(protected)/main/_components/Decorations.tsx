import { useQuery } from '@tanstack/react-query';

import fetchMessages from '@/app/(protected)/main/_utils/fetchMessages';

import { getDecoPosition } from '@/shared/components/canvas/utils/canvas';
import Decoration from '@/shared/components/3dModels/Decoration';
import type { Crystal } from '@/shared/types/crystal';
import type { Message } from '@/shared/types/message';

const Decorations = ({ crystal }: { crystal: Crystal['_id'] }) => {
  const { data, isLoading, isError } = useQuery<Message[]>({
    queryKey: ['meesages'],
    queryFn: () => fetchMessages(crystal),
    gcTime: 0,
  });

  if (isLoading || isError) return null;
  if (!data) return null;
  console.log(data);

  const decos = data.map((message, index) => (
    <Decoration
      key={index}
      id={message.decoration_id}
      scale={1}
      position={getDecoPosition(index + 1)}
      message={message.content ?? '비공개 메시지 입니다.'}
      color={message.decoration_color}
      sender={message.sender ?? '비공개'}
      letterID={message.letter_color ?? 0}
      messageID={message._id}
      isOpened={message.is_opend !== null}
      sendAt={message.createdAt}
    />
  ));

  // const center = new Vector3(0, RADIUS / 2, 0);
  // const emojis = messageList.map((message, index) => (
  //   <Emoji
  //     key={index}
  //     centerPosition={center}
  //     rangeRadius={RADIUS}
  //     sentiment={message.sentiment}
  //     confidence={message.confidence}
  //   />
  // ));

  return (
    <>
      {/* {emojis} */}
      {decos}
    </>
  );
};

export default Decorations;
