import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
}

const ConclusionSection = ({ title }: Props) => (
  <section className="container max-w-5xl mx-auto px-6 py-24">
    <div className="relative glass-card rounded-2xl p-10 md:p-14 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ready to build with {title}?
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
          Dive deeper into the framework, explore the official documentation, and start building your next project today.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-shadow">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
            Explore Docs
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default ConclusionSection;
