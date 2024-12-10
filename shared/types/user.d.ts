import { IUser } from '@/shared/database/mongodb/models/userModel';
import mongoose from 'mongoose';

type SeasonType = 'spring' | 'summer' | 'fall' | 'winter';
type CrystalSeasonMap = Map<
  SeasonType,
  mongoose.Schema.Types.ObjectId[] | undefined
>;
type CrystalYearMap = Map<string, CrystalSeasonMap>;

export type User = {
  createdAt: string;
  updatedAt: string;
  _id: string;
} & IUser;

export type sessionUser = {
  uid: string;
  provider: string;
  email: string;
};

export type UserType = {
  crystal_id: CrystalYearMap;
  createdAt: string;
  updatedAt: string;
  _id: string;
} & IUser;
