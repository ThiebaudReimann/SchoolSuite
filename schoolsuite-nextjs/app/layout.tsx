import type { Metadata, Viewport } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "./provider";
import { headers } from 'next/headers';
import { Toaster } from "sonner";

import Link from "next/link";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

import Script from "next/script";

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
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366F1",
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
      <body className={`${funnelDisplay.variable} antialiased flex flex-col min-h-screen`}>
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="095decca-cee4-406b-9ddb-c953f1192f3d"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        <ClientProvider lang={lang}>

          <Toaster position="top-right" richColors />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="py-6 px-4 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <p>© {new Date().getFullYear()} SchoolSuite. Alle Rechte vorbehalten.</p>
              <nav className="flex gap-6">
                <Link href="/imprint" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Impressum
                </Link>
                <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Datenschutz
                </Link>
                <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  AGB
                </Link>
              </nav>
            </div>
          </footer>
        </ClientProvider>
      </body>
    </html>
  );
}

