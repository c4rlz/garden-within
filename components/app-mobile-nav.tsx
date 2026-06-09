"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Leaf, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/today", label: "Today", icon: Sun },
  { href: "/seeds", label: "Seeds", icon: Leaf },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-card/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="flex items-stretch justify-around gap-1 px-3 pb-1 pt-1.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 text-[0.6875rem] transition-colors",
                  isActive
                    ? "bg-accent/45 text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-[1.35rem] w-[1.35rem]",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
                <span className={isActive ? "font-semibold" : "font-medium"}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
