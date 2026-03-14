"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBlossom } from "../actions";

type WeekOption = { id: string; weekStart: string };

export function BlossomNewForm({ weeks }: { weeks: WeekOption[] }) {
  return (
    <form
      action={async (formData) => {
        await createBlossom(formData);
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="weekId" className="mb-1 block text-sm font-medium text-foreground">
          Week
        </label>
        <select
          id="weekId"
          name="weekId"
          required
          className="flex h-10 w-full max-w-md rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Select a week</option>
          {weeks.map((w) => (
            <option key={w.id} value={w.id}>
              Week of {w.weekStart}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-foreground">
          Title
        </label>
        <Input id="title" name="title" placeholder="Blossom title" required className="max-w-md" />
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-foreground">
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="More detail…"
          className="flex w-full max-w-md rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="priority" name="priority" value="true" className="h-4 w-4 rounded border-border" />
        <label htmlFor="priority" className="text-sm text-foreground">
          Priority
        </label>
      </div>
      <Button type="submit">Create blossom</Button>
    </form>
  );
}
