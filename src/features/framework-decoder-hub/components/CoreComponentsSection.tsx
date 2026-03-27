import { Layers, Code, Zap, GitBranch, ArrowDownRight, Network } from "lucide-react";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, React.ElementType> = {
  Layers, Code, Zap, GitBranch, ArrowDownRight, Network,
};

interface CoreComponent {
  name: string;
  description: string;
  icon: string;
}

const CoreComponentsSection = ({ components }: { components: CoreComponent[] }) => (
  <section className="container max-w-5xl mx-auto px-6 py-20">
    <SectionHeading
      label="02 · Core Concepts"
      title="Building Blocks"
      description="The fundamental elements that make up the framework."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {components.map((comp, i) => {
        const Icon = iconMap[comp.icon] || Layers;
        return (
          <div
            key={comp.name}
            className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors group"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-foreground font-semibold mb-2">{comp.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{comp.description}</p>
          </div>
        );
      })}
    </div>
  </section>
);

export default CoreComponentsSection;
