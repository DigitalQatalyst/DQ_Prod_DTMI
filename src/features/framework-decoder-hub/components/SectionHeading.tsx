interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

const SectionHeading = ({ label, title, description }: SectionHeadingProps) => (
  <div className="mb-10">
    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3 font-mono">
      {label}
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
    {description && (
      <p 
        className="text-lg max-w-2xl leading-relaxed font-normal" 
        style={{ color: 'hsl(215 35% 85%)', opacity: 0.9 }}
      >
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
