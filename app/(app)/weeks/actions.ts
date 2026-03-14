"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createWeekSchema, updateWeekSchema } from "@/lib/validations";
import { weekService } from "@/lib/services";

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

export async function createWeek(formData: FormData) {
  const raw = {
    weekStart: formData.get("weekStart") ?? undefined,
    strengthenedMe: parseStringArray(formData.get("strengthenedMe")),
    drainedMe: parseStringArray(formData.get("drainedMe")),
    patternsNoticed: parseStringArray(formData.get("patternsNoticed")),
    reflections: parseStringArray(formData.get("reflections")),
  };
  const parsed = createWeekSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }
  await weekService.create(parsed.data);
  revalidatePath("/weeks");
  redirect("/weeks");
}

export async function updateWeek(id: string, formData: FormData) {
  const raw = {
    weekStart: formData.get("weekStart") ?? undefined,
    strengthenedMe: parseStringArray(formData.get("strengthenedMe")),
    drainedMe: parseStringArray(formData.get("drainedMe")),
    patternsNoticed: parseStringArray(formData.get("patternsNoticed")),
    reflections: parseStringArray(formData.get("reflections")),
  };
  const parsed = updateWeekSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }
  await weekService.update(id, parsed.data);
  revalidatePath("/weeks");
  revalidatePath(`/weeks/${id}`);
  return { ok: true as const };
}

export async function deleteWeek(id: string) {
  await weekService.delete(id);
  revalidatePath("/weeks");
}
