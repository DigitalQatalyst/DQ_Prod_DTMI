import { ArrowLeft, BookOpen, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  targetAudience: string[];
}

const HeroSection = ({ title, subtitle, description, targetAudience }: HeroSectionProps) => (
  <section className="relative overflow-hidden">
    {/* Background glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="container max-w-5xl mx-auto px-6 pt-12 pb-20 relative">
      <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to Marketplace
      </button>

      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            <BookOpen className="w-3 h-3" />
            Framework Explainer
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            <Clock className="w-3 h-3" />
            12 min read
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6 max-w-2xl">
          {subtitle}
        </p>
        <p className="text-foreground/80 text-lg leading-relaxed max-w-3xl mb-8">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground mr-1">Best for:</span>
          {targetAudience.map((audience) => (
            <span
              key={audience}
              className="px-3 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
            >
              {audience}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
