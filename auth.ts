import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { passwordsMatch } from "@/lib/password";
import { loginAttemptService } from "@/lib/services";

class LockedOut extends CredentialsSignin {
  code = "locked";
}

/** Vercel sets x-forwarded-for itself, so the first entry is the real client. */
function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      // Rate limiting lives here, not in the login action, so it also covers
      // direct POSTs to /api/auth/callback/credentials.
      authorize: async (credentials, request) => {
        const expected = process.env.AUTH_PASSWORD;
        const password = credentials?.password;
        if (!expected || typeof password !== "string" || !password) return null;

        const key = clientKey(request);
        if (await loginAttemptService.isLockedOut(key)) throw new LockedOut();

        if (!(await passwordsMatch(password, expected))) {
          await loginAttemptService.recordFailure(key);
          return null;
        }
        return { id: "owner", name: "You" };
      },
    }),
  ],
});
