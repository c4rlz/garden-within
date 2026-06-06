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
      <ul className="flex items-stretch justify-around px-2 pt-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
                <span className={isActive ? "font-medium" : undefined}>
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
