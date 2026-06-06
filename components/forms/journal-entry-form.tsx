"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BulletListField } from "@/components/forms/bullet-list-field";
import { saveJournalEntry } from "@/app/(app)/journal-entries/actions";
import type { JournalEntryFormData } from "@/lib/journal-entry-form-data";

export type { JournalEntryFormData } from "@/lib/journal-entry-form-data";

const OBSERVATION_FIELDS = [
  {
    key: "energy" as const,
    title: "Energy",
    helper: "How does your vitality feel right now — not what you wish it were.",
    examples: "wired, slow, steady, depleted",
    placeholder: "Add a word or phrase…",
    addLabel: "Add",
  },
  {
    key: "mood" as const,
    title: "Mood",
    helper: "The emotional tone of the day, without needing to fix it.",
    examples: "calm, tender, irritable, hopeful",
    placeholder: "Add a word or phrase…",
    addLabel: "Add",
  },
  {
    key: "bodySensations" as const,
    title: "In your body",
    helper: "Physical sensations you notice — subtle or strong.",
    examples: "cramping, tension, lightness, fatigue",
    placeholder: "Add a sensation…",
    addLabel: "Add",
  },
  {
    key: "themes" as const,
    title: "What's present",
    helper: "What themes are showing up in your life alongside your cycle.",
    examples: "work, rest, family, creativity",
    placeholder: "Add a theme…",
    addLabel: "Add theme",
  },
];

function FieldIntro({
  title,
  helper,
  examples,
}: {
  title: string;
  helper: string;
  examples: string;
}) {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{helper}</p>
      <p className="text-xs text-muted-foreground/80">
        Examples: {examples}
      </p>
    </div>
  );
}

export function JournalEntryForm({ entry }: { entry: JournalEntryFormData }) {
  const [body, setBody] = useState(entry.body);
  const [energy, setEnergy] = useState(entry.energy);
  const [mood, setMood] = useState(entry.mood);
  const [bodySensations, setBodySensations] = useState(entry.bodySensations);
  const [themes, setThemes] = useState(entry.themes);
  const [showOverride, setShowOverride] = useState(entry.cycleDayOverride != null);
  const [cycleDayOverride, setCycleDayOverride] = useState(
    entry.cycleDayOverride != null ? String(entry.cycleDayOverride) : ""
  );

  const tagState = { energy, mood, bodySensations, themes };
  const tagSetters = {
    energy: setEnergy,
    mood: setMood,
    bodySensations: setBodySensations,
    themes: setThemes,
  };

  return (
    <form action={saveJournalEntry} className="space-y-10">
      <input type="hidden" name="date" value={entry.date} />
      <input type="hidden" name="energy" value={JSON.stringify(energy)} />
      <input type="hidden" name="mood" value={JSON.stringify(mood)} />
      <input type="hidden" name="bodySensations" value={JSON.stringify(bodySensations)} />
      <input type="hidden" name="themes" value={JSON.stringify(themes)} />

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-foreground">Journal</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Write freely — whatever is true today, without shaping it into
            something productive.
          </p>
        </div>
        <Card className="border-border/60 shadow-none">
          <CardContent className="pt-6">
            <textarea
              name="body"
              rows={7}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What are you noticing today?"
              className="min-h-[10rem] w-full resize-y rounded-md border border-border/80 bg-background px-3 py-3 text-sm leading-relaxed placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-sm font-medium text-foreground">Observations</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Optional tags — small notes that may help you recognize patterns
            across your seasons.
          </p>
        </div>

        <div className="space-y-8">
          {OBSERVATION_FIELDS.map((field) => (
            <div
              key={field.key}
              className="space-y-3 rounded-xl border border-border/40 bg-card/50 px-5 py-5"
            >
              <FieldIntro
                title={field.title}
                helper={field.helper}
                examples={field.examples}
              />
              <BulletListField
                value={tagState[field.key]}
                onChange={tagSetters[field.key]}
                placeholder={field.placeholder}
                addLabel={field.addLabel}
              />
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-3 border-t border-border/50 pt-6">
        <button
          type="button"
          onClick={() => setShowOverride((v) => !v)}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
        {!showOverride && <input type="hidden" name="cycleDayOverride" value="" />}
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Save seed
      </Button>
    </form>
  );
}
