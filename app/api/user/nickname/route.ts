import { NextRequest, NextResponse } from 'next/server';

import { getServerSession } from 'next-auth';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User from '@/shared/database/mongodb/models/userModel';

type NicknameReq = {
  username: string;
  userId: string;
};

export const POST = async (req: NextRequest) => {
  // 세션 확인
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 요청에서 데이터 추출
  const { username, userId } = (await req.json()) as NicknameReq;

  if (!username || !userId) {
    return NextResponse.json(
      { error: 'Username and userId are required' },
      { status: 400 }
    );
  }

  // MongoDB에 연결
  await connectToMongoDB();

  try {
    // 해당 userId를 가진 사용자의 username 필드를 업데이트
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true } // 업데이트된 사용자 데이터를 반환하도록 설정
    );

    // 사용자 정보가 없을 경우 처리
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 성공적으로 업데이트된 경우 응답 반환
    return NextResponse.json({
      message: 'Username updated',
      username: updatedUser.username,
      ok: true,
    });
  } catch (error) {
    console.error('Error updating username:', error);
    return NextResponse.json(
      { error: 'Failed to update username' + error },
      { status: 500 }
    );
  }
};
