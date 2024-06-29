// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log('authorize credentials', credentials);

        const { identifier, password } = credentials;

        if (!identifier || !password) {
          throw new Error('Invalid identifier or password');
        }

        const user = await prisma.user.findFirst({
          where: {
            email: identifier,
          },
        });

        if (!user) {
          throw new Error('Invalid username/email or password.');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error('Invalid username/email or password.');
        }

        console.log('authorized user', user);
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('User signed in:', user);
      return true;
    },
    async session({ session, token }) {
      console.log('session callback - token:', token);
      session.user = token.user;
      console.log('session callback - session:', session);
      return session;
    },
    async jwt({ token, user }) {
      console.log('JWT callback - user:', user);
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      }
      console.log('JWT callback - token:', token);
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/') || new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
