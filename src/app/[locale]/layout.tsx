import ProviderChakra from "@/components/Provider";
import Contact from "@/components/contact";
import Header from "@/components/header";
import Loading from "../page/loading";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScroll";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.scss";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fidele Loffou Portoflio",
  description: "Portfolio de Fidele Loffou - Développeur Full-Stack",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.className} ${spaceGrotesk.className} ${jetbrainsMono.className}`} suppressHydrationWarning>
      <body suppressHydrationWarning style={{ 
        margin: 0, 
        "--font-sans": inter.style.fontFamily,
        "--font-hitech": spaceGrotesk.style.fontFamily,
        "--font-mono": jetbrainsMono.style.fontFamily,
      } as React.CSSProperties}>
        <NextIntlClientProvider messages={messages}>
          <ColorModeProvider>
            <ProviderChakra>
              <SmoothScrollProvider>
                <Suspense fallback={<Loading />}>
                  <Header />
                  <main>
                    {children}
                  </main>
                  <Contact />
                </Suspense>
              </SmoothScrollProvider>
            </ProviderChakra>
          </ColorModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
