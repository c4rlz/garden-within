import { auth } from "@/auth";

/** Guard server actions — throws if the session is missing. */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session;
}
