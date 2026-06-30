import {
  Server,
  Database,
  Container,
  Layers,
  FlaskConical,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { Dictionary } from "@/lib/dictionaries";
import type { SkillCategory } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={24} />,
  Database: <Database size={24} />,
  Container: <Container size={24} />,
  Layers: <Layers size={24} />,
  FlaskConical: <FlaskConical size={24} />,
};

export function Skills({ dict, data }: { dict: Dictionary; data: SkillCategory[] }) {
  return (
    <Section id="skills">
      <AnimateOnScroll>
        <SectionHeading title={dict.skills.title} />
      </AnimateOnScroll>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((category, i) => (
          <AnimateOnScroll key={category.id} delay={i * 0.08} variant={i % 2 === 0 ? "fade-left" : "fade-right"}>
            <div className="glass-card card-elevated p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2 text-accent">
                  {iconMap[category.icon]}
                </div>
                <h3 className="text-lg font-medium text-text-primary">
                  {category.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
