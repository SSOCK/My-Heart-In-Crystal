'use server';

import Message, {
  IMessage,
} from '@/shared/database/mongodb/models/messageModel';

import { connectToMongoDB } from '@/shared/database/mongodb/config';

export const createMessage = async (messageData: IMessage) => {
  await connectToMongoDB();

  try {
    const newMessage = await Message.create(messageData);
    newMessage.save();
    return newMessage.toString();
  } catch (error) {
    console.log(error);
    throw { message: 'error creating message' };
  }
};

export const deleteMessage = async (id: string) => {
  try {
    await Message.deleteOne({ _id: id });
    return { message: 'message deleted' };
  } catch (error) {
    throw { message: 'error deleting message' };
  }
};
