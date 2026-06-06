"use server";

import { revalidatePath } from "next/cache";
import { cycleSettingsSchema } from "@/lib/validations/cycle-settings";
import { cycleSettingsService } from "@/lib/services/cycle-settings-service";

export async function saveCycleSettings(formData: FormData) {
  const raw = {
    lastPeriodStart: formData.get("lastPeriodStart") ?? undefined,
    defaultCycleLength: formData.get("defaultCycleLength") ?? undefined,
    defaultPeriodLength: formData.get("defaultPeriodLength") ?? undefined,
  };
  const parsed = cycleSettingsSchema.safeParse(raw);
  if (!parsed.success) {
    return;
  }
  await cycleSettingsService.upsert(parsed.data);
  revalidatePath("/settings");
  revalidatePath("/today");
  revalidatePath("/seeds");
}

export async function logPeriodStartedFromSettings() {
  const { periodStartService } = await import("@/lib/services/period-start-service");
  await periodStartService.logToday();
  revalidatePath("/settings");
  revalidatePath("/today");
  revalidatePath("/seeds");
}
