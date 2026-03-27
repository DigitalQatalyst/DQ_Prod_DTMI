import SectionHeading from "./SectionHeading";

interface Comparison {
  framework: string;
  pros: string;
  cons: string;
  bestFor: string;
}

const ComparisonSection = ({ comparisons }: { comparisons: Comparison[] }) => (
  <section className="container max-w-5xl mx-auto px-6 py-20">
    <SectionHeading
      label="08 · Comparison"
      title="How It Stacks Up"
      description="A side-by-side look at similar frameworks and their trade-offs."
    />
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 text-muted-foreground font-medium">Framework</th>
            <th className="text-left py-4 px-4 text-muted-foreground font-medium">Strengths</th>
            <th className="text-left py-4 px-4 text-muted-foreground font-medium">Weaknesses</th>
            <th className="text-left py-4 px-4 text-muted-foreground font-medium">Best For</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((c) => (
            <tr key={c.framework} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
              <td className="py-4 px-4 font-semibold text-foreground">{c.framework}</td>
              <td className="py-4 px-4 text-muted-foreground">{c.pros}</td>
              <td className="py-4 px-4 text-muted-foreground">{c.cons}</td>
              <td className="py-4 px-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                  {c.bestFor}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default ComparisonSection;
