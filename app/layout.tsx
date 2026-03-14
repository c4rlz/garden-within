import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inner Garden",
  description: "A private space for daily and weekly reflection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
