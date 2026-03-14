import { AppSidebar } from "@/components/app-sidebar";

/**
 * Main app layout: sidebar + content. All routes under (app) share this.
 * Keeps the shell consistent so Today, Seeds, Weeks, Blossoms, Import feel like one app.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-background">
        {children}
      </main>
    </div>
  );
}
