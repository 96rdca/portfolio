import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
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

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as "en" | "es");
  const data = await getLocalizedData(lang as "en" | "es");

  return {
    title: `${data.personal.name} | ${data.personal.title}`,
    description: data.personal.tagline,
    openGraph: {
      title: `${data.personal.name} | ${data.personal.title}`,
      description: data.personal.tagline,
      type: "website",
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
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
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
        <Header dict={dict} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} name={data.personal.name} />
      </body>
    </html>
  );
}
