// import { ColorModeProvider } from "@/components/ui/color-mode";
import ProviderChakra from "@/components/Provider";
import Contact from "@/components/contact";
import Header from "@/components/header";
import Loading from "./page/loading";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.scss";


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
    <html lang="en">
      <body className="container">
        <ProviderChakra>
          {/* <ColorModeProvider> */}
          <Suspense fallback={<Loading />}>
            <Header />
            {children}
            <Contact />
          </Suspense>
          {/* </ColorModeProvider> */}
        </ProviderChakra>
      </body>
    </html>
  );
}
