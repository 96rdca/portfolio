import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { Dictionary } from "@/lib/dictionaries";
import type { PersonalInfo } from "@/types";

export function About({ dict, data }: { dict: Dictionary; data: PersonalInfo }) {
  return (
    <Section id="about">
      <AnimateOnScroll>
        <SectionHeading title={dict.about.title} />
      </AnimateOnScroll>
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <AnimateOnScroll>
            <div className="space-y-4">
              {data.aboutParagraphs.map((paragraph, i) => (
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
                  {dict.about.experience}
                </h3>
                <p className="mt-1 text-2xl font-bold text-text-primary">
                  {data.yearsOfExperience}+ {dict.about.years}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  {dict.about.industries}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.industries.map((industry) => (
                    <Badge key={industry}>{industry}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  {dict.about.currentlyLearning}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.currentlyLearning.map((item) => (
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
