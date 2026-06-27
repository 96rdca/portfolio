interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold text-text-primary">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-text-secondary text-lg">{subtitle}</p>
      )}
    </div>
  );
}
