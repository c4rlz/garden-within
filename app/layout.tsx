import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inner Seasons",
  description: "A private space for daily and weekly reflection.",
  applicationName: "Inner Seasons",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Inner Seasons",
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
