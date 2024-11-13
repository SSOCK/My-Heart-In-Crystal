import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import Crystal from '@/shared/database/mongodb/models/crystalModel';
import User from '@/shared/database/mongodb/models/userModel';
import { User as UserType } from '@/shared/types/user';

type CrystalReq = {
  user_id: string;
  title: string;
  model: number;
  modelColor: string;
  bottom: number;
  bottomColor: string;
};

export const POST = async (req: NextRequest) => {
  // 세션 확인
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 요청에서 데이터 추출
  const { user_id, title, model, modelColor, bottom, bottomColor } =
    (await req.json()) as CrystalReq;

  // MongoDB에 연결
  await connectToMongoDB();

  try {
    // Crystal 생성
    const crystal = await Crystal.create({
      user_id,
      title,
      main_decoration_id: model,
      main_decoration_color: modelColor,
      bottom_decoration_id: bottom,
      bottom_decoration_color: bottomColor,
    });

    // 생성된 Crystal의 ID 반환
    const crystal_id = crystal._id;

    // user_id에 해당하는 유저의 crystal_id 업데이트
    await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          crystal_id: {
            $each: [crystal_id],
            $slice: -5,
          },
        },
      },
      { new: true }
    );

    return NextResponse.json({
      message: 'Crystal created',
      crystal_id,
      ok: true,
    });
  } catch (error) {
    console.error('Error creating crystal:', error);
    return NextResponse.json(
      { error: 'Failed to create crystal' + error },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const userId = req.headers.get('X-User-Id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  // 세션 확인
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // MongoDB에 연결
  await connectToMongoDB();

  try {
    // user_id에 해당하는 유저의 crystal_id 조회
    const crystal = (
      (await User.findOne({ _id: userId }).select('crystal_id')) as UserType
    ).crystal_id;

    if (!crystal) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const crystalDatas = await Promise.all(
      crystal.map(async (crystalId) => {
        return await Crystal.findOne({ _id: crystalId });
      })
    );

    return NextResponse.json({ data: crystalDatas, ok: true });
  } catch (error) {
    console.error('Error fetching crystal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crystal' + error },
      { status: 500 }
    );
  }
};
