import { AppSidebar } from "@/components/app-sidebar";
import { AppMobileNav } from "@/components/app-mobile-nav";

/**
 * Main app layout: sidebar (desktop) + bottom nav (mobile) + content.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen min-h-[100dvh]">
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-background pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>
      <AppMobileNav />
    </div>
  );
}
