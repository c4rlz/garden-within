"use server";

import { revalidatePath } from "next/cache";
import { parseStringArray } from "@/lib/form";
import { requireAuth } from "@/lib/require-auth";
import { journalEntryService } from "@/lib/services/journal-entry-service";
import { periodStartService } from "@/lib/services/period-start-service";

function parseEntryFromFormData(formData: FormData) {
  const overrideRaw = formData.get("cycleDayOverride");
  return {
    date: formData.get("date") ?? undefined,
    body: formData.get("body") ?? "",
    margins: parseStringArray(formData.get("margins")),
    cycleDayOverride: (() => {
      if (overrideRaw === "" || overrideRaw == null) return null;
      const n = Number(overrideRaw);
      return Number.isNaN(n) ? null : n;
    })(),
  };
}

export async function saveJournalEntry(formData: FormData) {
  await requireAuth();
  const raw = parseEntryFromFormData(formData);
  const date = raw.date ? new Date(String(raw.date)) : new Date();
  await journalEntryService.upsertForDate(date, {
    date,
    body: String(raw.body ?? ""),
    energy: [],
    mood: [],
    bodySensations: [],
    themes: raw.margins,
    cycleDayOverride: raw.cycleDayOverride,
  });
  revalidatePath("/today");
  revalidatePath("/seeds");
  revalidatePath(`/seeds/${date.toISOString().slice(0, 10)}`);
}

export async function logPeriodStartedToday() {
  await requireAuth();
  await periodStartService.logToday();
  revalidatePath("/today");
  revalidatePath("/settings");
  revalidatePath("/seeds");
}
