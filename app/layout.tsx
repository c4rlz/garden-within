import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inner Garden",
  description: "A private space for daily and weekly reflection.",
  applicationName: "Inner Garden",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Inner Garden",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F4EFE4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen min-h-[100dvh] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
