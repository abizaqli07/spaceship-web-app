import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session: {
    strategy: "jwt"
  },

  secret: env.NEXTAUTH_SECRET,
  // Credentials Provider for Auth
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })

        if (!user) {
          throw new Error("No user found with email")
        }

        if (credentials?.password) {
          const checkPassword = await compare(credentials.password, user.password);

          if (!checkPassword || user.email !== credentials.email) {
            throw new Error("Username or Password doesnt match")
          }
        }

        return user as any
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
