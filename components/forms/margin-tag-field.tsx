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
    <div className={cn("space-y-2.5", className)}>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground/85">{label}</p>
        {hint && (
          <p className="text-xs leading-relaxed text-muted-foreground/75">
            {hint}
          </p>
        )}
      </div>
      <div className="flex min-h-9 flex-wrap items-center gap-2">
        {value.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="group inline-flex items-center gap-1.5"
          >
            <span className="rounded-full bg-accent/35 px-3 py-1 font-serif text-sm text-foreground/90">
              {item}
            </span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground sm:h-auto sm:w-auto sm:px-0.5 sm:text-xs sm:hover:bg-transparent"
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
            placeholder={value.length === 0 ? "Add a word…" : ""}
            aria-label={`Add ${label.toLowerCase()}`}
            className="min-w-[6rem] flex-1 border-0 bg-transparent py-1.5 font-serif text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-0"
          />
        )}
      </div>
    </div>
  );
}
