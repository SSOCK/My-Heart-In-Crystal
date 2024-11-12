import Visit from '@/app/(public)/visit/_components';

import { ROUTES } from '@/shared/constants/routes';
import { UserData } from '@/shared/types/userData';
import { redirect } from 'next/navigation';
import getVisitUserData from '@/app/(public)/visit/[userId]/utils/getVisitUserData';

const VisitPage = async ({ params }: { params: { userId: string } }) => {
  const data = (await getVisitUserData(params.userId)) as UserData;
  if (!data) redirect(ROUTES.LANDING);

  const userData = {
    user: {
      username: data.user.username,
      email: data.user.email,
      uuid: data.user.uuid,
      crystal_id: data.user.crystal_id.map((crystalId) => crystalId.toString()),
      provider: data.user.provider,
      _id: data.user._id.toString(),
      createdAt: data.user.createdAt,
      updatedAt: data.user.updatedAt,
    },
    crystals: data.crystals.map((crystal) => ({
      _id: crystal._id.toString(),
      user_id: crystal.user_id.toString(),
      message_id: crystal.message_id.map((messageId) => messageId.toString()),
      is_private: crystal.is_private,
      createdAt: crystal.createdAt,
      updatedAt: crystal.updatedAt,
      title: crystal.title,
      main_decoration_color: crystal.main_decoration_color,
      main_decoration_id: crystal.main_decoration_id,
      bottom_decoration_color: crystal.bottom_decoration_color,
      bottom_decoration_id: crystal.bottom_decoration_id,

      messages: crystal.messages.map((message) => ({
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        _id: message._id.toString(),
        user_id: message.user_id.toString(),
        crystal_id: message.crystal_id.toString(),
        decoration_id: message.decoration_id,
        decoration_color: message.decoration_color,
        content: message.content,
        sender: message.sender,
        letter_color: message.letter_color,
        is_deleted: message.is_deleted,
        is_opend: message.is_opend,
      })),
    })),
  };

  return (
    <>
      <Visit userData={userData} />
    </>
  );
};

export default VisitPage;
