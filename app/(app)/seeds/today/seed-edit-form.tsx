"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BulletListField } from "@/components/forms/bullet-list-field";
import { updateSeed } from "../actions";

type SeedForForm = {
  id: string;
  date: string;
  energyLevel: number | null;
  tendingToday: string[];
  release: string[];
  assumptions: string[];
  bodyCheckIn: string[];
  notes: string[];
  tags: string[];
};

export function SeedEditForm({ seed }: { seed: SeedForForm }) {
  const [tendingToday, setTendingToday] = useState(seed.tendingToday);
  const [release, setRelease] = useState(seed.release);
  const [assumptions, setAssumptions] = useState(seed.assumptions);
  const [bodyCheckIn, setBodyCheckIn] = useState(seed.bodyCheckIn);
  const [notes, setNotes] = useState(seed.notes);
  const [tags, setTags] = useState(seed.tags);
  const [energyLevel, setEnergyLevel] = useState(String(seed.energyLevel ?? ""));
  const dateOnly =
    typeof seed.date === "string"
      ? seed.date.slice(0, 10)
      : new Date(seed.date).toISOString().slice(0, 10);

  return (
    <form
      action={async (formData) => {
        await updateSeed(seed.id, formData);
      }}
      className="space-y-6"
    >
      <input type="hidden" name="date" value={dateOnly} />
      <input type="hidden" name="tendingToday" value={JSON.stringify(tendingToday)} />
      <input type="hidden" name="release" value={JSON.stringify(release)} />
      <input type="hidden" name="assumptions" value={JSON.stringify(assumptions)} />
      <input type="hidden" name="bodyCheckIn" value={JSON.stringify(bodyCheckIn)} />
      <input type="hidden" name="notes" value={JSON.stringify(notes)} />
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />

      <Card>
        <CardHeader>
          <CardTitle>Energy</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="number"
            name="energyLevel"
            min={1}
            max={10}
            placeholder="1–10"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(e.target.value)}
            className="max-w-[6rem]"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tending today</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletListField
            value={tendingToday}
            onChange={setTendingToday}
            placeholder="What are you tending to?"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Release</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletListField
            value={release}
            onChange={setRelease}
            placeholder="What are you releasing?"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletListField
            value={assumptions}
            onChange={setAssumptions}
            placeholder="Assumptions to question"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Body check-in</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletListField
            value={bodyCheckIn}
            onChange={setBodyCheckIn}
            placeholder="How does your body feel?"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletListField
            value={notes}
            onChange={setNotes}
            placeholder="Other notes"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <BulletListField
            value={tags}
            onChange={setTags}
            placeholder="Tags"
            addLabel="Add tag"
          />
        </CardContent>
      </Card>

      <Button type="submit">Save</Button>
    </form>
  );
}
