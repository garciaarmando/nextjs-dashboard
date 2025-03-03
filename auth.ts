import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Github, GoogleProvider],
})