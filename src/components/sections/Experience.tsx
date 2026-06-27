import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { experience } from "@/lib/data";

function formatDate(date: string): string {
  const [year, month] = date.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export function Experience() {
  return (
    <Section id="experience">
      <AnimateOnScroll>
        <SectionHeading title="Experience" />
      </AnimateOnScroll>
      <div className="relative ml-4 border-l-2 border-border pl-8">
        {experience.map((job, i) => (
          <AnimateOnScroll key={job.id} delay={i * 0.1}>
            <div className="relative mb-12 last:mb-0">
              <div className="absolute -left-[2.55rem] top-1 h-3 w-3 rounded-full border-2 border-accent bg-background" />
              <p className="text-sm text-text-muted">
                {formatDate(job.startDate)} &mdash;{" "}
                {job.endDate ? formatDate(job.endDate) : "Present"}
              </p>
              <h3 className="mt-1 text-xl font-medium text-text-primary">
                {job.position}
              </h3>
              <p className="text-text-secondary">{job.company}</p>
              <ul className="mt-4 space-y-2">
                {job.accomplishments.map((a, j) => (
                  <li
                    key={j}
                    className="flex gap-2 text-sm text-text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
