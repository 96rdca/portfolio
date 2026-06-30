interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold text-text-primary">{title}</h2>
      <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-accent-gradient-from to-accent-gradient-to" />
      {subtitle && (
        <p className="mt-3 text-text-secondary text-lg">{subtitle}</p>
      )}
    </div>
  );
}
