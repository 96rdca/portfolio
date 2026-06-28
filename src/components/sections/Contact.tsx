import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { Dictionary } from "@/lib/dictionaries";
import type { PersonalInfo } from "@/types";

export function Contact({ dict, data }: { dict: Dictionary; data: PersonalInfo }) {
  const links = [
    {
      icon: (props: { size: number; className?: string }) => <Mail {...props} />,
      label: dict.contact.email,
      value: data.email,
      href: `mailto:${data.email}`,
      external: false,
    },
    {
      icon: (props: { size: number; className?: string }) => <LinkedInIcon {...props} />,
      label: dict.contact.linkedin,
      value: "richard-anglon",
      href: data.linkedInUrl,
      external: true,
    },
    {
      icon: (props: { size: number; className?: string }) => <GitHubIcon {...props} />,
      label: dict.contact.github,
      value: "96rdca",
      href: data.githubUrl,
      external: true,
    },
  ];

  return (
    <Section id="contact">
      <AnimateOnScroll>
        <SectionHeading
          title={dict.contact.title}
          subtitle={dict.contact.subtitle}
        />
      </AnimateOnScroll>
      <div className="max-w-md space-y-4">
        {links.map((link, i) => (
          <AnimateOnScroll key={link.label} delay={i * 0.1}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/50 hover:bg-surface-hover"
            >
              <link.icon size={20} className="text-accent" />
              <div>
                <p className="text-sm text-text-muted">{link.label}</p>
                <p className="text-text-primary">{link.value}</p>
              </div>
            </a>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
