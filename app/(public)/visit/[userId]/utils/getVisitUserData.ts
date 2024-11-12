import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User from '@/shared/database/mongodb/models/userModel';
import Crystal from '@/shared/database/mongodb/models/crystalModel';
import Message from '@/shared/database/mongodb/models/messageModel';
import { User as UserType } from '@/shared/types/user';
import { Crystal as CrystalType } from '@/shared/types/crystal';
import { Message as MessageType } from '@/shared/types/message';
import { UserCrystal } from '@/shared/types/userData';

const getVisitUserData = async (userId: string) => {
  try {
    await connectToMongoDB();

    const user = (await User.findOne({ uuid: userId })) as UserType;
    if (!user) return null;
    if ((user && user.crystal_id.length === 0) || user.username === null)
      return null;

    const crystals = (await Promise.all(
      user.crystal_id.map(async (crystalId) => {
        return await Crystal.findOne({ _id: crystalId });
      })
    )) as CrystalType[];

    const crystalWithMessages = (await Promise.all(
      crystals.map(async (crystal) => {
        const messages = (await Promise.all(
          crystal.message_id.map(async (messageId) => {
            const messages = await Message.findOne({ _id: messageId });
            if (crystal.is_private) {
              return {
                ...messages,
                content: '비공개 메세지입니다.',
                sender: '익명',
              };
            } else {
              return messages;
            }
          })
        )) as MessageType[];
        const result = {
          _id: crystal._id,
          user_id: crystal.user_id,
          title: crystal.title,
          is_private: crystal.is_private,
          main_decoration_color: crystal.main_decoration_color,
          main_decoration_id: crystal.main_decoration_id,
          bottom_decoration_color: crystal.bottom_decoration_color,
          bottom_decoration_id: crystal.bottom_decoration_id,
          message_id: crystal.message_id,
          createdAt: crystal.createdAt,
          updatedAt: crystal.updatedAt,
        };

        return { ...result, messages };
      })
    )) as UserCrystal[];

    return { user, crystals: crystalWithMessages };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getVisitUserData;
