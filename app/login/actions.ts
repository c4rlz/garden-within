"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export async function login(formData: FormData) {
  const password = formData.get("password");
  if (typeof password !== "string" || !password) {
    redirect("/login?error=missing");
  }

  try {
    await signIn("credentials", {
      password,
      redirectTo: "/today",
    });
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      redirect("/login?error=invalid");
    }
    throw error;
  }
}
