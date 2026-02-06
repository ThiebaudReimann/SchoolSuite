import type { Metadata } from "next";
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
  description: "SchoolSuite",
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
