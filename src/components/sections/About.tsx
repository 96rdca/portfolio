import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { personal } from "@/lib/data";

export function About() {
  return (
    <Section id="about">
      <AnimateOnScroll>
        <SectionHeading title="About" />
      </AnimateOnScroll>
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <AnimateOnScroll>
            <div className="space-y-4">
              {personal.aboutParagraphs.map((paragraph, i) => (
                <p key={i} className="text-text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
        <div className="md:col-span-2">
          <AnimateOnScroll delay={0.1}>
            <div className="space-y-6 rounded-xl border border-border bg-surface p-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  Experience
                </h3>
                <p className="mt-1 text-2xl font-bold text-text-primary">
                  {personal.yearsOfExperience}+ years
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  Industries
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {personal.industries.map((industry) => (
                    <Badge key={industry}>{industry}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  Currently Learning
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {personal.currentlyLearning.map((item) => (
                    <Badge key={item} variant="accent">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </Section>
  );
}
