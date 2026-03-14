import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

/**
 * Blossoms — insights that emerge from weekly reflection.
 */
export default function BlossomsPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Blossoms</h1>
          <Link
            href="/blossoms/new"
            className={buttonVariants({ size: "default" })}
          >
            New blossom
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Insights and intentions</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Blossoms are created from within a Week. They can be marked as
            priorities and tracked to completed.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
