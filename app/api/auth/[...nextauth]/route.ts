import NextAuth from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import User, { IUser } from '@/shared/database/mongodb/models/userModel';
import { createUser } from '@/shared/database/mongodb/actions/userAction';

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectToMongoDB();

      const existingUser = await User.findOne({
        email: user.email,
        provider: account?.provider,
      });
      if (!existingUser) {
        const uuid = uuidv4();
        const newUser: IUser = {
          email: user.email || '',
          crystal_id: [],
          uuid,
          username: null,
          provider: account?.provider || '',
        };

        try {
          await createUser(newUser);
        } catch (error) {
          throw new Error('Failed to create user' + error);
        }
      }
      return true;
    },

    async session({ session, token }) {
      const existingUser = await User.findOne({ email: token.email });
      if (existingUser) {
        session.user = existingUser;
      } else {
        throw new Error('User not found');
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
