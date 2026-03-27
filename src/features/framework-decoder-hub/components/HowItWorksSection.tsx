import { CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface HowItWorksProps {
  steps: { title: string; description: string }[];
  bestPractices: string[];
}

const HowItWorksSection = ({ steps, bestPractices }: HowItWorksProps) => (
  <section className="container max-w-5xl mx-auto px-6 py-20">
    <SectionHeading
      label="03 · How It Works"
      title="Process & Workflow"
      description="A step-by-step look at how the framework operates in practice."
    />

    {/* Steps timeline */}
    <div className="relative mb-16">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border md:left-[19px]" />
      <div className="space-y-8">
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex gap-6 items-start">
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-mono font-bold text-sm">{i + 1}</span>
            </div>
            <div className="pt-1">
              <h3 className="text-foreground font-semibold text-lg mb-1">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Best practices */}
    <div className="glass-card rounded-xl p-8">
      <h3 className="text-foreground font-semibold text-lg mb-5">Best Practices</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bestPractices.map((practice) => (
          <div key={practice} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground text-sm leading-relaxed">{practice}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
