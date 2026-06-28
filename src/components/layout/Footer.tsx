import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";
import type { Dictionary } from "@/lib/dictionaries";

export function Footer({ dict, name }: { dict: Dictionary; name: string }) {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} {name}. {dict.footer.rights}
        </p>
        <div className="flex gap-4">
          <a
            href="mailto:96rdca@gmail.com"
            className="text-text-muted transition-colors hover:text-accent"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://linkedin.com/in/richard-anglon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={20} />
          </a>
          <a
            href="https://github.com/96rdca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <GitHubIcon size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
