import { ArrowRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ContentItem } from "../api/types";

// Keyed by raw DB type value — uses shadcn CSS variable tokens only
const TYPE_STYLES: Record<string, string> = {
  "blog": "bg-green-100 text-green-800 border-green-300",
  "article": "bg-blue-100 text-blue-800 border-blue-300",
  "future-insight": "bg-violet-100 text-violet-800 border-violet-300",
  "whitepaper": "bg-indigo-100 text-indigo-800 border-indigo-300",
  "research-report": "bg-rose-100 text-rose-800 border-rose-300",
  "podcast": "bg-pink-100 text-pink-800 border-pink-300",
  "video": "bg-yellow-100 text-yellow-800 border-yellow-300",
  "expert-interview": "bg-red-100 text-red-800 border-red-300",
  "infographic": "bg-purple-100 text-purple-800 border-purple-300",
  "case-study": "bg-teal-100 text-teal-800 border-teal-300",
};

const DEFAULT_BADGE_STYLE = "bg-muted text-muted-foreground border-border";

interface ContentCardProps {
  item: ContentItem;
}

export function ContentCard({ item }: ContentCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="group overflow-hidden cursor-pointer hover:shadow-lg transition-al p-0  duration-300 border-border bg-card flex flex-col"
      onClick={() => navigate(item.link)}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted shrink-0">
        <img
          src={item.heroImage}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Type badge + category */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", TYPE_STYLES[item.contentType] ?? DEFAULT_BADGE_STYLE)}>
            {item.contentTypeLabel}
          </span>
          <span className="text-xs text-muted-foreground truncate">{item.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-card-foreground text-base line-clamp-2 leading-snug mb-2 group-hover:text-primary transition-colors" style={{ minHeight: "2.75rem" }}>
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3 flex-1" style={{ minHeight: "2.5rem" }}>
          {item.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{item.readTime} min read</span>
          </div>
          <div className="flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
            Read More
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Card>
  );
}
