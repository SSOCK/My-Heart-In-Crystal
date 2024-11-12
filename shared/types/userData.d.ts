import { Crystal } from './crystal';
import { Message } from './message';
import { User } from './user';

export type UserData = {
  user: User;
  crystal: Crystal;
  messages: Message[];
};
