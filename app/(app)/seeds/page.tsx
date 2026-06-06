import Link from "next/link";
import { journalEntryService } from "@/lib/services";
import { formatPhaseLabel } from "@/lib/services/cycle-service";
import { formatDateISO } from "@/lib/date";
import { mergeEntryMargins } from "@/lib/journal-entry-form-data";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

function entryPreview(body: string, max = 80) {
  const t = body.trim();
  if (!t) return "No journal text";
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

function tagSnippet(tags: string[]) {
  if (tags.length === 0) return null;
  return tags.slice(0, 3).join(", ");
}

export default async function SeedsPage() {
  const entries = await journalEntryService.list();

  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Seeds</h1>
          <p className="text-sm text-muted-foreground">
            Your daily observations, newest first.
          </p>
        </div>

        {entries.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <p className="mb-4">No seeds yet.</p>
              <Link href="/today" className={buttonVariants()}>
                Plant today&apos;s seed
              </Link>
            </CardContent>
          </Card>
        ) : (
          <ul className="space-y-3">
            {entries.map((entry) => {
              const dateISO = formatDateISO(entry.date);
              const tags = mergeEntryMargins(entry);
              const snippet = tagSnippet(tags);
              return (
                <li key={entry.id}>
                  <Link href={`/seeds/${dateISO}`}>
                    <Card className="transition-colors hover:bg-muted/40">
                      <CardContent className="space-y-2 py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-medium text-foreground">
                            {dateISO}
                          </span>
                          {entry.cycleDay != null && entry.cyclePhase && (
                            <span className="text-xs text-muted-foreground">
                              Day {entry.cycleDay} ·{" "}
                              {formatPhaseLabel(entry.cyclePhase)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entryPreview(entry.body)}
                        </p>
                        {snippet && (
                          <p className="text-xs text-muted-foreground">
                            {snippet}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
