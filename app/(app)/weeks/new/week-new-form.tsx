"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BulletListField } from "@/components/forms/bullet-list-field";
import { createWeek } from "../actions";

export function WeekNewForm({ defaultWeekStart }: { defaultWeekStart: string }) {
  const [strengthenedMe, setStrengthenedMe] = useState<string[]>([]);
  const [drainedMe, setDrainedMe] = useState<string[]>([]);
  const [patternsNoticed, setPatternsNoticed] = useState<string[]>([]);
  const [reflections, setReflections] = useState<string[]>([]);

  return (
    <form
      action={async (formData) => {
        await createWeek(formData);
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="weekStart" className="mb-1 block text-sm font-medium text-foreground">
          Week start (e.g. Monday)
        </label>
        <Input type="date" id="weekStart" name="weekStart" defaultValue={defaultWeekStart} required className="max-w-[12rem]" />
      </div>
      <BulletListField value={strengthenedMe} onChange={setStrengthenedMe} label="What strengthened me" />
      <input type="hidden" name="strengthenedMe" value={JSON.stringify(strengthenedMe)} />
      <BulletListField value={drainedMe} onChange={setDrainedMe} label="What drained me" />
      <input type="hidden" name="drainedMe" value={JSON.stringify(drainedMe)} />
      <BulletListField value={patternsNoticed} onChange={setPatternsNoticed} label="Patterns I noticed" />
      <input type="hidden" name="patternsNoticed" value={JSON.stringify(patternsNoticed)} />
      <BulletListField value={reflections} onChange={setReflections} label="Reflections" />
      <input type="hidden" name="reflections" value={JSON.stringify(reflections)} />
      <Button type="submit">Create week</Button>
    </form>
  );
}
