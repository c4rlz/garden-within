export function parseStringArray(value: FormDataEntryValue | null): string[] {
  if (value == null || value === "") return [];
  if (typeof value !== "string") return [];
  try {
    const arr = JSON.parse(value) as unknown;
    return Array.isArray(arr)
      ? arr.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}
