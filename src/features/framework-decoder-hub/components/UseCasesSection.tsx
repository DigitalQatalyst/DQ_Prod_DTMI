import { Target } from "lucide-react";
import SectionHeading from "./SectionHeading";

const UseCasesSection = ({ useCases }: { useCases: string[] }) => (
  <section className="container max-w-5xl mx-auto px-6 py-20">
    <SectionHeading
      label="01 · Use Cases"
      title="Where It Shines"
      description="Concrete scenarios where this framework excels."
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {useCases.map((uc) => (
        <div key={uc} className="flex items-center gap-4 glass-card rounded-xl p-5">
          <Target className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-foreground text-sm font-medium">{uc}</span>
        </div>
      ))}
    </div>
  </section>
);

export default UseCasesSection;
