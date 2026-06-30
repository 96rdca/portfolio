import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, hasLocale, locales } from "@/lib/dictionaries";
import { getLocalizedData } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const OG_LOCALE: Record<string, string> = { en: "en_US", es: "es_DO" };

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const data = await getLocalizedData(lang as "en" | "es");
  const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const url = `${BASE}/${lang}/`;
  const altLang = lang === "en" ? "es" : "en";

  return {
    metadataBase: new URL(BASE),
    title: `${data.personal.name} | ${data.personal.title}`,
    description: data.personal.tagline,
    alternates: {
      canonical: url,
      languages: { [lang]: url, [altLang]: `${BASE}/${altLang}/` },
    },
    openGraph: {
      title: `${data.personal.name} | ${data.personal.title}`,
      description: data.personal.tagline,
      type: "website",
      url,
      locale: OG_LOCALE[lang] ?? "en_US",
      siteName: data.personal.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.personal.name} | ${data.personal.title}`,
      description: data.personal.tagline,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const data = await getLocalizedData(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Header dict={dict} lang={lang} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer dict={dict} name={data.personal.name} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
