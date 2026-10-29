import ProviderChakra from "@/components/Provider";
import Contact from "@/components/contact";
import Header from "@/components/header";
import DevTool from "@/components/DevTool";
import ClientAnalytics from "@/components/ClientAnalytics";
import SplashScreen from "@/components/SplashScreen";
import BackgroundEffect from "@/components/BackgroundEffect";


import Loading from "../page/loading";
import type { Metadata } from "next";
import { Suspense } from "react";
// Fonts loaded via CSS fallback for reliability
import SmoothScrollProvider from "@/components/SmoothScroll";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.scss";



export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    en: "Fidèle Loffou | Full Stack Developer & AI Engineer",
    fr: "Fidèle Loffou | Développeur Full Stack & Ingénieur IA"
  };
  
  const descriptions: Record<string, string> = {
    en: "Full Stack Developer & AI Engineer in Douala, Cameroon. Web, mobile and REST API applications for banking and industry with Java / Spring Boot, NestJS, React and Angular.",
    fr: "Développeur Full Stack & Ingénieur IA à Douala, Cameroun. Applications web, mobiles et API REST pour la banque et l'industrie avec Java / Spring Boot, NestJS, React et Angular."
  };

  const title = titles[locale] || titles.fr;
  const description = descriptions[locale] || descriptions.fr;

  return {
    metadataBase: new URL('https://my-portoflio-livid.vercel.app'),
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
      url: 'https://my-portoflio-livid.vercel.app',
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
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning style={{
        margin: 0,
      } as React.CSSProperties}>
        <NextIntlClientProvider messages={messages}>
          <ColorModeProvider>
            <ProviderChakra>
              <SplashScreen />
              <BackgroundEffect />
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
