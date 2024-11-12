import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import Crystal from '@/shared/database/mongodb/models/crystalModel';

import Message from '@/shared/database/mongodb/models/messageModel';
import { REVALIDATE_PATHS } from '@/shared/constants/routes';

type MessageReq = {
  user_id: string;
  crystal_id: string;
  decoration_id: number;
  decoration_color: string;
  content: string;
  sender: string;
  letter_color: string;
  is_deleted: Date | null;
  is_opend: Date | null;
};

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    user_id,
    crystal_id,
    decoration_id,
    decoration_color,
    content,
    sender,
    letter_color,
    is_deleted,
    is_opend,
  } = (await req.json()) as MessageReq;

  try {
    // MongoDB에 연결
    await connectToMongoDB();

    // Message 생성
    const message = await Message.create({
      user_id,
      crystal_id,
      decoration_id,
      decoration_color,
      content,
      sender,
      letter_color,
      is_deleted,
      is_opend,
    });

    const message_id = message._id;

    await Crystal.findOneAndUpdate(
      { _id: crystal_id },
      {
        $push: {
          message_id: {
            $each: [message_id],
            $slice: -30,
          },
        },
      },
      { new: true }
    );

    // 캐시 업데이트
    revalidatePath(REVALIDATE_PATHS.MAIN, 'page');
    revalidatePath(REVALIDATE_PATHS.MAKE, 'page');
    revalidatePath(REVALIDATE_PATHS.VISIT, 'page');
    return NextResponse.json({
      message: 'Message created',
      message_id,
      ok: true,
    });
  } catch (error) {
    console.error('Error creating message : ', error);
    return NextResponse.json(
      { error: 'Failed to create message ' + error },
      { status: 500 }
    );
  }
};