import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

/**
 * Weeks — weekly reflection containers.
 */
export default function WeeksPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Weeks</h1>
          <Link
            href="/weeks/new"
            className={buttonVariants({ size: "default" })}
          >
            New week
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Weekly reflections</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Each week holds what strengthened you, what drained you, patterns
            you noticed, and reflections. You can also create Blossoms from a
            week.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
