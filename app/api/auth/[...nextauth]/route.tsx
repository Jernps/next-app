import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                email:{lanbel:'Email', type: 'email', placeholder: 'Email'},
                password:{lanbel:'Password', type: 'password', placeholder: 'Password'},
            },
            async authorize(credentials, req) {
                if(!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({ where:{email: credentials.email}})

                if(!user) return null;

                const passwordsMatch = await bcrypt.compare(credentials.password,user.hashedPassword!)

                return passwordsMatch ? user : null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    session:{
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions );

export {handler as GET, handler as POST}