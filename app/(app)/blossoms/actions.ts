"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBlossomSchema, updateBlossomSchema } from "@/lib/validations";
import { blossomService } from "@/lib/services";

export async function createBlossom(formData: FormData) {
  const raw = {
    weekId: formData.get("weekId") ?? undefined,
    title: formData.get("title") ?? undefined,
    description: formData.get("description") ?? undefined,
    priority: formData.get("priority") === "true",
  };
  const parsed = createBlossomSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }
  await blossomService.create(parsed.data);
  revalidatePath("/blossoms");
  revalidatePath(`/weeks/${parsed.data.weekId}`);
  redirect("/blossoms");
}

export async function updateBlossom(id: string, formData: FormData) {
  const raw = {
    title: formData.get("title") ?? undefined,
    description: formData.get("description") ?? undefined,
    priority: formData.get("priority") === "true",
    status: formData.get("status") ?? undefined,
  };
  const parsed = updateBlossomSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }
  await blossomService.update(id, parsed.data);
  revalidatePath("/blossoms");
  return { ok: true as const };
}

export async function deleteBlossom(id: string) {
  await blossomService.delete(id);
  revalidatePath("/blossoms");
}
