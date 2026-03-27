import { ExternalLink, BookOpen, Code, Users, FileText } from "lucide-react";
import SectionHeading from "./SectionHeading";

const typeIcons: Record<string, React.ElementType> = {
  Documentation: BookOpen,
  Tutorial: FileText,
  Repository: Code,
  Community: Users,
};

interface Resource {
  title: string;
  url: string;
  type: string;
}

const ResourcesSection = ({ resources }: { resources: Resource[] }) => (
  <section className="container max-w-5xl mx-auto px-6 py-20">
    <SectionHeading
      label="09 · Resources"
      title="Continue Learning"
      description="Curated resources to deepen your understanding."
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {resources.map((r) => {
        const Icon = typeIcons[r.type] || BookOpen;
        return (
          <a
            key={r.title}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-colors group"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-foreground font-medium text-sm truncate">{r.title}</h3>
              <span className="text-muted-foreground text-xs">{r.type}</span>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </a>
        );
      })}
    </div>
  </section>
);

export default ResourcesSection;
