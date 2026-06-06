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
    <form action={saveJournalEntry} className="space-y-8">
      <input type="hidden" name="date" value={entry.date} />
      <input type="hidden" name="margins" value={JSON.stringify(margins)} />

      <section className="space-y-3">
        <h2 className="font-normal text-base text-foreground/90">Journal</h2>
        <textarea
          name="body"
          rows={8}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={journalPlaceholder}
          className="min-h-[11rem] w-full resize-y border-0 border-b border-border/50 bg-transparent px-0 py-2 font-serif text-base leading-loose text-foreground placeholder:text-muted-foreground/70 focus-visible:border-border focus-visible:outline-none focus-visible:ring-0"
        />
      </section>

      <section className="space-y-4 border-t border-border/30 pt-7">
        <MarginTagField
          label="What stands out today?"
          hint="tension, love, work, fatigue, hope"
          value={margins}
          onChange={setMargins}
        />
        <p className="text-sm text-muted-foreground/75">
          Optional — a few words in the margin. Type and press return.
        </p>
      </section>

      <div className="space-y-4 border-t border-border/40 pt-6">
        <Button type="submit" variant="outline" className="bg-card/50">
          Keep this seed
        </Button>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowOverride((v) => !v)}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
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
