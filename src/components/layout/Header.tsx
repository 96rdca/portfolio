"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { Dictionary } from "@/lib/dictionaries";

const NAV_HREFS = ["#about", "#projects", "#skills", "#experience", "#contact"];

export function Header({ dict, lang }: { dict: Dictionary; lang: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { href: "#about", label: dict.nav.about },
    { href: "#projects", label: dict.nav.projects },
    { href: "#skills", label: dict.nav.skills },
    { href: "#experience", label: dict.nav.experience },
    { href: "#contact", label: dict.nav.contact },
  ];

  useEffect(() => {
    const sections = NAV_HREFS.map((href) =>
      document.querySelector(href) as HTMLElement
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const section of sections) {
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl rounded-2xl border border-glass-border bg-glass backdrop-blur-xl shadow-lg shadow-black/5">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <a href="#" className="font-mono text-lg font-semibold text-text-primary">
          RA
        </a>

        <div className="flex items-center gap-1">
          <nav className="hidden gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  activeSection === link.href
                    ? "text-accent after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <LanguageSwitcher lang={lang} />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-secondary md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="rounded-b-2xl border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm transition-colors ${
                  activeSection === link.href
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
