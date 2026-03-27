import { Building2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface Example {
  company: string;
  description: string;
}

const RealWorldSection = ({ examples }: { examples: Example[] }) => (
  <section className="container max-w-5xl mx-auto px-6 py-20">
    <SectionHeading
      label="06 · Real World"
      title="Who's Using It?"
      description="Companies and teams that have successfully adopted this framework."
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {examples.map((ex) => (
        <div key={ex.company} className="glass-card rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="text-foreground font-semibold mb-2">{ex.company}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{ex.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default RealWorldSection;
