import ProviderChakra from "@/components/Provider";
import Contact from "@/components/contact";
import Header from "@/components/header";
import DevTool from "@/components/DevTool";
import ClientAnalytics from "@/components/ClientAnalytics";
import SplashScreen from "@/components/SplashScreen";


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

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    en: "Fidèle Loffou | Senior Full-Stack Developer Portfolio",
    fr: "Fidèle Loffou | Portfolio Développeur Full-Stack Senior"
  };
  
  const descriptions: Record<string, string> = {
    en: "Senior Full-Stack Developer specializing in Next.js, NestJS, and scalable cloud architectures. Discover my case studies and technical expertise.",
    fr: "Développeur Full-Stack Senior spécialisé en Next.js, NestJS et architectures cloud scalables. Découvrez mes études de cas et mon expertise technique."
  };

  const title = titles[locale] || titles.fr;
  const description = descriptions[locale] || descriptions.fr;

  return {
    title,
    description,
    icons: {
      icon: '/icon.png',
      apple: '/apple-icon.png',
    },
    alternates: {
      languages: {
        'en-US': '/en',
        'fr-FR': '/fr',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      url: 'https://fideleloffou.dev',
      siteName: 'Fidèle Loffou Portfolio',
      images: [
        {
          url: '/assets/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'LF Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fidele007',
      images: ['/assets/images/og-image.png'],
    },
  };
}


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
              <SplashScreen />
              <SmoothScrollProvider>
                <Suspense fallback={<Loading />}>
                  <Header />

                  <main>
                    {children}
                  </main>
                  <Contact />
                  <ClientAnalytics />
                  <DevTool />
                </Suspense>
              </SmoothScrollProvider>
            </ProviderChakra>
          </ColorModeProvider>
        </NextIntlClientProvider>
      </body>


    </html>
  );
}
