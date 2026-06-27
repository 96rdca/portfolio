import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { projects } from "@/lib/data";

const categories = [
  { key: "development", label: "Development" },
  { key: "infrastructure", label: "Infrastructure" },
] as const;

export function Projects() {
  return (
    <Section id="projects">
      <AnimateOnScroll>
        <SectionHeading
          title="Projects"
          subtitle="Production systems I've designed, built, and maintained."
        />
      </AnimateOnScroll>
      {categories.map((cat) => {
        const filtered = projects
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
                  <ProjectCard project={project} />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        );
      })}
    </Section>
  );
}
