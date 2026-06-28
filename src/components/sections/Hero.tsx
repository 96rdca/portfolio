import { ArrowDown, FileDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/dictionaries";
import type { PersonalInfo } from "@/types";

export function Hero({ dict, data }: { dict: Dictionary; data: PersonalInfo }) {
  return (
    <section className="flex min-h-screen items-center justify-center pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-sm text-accent">{dict.hero.greeting}</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-6xl">
          {data.name}
        </h1>
        <h2 className="mt-2 text-2xl font-semibold text-text-secondary md:text-4xl">
          {data.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
          {data.tagline}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="#projects">
            <ArrowDown size={16} />
            {dict.hero.viewProjects}
          </Button>
          <Button href={data.resumePath} variant="secondary">
            <FileDown size={16} />
            {dict.hero.downloadResume}
          </Button>
        </div>
      </div>
    </section>
  );
}
