import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(credentials.email)) {
          throw new Error("Invalid email format.");
        }

        const disposableDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com', 'test.com', 'example.com', 'fake.com'];
        const domain = credentials.email.split('@')[1]?.toLowerCase();
        if (domain && disposableDomains.includes(domain)) {
          throw new Error("Fake or disposable emails are not allowed.");
        }

        const normalizedEmail = credentials.email.toLowerCase();

        const user = await prisma.user.findUnique({
          where: {
            email: normalizedEmail,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          bio: user.bio,
          role: user.role,
        } as any;
      },
    }),
    CredentialsProvider({
      id: "firebase",
      name: "Firebase",
      credentials: {
        idToken: { label: "ID Token", type: "text" },
        isSignUp: { label: "Is Sign Up", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.idToken) {
          return null;
        }

        try {
          const { adminAuth } = await import("@/lib/firebase-admin");
          const decodedToken = await adminAuth.verifyIdToken(credentials.idToken);
          
          if (!decodedToken || !decodedToken.email) {
            return null;
          }

          // Find or create the user in the database
          let user = await prisma.user.findUnique({
            where: { email: decodedToken.email },
          });

          if (!user) {
            // Create a new user if one doesn't exist
            user = await prisma.user.create({
              data: {
                email: decodedToken.email,
                name: decodedToken.name || decodedToken.email.split('@')[0],
                password: "", // No password needed for Firebase users
                image: decodedToken.picture || null,
                role: "USER",
              },
            });
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            bio: user.bio,
            role: user.role,
          } as any;
        } catch (error) {
          console.error("Firebase Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub as string;
        (session.user as any).image = token.image as string | null;
        (session.user as any).bio = token.bio as string | null;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.image = user.image;
        token.bio = (user as any).bio;
        token.role = (user as any).role;
      }
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image) token.image = session.image;
        if (session.bio) token.bio = session.bio;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
