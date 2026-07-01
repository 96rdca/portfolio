import { Code2, Zap, Database, Server, GitBranch } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import type { Dictionary } from "@/lib/dictionaries";

const TECH_GROUPS = [
  {
    id: "server-api",
    label: "Server & API",
    icon: <Code2 size={24} />,
    items: ["ASP.NET Core", ".NET 9", "Blazor", "Web API", "WCF / ASMX"],
  },
  {
    id: "realtime-messaging",
    label: "Real-time & Messaging",
    icon: <Zap size={24} />,
    items: ["SignalR", "RabbitMQ"],
  },
  {
    id: "data-storage",
    label: "Data & Storage",
    icon: <Database size={24} />,
    items: ["PostgreSQL", "SQL Server", "Redis", "Entity Framework"],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    icon: <Server size={24} />,
    items: ["Docker", "IIS", "Linux", "Nginx", "YARP"],
  },
  {
    id: "devops-vcs",
    label: "DevOps & VCS",
    icon: <GitBranch size={24} />,
    items: ["TeamCity", "Gitea", "PowerShell", "Windows Server"],
  },
];

export function Technologies({ dict }: { dict: Dictionary }) {
  return (
    <Section id="technologies">
      <AnimateOnScroll>
        <SectionHeading title={dict.technologies.title} />
      </AnimateOnScroll>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TECH_GROUPS.map((group, i) => (
          <AnimateOnScroll
            key={group.id}
            delay={i * 0.08}
            variant={i % 2 === 0 ? "fade-left" : "fade-right"}
          >
            <div className="glass-card card-elevated p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2 text-accent">
                  {group.icon}
                </div>
                <h3 className="text-lg font-medium text-text-primary">
                  {group.label}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
