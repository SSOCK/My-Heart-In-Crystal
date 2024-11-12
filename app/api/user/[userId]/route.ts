import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import User from '@/shared/database/mongodb/models/userModel';
import Crystal from '@/shared/database/mongodb/models/crystalModel';
import Message from '@/shared/database/mongodb/models/messageModel';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import { ROUTES } from '@/shared/constants/routes';
import { User as UserType } from '@/shared/types/user';
import { Crystal as CrystalType } from '@/shared/types/crystal';
import { Message as MessageType } from '@/shared/types/message';
import { UserCrystal } from '@/shared/types/userData';

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  try {
    await connectToMongoDB();
    // userId is User.uuid

    const user = (await User.findOne({ uuid: userId })) as UserType;
    if (!user) redirect(ROUTES.ERROR);
    if ((user && user.crystal_id.length === 0) || user.username === null)
      redirect(ROUTES.ERROR);

    const crystals = (await Promise.all(
      user.crystal_id.map(async (crystalId) => {
        return await Crystal.findOne({ _id: crystalId });
      })
    )) as CrystalType[];

    const crystalWithMessages = (await Promise.all(
      crystals.map(async (crystal) => {
        const messages = (await Promise.all(
          crystal.message_id.map(async (messageId) => {
            const messages = await Message.findOne({ _id: messageId });
            if (crystal.is_private) {
              return {
                ...messages,
                content: '비공개 메세지입니다.',
                sender: '익명',
              };
            } else {
              return messages;
            }
          })
        )) as MessageType[];
        const result = {
          _id: crystal._id,
          user_id: crystal.user_id,
          title: crystal.title,
          is_private: crystal.is_private,
          main_decoration_color: crystal.main_decoration_color,
          main_decoration_id: crystal.main_decoration_id,
          bottom_decoration_color: crystal.bottom_decoration_color,
          bottom_decoration_id: crystal.bottom_decoration_id,
          message_id: crystal.message_id,
          createdAt: crystal.createdAt,
          updatedAt: crystal.updatedAt,
        };

        return { ...result, messages };
      })
    )) as UserCrystal[];

    return NextResponse.json({ user, crystals: crystalWithMessages });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
