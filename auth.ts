import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Github,
    GoogleProvider,
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "email@email.com" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const response = await fetch("http://localhost:3000/api/auth/signin", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password
            })
          })

          if (!response.ok) {
            return null
          }

          const user = await response.json()
          return user
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),],



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