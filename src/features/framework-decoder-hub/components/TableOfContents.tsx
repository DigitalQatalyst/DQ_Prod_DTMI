const sections = [
  { id: "use-cases", label: "Use Cases" },
  { id: "core-concepts", label: "Core Concepts" },
  { id: "how-it-works", label: "How It Works" },
  { id: "principles", label: "Principles" },
  { id: "code-example", label: "Code Example" },
  { id: "real-world", label: "Real World" },
  { id: "evaluation", label: "Pros & Cons" },
  { id: "comparison", label: "Comparison" },
  { id: "resources", label: "Resources" },
];

const TableOfContents = () => (
  <nav className="container max-w-5xl mx-auto px-6">
    <div className="glass-card rounded-xl p-5 flex flex-wrap items-center gap-2">
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mr-2">Contents</span>
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          {s.label}
        </a>
      ))}
    </div>
  </nav>
);

export default TableOfContents;
