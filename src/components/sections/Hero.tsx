"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/lib/dictionaries";
import type { PersonalInfo } from "@/types";

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const blurItem = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
};

export function Hero({ dict, data }: { dict: Dictionary; data: PersonalInfo }) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center justify-center pt-24 overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />

      <motion.div
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
      >
        <motion.p
          variants={reducedMotion ? {} : item}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-sm text-accent"
        >
          {dict.hero.greeting}
        </motion.p>

        <motion.h1
          variants={reducedMotion ? {} : blurItem}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 text-4xl font-bold tracking-tight text-gradient md:text-6xl"
        >
          {data.name}
        </motion.h1>

        <motion.h2
          variants={reducedMotion ? {} : item}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-2 text-2xl font-semibold text-text-secondary md:text-4xl"
        >
          {data.title}
        </motion.h2>

        <motion.p
          variants={reducedMotion ? {} : item}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
        >
          {data.tagline}
        </motion.p>

        <motion.div
          variants={reducedMotion ? {} : item}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="#projects">
            <ArrowDown size={16} />
            {dict.hero.viewProjects}
          </Button>
          <Button href={data.resumePath} variant="secondary">
            <FileDown size={16} />
            {dict.hero.downloadResume}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
