"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarginTagField } from "@/components/forms/margin-tag-field";
import { saveJournalEntry } from "@/app/(app)/journal-entries/actions";
import type { JournalEntryFormData } from "@/lib/journal-entry-form-data";

export type { JournalEntryFormData } from "@/lib/journal-entry-form-data";

type JournalEntryFormProps = {
  entry: JournalEntryFormData;
  journalPlaceholder?: string;
};

export function JournalEntryForm({
  entry,
  journalPlaceholder = "What are you noticing today?",
}: JournalEntryFormProps) {
  const [body, setBody] = useState(entry.body);
  const [margins, setMargins] = useState(entry.margins);
  const [showOverride, setShowOverride] = useState(entry.cycleDayOverride != null);
  const [cycleDayOverride, setCycleDayOverride] = useState(
    entry.cycleDayOverride != null ? String(entry.cycleDayOverride) : ""
  );

  return (
    <form action={saveJournalEntry} className="space-y-6 sm:space-y-8">
      <input type="hidden" name="date" value={entry.date} />
      <input type="hidden" name="margins" value={JSON.stringify(margins)} />

      <section className="space-y-2.5">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Journal
        </h2>
        <textarea
          name="body"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={journalPlaceholder}
          className="min-h-[10rem] w-full resize-y rounded-2xl border border-border/50 bg-card/80 px-4 py-3.5 font-serif text-[1.0625rem] leading-relaxed text-foreground shadow-sm placeholder:text-muted-foreground/60 focus-visible:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 sm:min-h-[11rem] sm:bg-card/60 sm:px-5 sm:py-4"
        />
      </section>

      <section className="space-y-3 rounded-2xl border border-border/40 bg-card/40 px-4 py-4 sm:bg-transparent sm:px-0 sm:py-0 sm:border-0">
        <MarginTagField
          label="What stands out today?"
          hint="tension, love, work, fatigue, hope — type and press return"
          value={margins}
          onChange={setMargins}
        />
      </section>

      <div className="space-y-4 border-t border-border/40 pt-5 sm:pt-6">
        <Button
          type="submit"
          className="h-12 w-full rounded-xl text-[0.9375rem] sm:h-11 sm:w-auto"
        >
          Keep this seed
        </Button>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowOverride((v) => !v)}
            className="min-h-10 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {showOverride ? "Hide cycle day adjustment" : "Adjust cycle day"}
          </button>
          {showOverride && (
            <Input
              type="number"
              name="cycleDayOverride"
              min={1}
              max={60}
              placeholder="Cycle day"
              value={cycleDayOverride}
              onChange={(e) => setCycleDayOverride(e.target.value)}
              className="max-w-[8rem]"
            />
          )}
          {!showOverride && (
            <input type="hidden" name="cycleDayOverride" value="" />
          )}
        </div>
      </div>
    </form>
  );
}
