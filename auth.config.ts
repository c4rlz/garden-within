import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth settings, shared by middleware and auth.ts. Providers live in
 * auth.ts because authorize() needs Prisma, which can't run on the edge.
 */
export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  trustHost: true,
} satisfies NextAuthConfig;
