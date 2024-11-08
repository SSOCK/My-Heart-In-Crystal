import mongoose, { Document, Model } from 'mongoose';

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

// User 모델 생성
const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
