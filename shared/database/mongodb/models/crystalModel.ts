import mongoose, { Document, Model } from 'mongoose';

// Crystal 인터페이스 정의
export interface ICrystal {
  user_id: string;
  title: string;
  is_private: Date | null;
  main_decoration_color: string;
  main_decoration_id: number;
  bottom_decoration_color: string;
  bottom_decoration_id: number;
}

// ICrystal과 Document 인터페이스를 결합하여 MongoDB 문서의 타입 정의
export interface ICrystalDocument extends ICrystal, Document {}

// Crystal 스키마 정의
const crystalSchema = new mongoose.Schema<ICrystalDocument>(
  {
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    is_private: { type: Date, required: true, default: null },
    main_decoration_color: { type: String, required: true },
    main_decoration_id: { type: Number, required: true },
    bottom_decoration_color: { type: String, required: true },
    bottom_decoration_id: { type: Number, required: true },
  },
  {
    timestamps: true, // 'createdAt' 및 'updatedAt' 필드 자동 추가
  }
);

// Crystal 모델 생성
const Crystal: Model<ICrystalDocument> =
  mongoose.models?.Crystal || mongoose.model('Crystal', crystalSchema);

export default Crystal;
