import mongoose, { Document, Model } from 'mongoose';
import Crystal from '@/shared/database/mongodb/models/crystalModel';
// User 인터페이스 정의 (createdAt 필드 제거)
export interface IUser {
  email: string;
  uuid: string;
  crystal_id: string[] | [];
  username: string;
  nickname: string | null;
  provider: string;
}

// IUser와 Document 인터페이스를 결합하여 MongoDB 문서의 타입 정의
export interface IUserDocument extends IUser, Document {}

// User 스키마 정의
const userSchema = new mongoose.Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    uuid: { type: String, required: true },
    crystal_id: { type: [String], required: true },
    username: { type: String, required: true },
    nickname: { type: String, required: true },
    provider: { type: String, required: true },
  },
  {
    timestamps: true, // 자동으로 'createdAt' 및 'updatedAt' 필드 추가
  }
);

// User 모델의 프리 훅을 사용하여 관련 Crystal 및 Message 모두 삭제
userSchema.pre('findOneAndDelete', async function (next) {
  // 현재 삭제될 User 문서를 찾음
  const user = await this.model.findOne(this.getFilter());
  if (user) {
    // 해당 user_id를 가진 모든 Crystal 삭제
    const crystals = await Crystal.find({ user_id: user._id });
    for (const crystal of crystals) {
      // 각 Crystal 삭제 시 관련 Message도 삭제되도록 트리거됨
      await crystal.deleteOne();
    }
  }
  next();
});

// User 모델 생성
const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
