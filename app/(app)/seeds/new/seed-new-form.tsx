"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BulletListField } from "@/components/forms/bullet-list-field";
import { createSeed } from "../actions";

export function SeedNewForm({ defaultDate }: { defaultDate: string }) {
  const [tendingToday, setTendingToday] = useState<string[]>([]);
  const [release, setRelease] = useState<string[]>([]);
  const [assumptions, setAssumptions] = useState<string[]>([]);
  const [bodyCheckIn, setBodyCheckIn] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  return (
    <form
      action={async (formData) => {
        await createSeed(formData);
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="date" className="mb-1 block text-sm font-medium text-foreground">
          Date
        </label>
        <Input type="date" id="date" name="date" defaultValue={defaultDate} required className="max-w-[12rem]" />
      </div>
      <div>
        <label htmlFor="energyLevel" className="mb-1 block text-sm font-medium text-foreground">
          Energy (1–10)
        </label>
        <Input type="number" id="energyLevel" name="energyLevel" min={1} max={10} className="max-w-[6rem]" />
      </div>
      <BulletListField value={tendingToday} onChange={setTendingToday} label="Tending today" />
      <input type="hidden" name="tendingToday" value={JSON.stringify(tendingToday)} />
      <BulletListField value={release} onChange={setRelease} label="Release" />
      <input type="hidden" name="release" value={JSON.stringify(release)} />
      <BulletListField value={assumptions} onChange={setAssumptions} label="Assumptions" />
      <input type="hidden" name="assumptions" value={JSON.stringify(assumptions)} />
      <BulletListField value={bodyCheckIn} onChange={setBodyCheckIn} label="Body check-in" />
      <input type="hidden" name="bodyCheckIn" value={JSON.stringify(bodyCheckIn)} />
      <BulletListField value={notes} onChange={setNotes} label="Notes" />
      <input type="hidden" name="notes" value={JSON.stringify(notes)} />
      <BulletListField value={tags} onChange={setTags} label="Tags" addLabel="Add tag" />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      <div className="flex gap-3">
        <Button type="submit">Create seed</Button>
      </div>
    </form>
  );
}
