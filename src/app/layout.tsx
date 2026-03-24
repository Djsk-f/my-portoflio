import ProviderChakra from "@/components/Provider";
import Contact from "@/components/contact";
import Header from "@/components/header";
import Loading from "./page/loading";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import SmoothScrollProvider from "@/components/SmoothScroll";
import { ColorModeProvider } from "@/components/ui/color-mode";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fidele Loffou Portoflio",
  description: "Portfolio de Fidele Loffou - Développeur Full-Stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${spaceGrotesk.className} ${jetbrainsMono.className}`} suppressHydrationWarning>
      <body style={{ 
        margin: 0, 
        "--font-sans": inter.style.fontFamily,
        "--font-hitech": spaceGrotesk.style.fontFamily,
        "--font-mono": jetbrainsMono.style.fontFamily,
      } as React.CSSProperties}>
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
      </body>
    </html>
  );
}
