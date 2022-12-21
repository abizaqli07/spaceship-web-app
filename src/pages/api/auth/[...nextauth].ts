import NextAuth, { type NextAuthOptions } from "next-auth";
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

        return user
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      if(session.user){
        const userData = await prisma.user.findUnique({
          where: {
            email: session.user?.email!
          }
        })

        session.user.id = userData?.id!
        session.user.name = userData?.username!
        session.user.role = userData?.role!

        return session
      }

      return session;
    },
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET
  }
};

export default NextAuth(authOptions);
