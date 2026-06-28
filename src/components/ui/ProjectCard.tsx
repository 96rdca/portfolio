"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./Badge";
import type { Project } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

export function ProjectCard({ project, dict }: { project: Project; dict: Dictionary }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-border/80">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-medium text-text-primary">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-text-muted">{project.role}</p>
        </div>
        <div className="flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-accent"
              aria-label={`${project.title} GitHub`}
            >
              <GitHubIcon size={18} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-accent"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="mt-4 text-text-secondary leading-relaxed">
        {project.overview}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 grid gap-6 border-t border-border pt-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
                  {dict.projects.challenges}
                </h4>
                <ul className="space-y-2">
                  {project.challenges.map((c, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
                  {dict.projects.results}
                </h4>
                <ul className="space-y-2">
                  {project.results.map((r, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
      >
        {expanded ? dict.projects.showLess : dict.projects.showDetails}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
    </div>
  );
}
