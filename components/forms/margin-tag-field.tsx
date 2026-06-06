"use client";

import { useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

type MarginTagFieldProps = {
  value: string[];
  onChange: (items: string[]) => void;
  label: string;
  hint?: string;
  className?: string;
  maxItems?: number;
};

/**
 * Light tag input for journal margin notes — chips + borderless inline add.
 */
export function MarginTagField({
  value,
  onChange,
  label,
  hint,
  className,
  maxItems = 8,
}: MarginTagFieldProps) {
  const [draft, setDraft] = useState("");
  const canAdd = value.length < maxItems;

  const add = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !canAdd) return;
    onChange([...value, trimmed]);
    setDraft("");
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add(draft);
    }
    if (e.key === "Backspace" && draft === "" && value.length > 0) {
      remove(value.length - 1);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm leading-snug text-muted-foreground">
        <span className="text-foreground/75">{label}</span>
        {hint && (
          <span className="text-muted-foreground/65"> · {hint}</span>
        )}
      </p>
      <div className="flex min-h-7 flex-wrap items-center gap-x-2 gap-y-1.5">
        {value.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="group inline-flex items-baseline gap-1 font-serif text-sm text-foreground/90"
          >
            <span className="rounded-sm bg-accent/25 px-2 py-0.5">{item}</span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-0.5 text-xs leading-none text-muted-foreground/50 transition-colors hover:text-foreground sm:opacity-0 sm:group-hover:opacity-100"
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
          </span>
        ))}
        {canAdd && (
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={() => draft.trim() && add(draft)}
            placeholder={value.length === 0 ? "…" : ""}
            aria-label={`Add ${label.toLowerCase()}`}
            className="min-w-[3rem] flex-1 border-0 bg-transparent py-0.5 font-serif text-sm text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:ring-0"
          />
        )}
      </div>
    </div>
  );
}
