import type { Metadata, Viewport } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "./provider";
import { headers } from 'next/headers';
import { Toaster } from "sonner";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SchoolSuite",
  description: "SchoolSuite - Your School Management System",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SchoolSuite",
  },
  icons: {
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#003366",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const acceptLanguage = (await headers()).get('accept-language');
  const lang = acceptLanguage?.split(/[,;]/)[0] || 'en-US';
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${funnelDisplay.variable} antialiased`}>
        <ClientProvider lang={lang}>
          <Toaster position="top-right" richColors />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
