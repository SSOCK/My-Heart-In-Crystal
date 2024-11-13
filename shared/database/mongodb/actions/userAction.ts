'use server';

import User, { IUser } from '@/shared/database/mongodb/models/userModel';
import { connectToMongoDB } from '@/shared/database/mongodb/config';

export const createUser = async (userData: IUser) => {
  await connectToMongoDB();

  try {
    const newUser = await User.create(userData);
    newUser.save();
    return newUser.toString();
  } catch (error) {
    console.log(error);
    throw { message: 'error creating user' };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await User.deleteOne({ _id: id });
    return { message: 'user deleted' };
  } catch (error) {
    throw { message: 'error deleting user' };
  }
};
