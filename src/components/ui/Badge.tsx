interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles =
    variant === "accent"
      ? "bg-accent-subtle text-accent"
      : "bg-surface text-text-secondary";

  return (
    <span
      className={`inline-block rounded-md px-2.5 py-1 font-mono text-sm ${styles}`}
    >
      {children}
    </span>
  );
}
