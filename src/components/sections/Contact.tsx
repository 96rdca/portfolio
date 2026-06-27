import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { personal } from "@/lib/data";

const links = [
  {
    icon: (props: { size: number; className?: string }) => <Mail {...props} />,
    label: "Email",
    value: personal.email,
    href: `mailto:${personal.email}`,
    external: false,
  },
  {
    icon: (props: { size: number; className?: string }) => <LinkedInIcon {...props} />,
    label: "LinkedIn",
    value: "richard-anglon",
    href: personal.linkedInUrl,
    external: true,
  },
  {
    icon: (props: { size: number; className?: string }) => <GitHubIcon {...props} />,
    label: "GitHub",
    value: "96rdca",
    href: personal.githubUrl,
    external: true,
  },
];

export function Contact() {
  return (
    <Section id="contact">
      <AnimateOnScroll>
        <SectionHeading
          title="Contact"
          subtitle="Interested in working together? Let's connect."
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
