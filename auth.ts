import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Github, GoogleProvider],



  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },

    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })
       
      if (dbUser?.isActive === false) throw Error('User is not active')
        
      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'
      return token
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session
    },
  }
})