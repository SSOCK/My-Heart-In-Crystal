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

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  await connectToMongoDB();
  // userId is User.uuid
  const user = (await User.findOne({ uuid: userId })) as UserType;
  if (!user) redirect(ROUTES.ERROR);
  if ((user && user.crystal_id.length === 0) || user.username === null)
    redirect(ROUTES.ERROR);

  const defaultCrystal = (await Crystal.findOne({
    _id: user.crystal_id[0],
  })) as CrystalType;
  const messages = (await Promise.all(
    defaultCrystal.message_id.map(async (messageId) => {
      return await Message.findOne({ _id: messageId });
    })
  )) as MessageType[];

  if (defaultCrystal.is_private !== null) {
    const privateMessages = messages.map((message) => {
      return {
        ...message,
        content: '비공개 메세지입니다.',
        sender: '익명',
      };
    });
    return NextResponse.json({
      user: user,
      crystal: defaultCrystal,
      messages: privateMessages,
    });
  }

  return NextResponse.json({ user: user, crystal: defaultCrystal, messages });
};
