import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { Dictionary } from "@/lib/dictionaries";
import type { Project } from "@/types";

export function Projects({ dict, data }: { dict: Dictionary; data: Project[] }) {
  const categories = [
    { key: "development" as const, label: dict.projects.development },
    { key: "infrastructure" as const, label: dict.projects.infrastructure },
  ];

  return (
    <Section id="projects">
      <AnimateOnScroll>
        <SectionHeading
          title={dict.projects.title}
          subtitle={dict.projects.subtitle}
        />
      </AnimateOnScroll>
      {categories.map((cat) => {
        const filtered = data
          .filter((p) => p.category === cat.key)
          .sort((a, b) => a.order - b.order);

        return (
          <div key={cat.key} className="mb-12 last:mb-0">
            <AnimateOnScroll>
              <h3 className="mb-6 text-lg font-semibold uppercase tracking-wider text-text-muted">
                {cat.label}
              </h3>
            </AnimateOnScroll>
            <div className="grid gap-6 lg:grid-cols-2">
              {filtered.map((project, i) => (
                <AnimateOnScroll key={project.id} delay={i * 0.1}>
                  <ProjectCard project={project} dict={dict} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        );
      })}
    </Section>
  );
}
