"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSeedSchema,
  updateSeedSchema,
  type CreateSeedInput,
} from "@/lib/validations";
import { requireAuth } from "@/lib/require-auth";
import { seedService } from "@/lib/services";

/** Creates today's seed if it doesn't exist, then redirects to edit it. */
export async function ensureTodaySeed() {
  await requireAuth();
  const today = new Date();
  const existing = await seedService.findByDate(today);
  if (existing) {
    redirect("/seeds/today");
  }
  const empty: CreateSeedInput = {
    date: today,
    tendingToday: [],
    release: [],
    assumptions: [],
    bodyCheckIn: [],
    notes: [],
    tags: [],
  };
  await seedService.create(empty);
  revalidatePath("/today");
  revalidatePath("/seeds");
  redirect("/seeds/today");
}

export async function createSeed(formData: FormData) {
  await requireAuth();
  const raw = {
    date: formData.get("date") ?? undefined,
    energyLevel: formData.get("energyLevel")
      ? Number(formData.get("energyLevel"))
      : undefined,
    tendingToday: parseStringArray(formData.get("tendingToday")),
    release: parseStringArray(formData.get("release")),
    assumptions: parseStringArray(formData.get("assumptions")),
    bodyCheckIn: parseStringArray(formData.get("bodyCheckIn")),
    notes: parseStringArray(formData.get("notes")),
    tags: parseStringArray(formData.get("tags")),
  };
  const parsed = createSeedSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }
  await seedService.create(parsed.data);
  revalidatePath("/seeds");
  revalidatePath("/today");
  redirect("/seeds");
}

export async function updateSeed(
  id: string,
  formData: FormData
) {
  await requireAuth();
  const raw = {
    date: formData.get("date") ?? undefined,
    energyLevel: formData.get("energyLevel")
      ? Number(formData.get("energyLevel"))
      : undefined,
    tendingToday: parseStringArray(formData.get("tendingToday")),
    release: parseStringArray(formData.get("release")),
    assumptions: parseStringArray(formData.get("assumptions")),
    bodyCheckIn: parseStringArray(formData.get("bodyCheckIn")),
    notes: parseStringArray(formData.get("notes")),
    tags: parseStringArray(formData.get("tags")),
  };
  const parsed = updateSeedSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }
  await seedService.update(id, parsed.data);
  revalidatePath("/seeds");
  revalidatePath("/today");
  return { ok: true as const };
}

export async function deleteSeed(id: string) {
  await requireAuth();
  await seedService.delete(id);
  revalidatePath("/seeds");
  revalidatePath("/today");
}

function parseStringArray(value: FormDataEntryValue | null): string[] {
  if (value == null || value === "") return [];
  if (typeof value !== "string") return [];
  try {
    const arr = JSON.parse(value) as unknown;
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
