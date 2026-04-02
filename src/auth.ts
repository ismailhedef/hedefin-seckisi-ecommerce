import NextAuth, { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

import type { AuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type ExtendedJwt = JWT & { role?: string; id?: string };

type AuthUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  } as const,
  pages: {
    signIn: "/giris",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        const authorizedUser: AuthUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };

        return authorizedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: ExtendedJwt; user?: AuthUser | User | null }) {
      if (user) {
        token.role = (user as AuthUser).role || token.role;
        token.id = (user as AuthUser).id || token.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: ExtendedJwt }) {
      if (session.user) {
        if (token.id) session.user.id = token.id;
        if (token.role) session.user.role = token.role;
      }
      return session;
    },
  },
};

export async function auth() {
  return await getServerSession(authOptions);
}

export default NextAuth(authOptions);