import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Richard Anglon | Fullstack Software Engineer",
  description:
    "Fullstack software engineer specializing in .NET, ASP.NET Core, React, PostgreSQL, Docker, and modern cloud technologies. Building secure, scalable production systems.",
  openGraph: {
    title: "Richard Anglon | Fullstack Software Engineer",
    description:
      "Fullstack software engineer building secure, scalable production systems with .NET, React, PostgreSQL, and Docker.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
