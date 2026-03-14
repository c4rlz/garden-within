"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";

export interface BulletListFieldProps {
  value: string[];
  onChange: (items: string[]) => void;
  label?: string;
  placeholder?: string;
  addLabel?: string;
  className?: string;
  /** Optional: limit number of items (e.g. 10) */
  maxItems?: number;
}

/**
 * Reusable bullet-list input: add/remove rows, each row is one string.
 * Used for tendingToday, release, assumptions, bodyCheckIn, notes, etc.
 * Keeps form logic in one place and avoids duplication.
 */
export function BulletListField({
  value,
  onChange,
  label,
  placeholder = "Add a line…",
  addLabel = "Add",
  className,
  maxItems,
}: BulletListFieldProps) {
  const canAdd = maxItems == null || value.length < maxItems;

  const updateAt = (index: number, text: string) => {
    const next = [...value];
    next[index] = text;
    onChange(next);
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const append = () => {
    if (!canAdd) return;
    onChange([...value, ""]);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <ul className="space-y-2">
        {value.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span className="mt-2.5 h-5 w-5 shrink-0 text-center text-muted-foreground" aria-hidden>
              •
            </span>
            <Input
              value={item}
              onChange={(e) => updateAt(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeAt(index)}
              aria-label="Remove line"
              className="shrink-0 text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
      {canAdd && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={append}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      )}
    </div>
  );
}
