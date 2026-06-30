import { type AnchorHTMLAttributes } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-sm transition-all duration-200";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
      : "border border-border text-text-secondary hover:bg-surface hover:text-text-primary hover:-translate-y-0.5";

  return (
    <a className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </a>
  );
}
