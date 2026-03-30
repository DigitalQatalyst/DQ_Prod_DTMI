import { Separator } from "@/components/ui/separator";

export function FeaturedContent() {
  return (
    <section className="py-20 bg-muted border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          {/* Forecast Reports */}
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              Forecast Reports
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Explore forward-looking market intelligence and scenario-driven
              outlooks across key digital transformation sectors.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-card text-muted-foreground rounded-lg font-semibold border border-border">
              Coming Soon
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <Separator orientation="vertical" />
          </div>

          {/* Strategic Essays */}
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              Strategic Essays
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              Gain concise strategic perspectives on leadership, execution, and
              long-term competitive advantage in the digital economy.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-card text-muted-foreground rounded-lg font-semibold border border-border">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
