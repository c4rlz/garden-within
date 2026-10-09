import { login } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  const errorMessage =
    error === "invalid"
      ? "That password didn’t match."
      : error === "missing"
        ? "Enter your password."
        : error === "locked"
          ? "Too many attempts. Try again in 15 minutes."
          : null;

  return (
    <div className="flex min-h-screen min-h-[100dvh] items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="font-serif text-2xl font-light tracking-tight text-foreground">
            Inner Seasons
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Your private journal. Enter your password to continue.
          </p>
        </header>

        <form action={login} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm text-muted-foreground"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-11"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-700/80" role="alert">
              {errorMessage}
            </p>
          )}

          <Button type="submit" className="h-11 w-full">
            Open garden
          </Button>
        </form>
      </div>
    </div>
  );
}
