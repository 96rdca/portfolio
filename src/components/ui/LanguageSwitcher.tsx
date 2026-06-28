"use client";

import { Globe } from "lucide-react";

export function LanguageSwitcher({ lang }: { lang: string }) {
  const targetLang = lang === "en" ? "es" : "en";
  const label = targetLang.toUpperCase();

  function switchLang() {
    const path = window.location.pathname.replace(`/${lang}/`, `/${targetLang}/`);
    window.location.assign(path || `/${targetLang}/`);
  }

  return (
    <button
      onClick={switchLang}
      className="flex items-center gap-1 rounded-md p-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
      aria-label={`Switch to ${targetLang === "en" ? "English" : "Español"}`}
    >
      <Globe size={18} />
      <span className="font-mono text-xs">{label}</span>
    </button>
  );
}
