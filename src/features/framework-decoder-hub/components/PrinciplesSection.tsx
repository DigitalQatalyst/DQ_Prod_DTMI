import SectionHeading from "./SectionHeading";

interface Principle {
  name: string;
  description: string;
}

const PrinciplesSection = ({ principles }: { principles: Principle[] }) => (
  <section className="container max-w-5xl mx-auto px-6 py-20">
    <SectionHeading
      label="04 · Principles"
      title="Key Principles & Features"
      description="The fundamental philosophy that guides the framework's design."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {principles.map((p, i) => (
        <div
          key={p.name}
          className="relative glass-card rounded-xl p-6 overflow-hidden"
        >
          <span className="absolute top-4 right-4 text-6xl font-black text-foreground/[0.03] leading-none select-none">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-foreground font-semibold text-lg mb-2">{p.name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default PrinciplesSection;
